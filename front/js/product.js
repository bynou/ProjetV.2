const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const iconContainer = document.getElementsByClassName(`item__img`);

main();
function main() {
  callApi();
}
/*Récupération API */
function callApi() {
  fetch(`http://localhost:3000/api/products/${id}`, { method: "GET" })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (data) {
      productDetails(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function productDetails(product) {
  //Nom onglet
  window.parent.document.title = `${product.name}`;
  //img
  let icon = document.createElement(`img`);
  icon.src = product.imageUrl;
  icon.alt = product.altTxt;
  iconContainer[0].append(icon);

  document.getElementById("title").textContent = `${product.name}`;
  document.getElementById("price").textContent = `${product.price}`;
  document.getElementById("description").textContent = `${product.description}`;

  selectOptions(product.colors);
}

//création boucle options produit
function selectOptions(options) {
  for (let focus of options) {
    let newOption = document.createElement(`option`);
    newOption.value = focus;
    newOption.textContent = focus;
    document.getElementById(`colors`).appendChild(newOption);
  }
}

// TEST LOCALSTORAGE
let button = document.getElementById(`addToCart`);
let currentItem = {};
currentItem._id = id;
// ON AJOUTE DES EVENTLISTENER POUR LA COMPLETION DE ITEM
//OPTION COULEUR
document.getElementById(`colors`).addEventListener(`change`, function (e) {
  currentItem.color = e.target.value;
  console.log(currentItem.color);
});
//OPTION QUANTITY
document.getElementById(`quantity`).addEventListener(`change`, function (e) {
  currentItem.quantity = e.target.value;
  console.log(currentItem.quantity);
});

addCart();
function addCart() {
  let newItemQuantity = currentItem.quantity;
  //Add to Cart => init localStorage
  button.addEventListener(`click`, function () {
    let currentItemName = currentItem._id + currentItem.color;
    let globalCart = [];
    if (localStorage.getItem(currentItemName) !== null) {
      let currentItemJSON = localStorage.getItem(currentItemName);
      console.log(currentItemJSON);
      let currentItemQuantity = currentItemJSON.quantity;
      //
      console.log(currentItemJSON.quantity);
    } else {
      // on pousse l'item dans le tableau
      globalCart.push(currentItem);
      // on formate array en string pour localStorage
      let currentItemString = JSON.stringify(globalCart);
      console.log(currentItemName);
      // on host le array string dans localStorage avec pour clé id + couleur
      localStorage.setItem(currentItemName, currentItemString);
      console.log(`c'est cliqué :)`);
      console.log(localStorage);
    }
  });
  // Set la couleur de l'item POTENTIELLEMENT A VIRER
  /*document.getElementById(`colors`).addEventListener(`change`, function (e) {
    let colorChoice;
    colorChoice = e.target.value;
    cart.color = colorChoice;
    console.log(colorChoice);
  });*/
}
const local = JSON.parse(localStorage.getItem("cart"));
console.log(colors.value);
