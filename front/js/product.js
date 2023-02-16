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
  //Add to Cart => init localStorage
  button.addEventListener(`click`, function () {
    let cartList = [];
    if (localStorage.length > 0) {
      let getCart = localStorage.getItem(`cart`);
      let cartParse = JSON.parse(getCart);
      cartParse.push(currentItem);
      let newCart = JSON.stringify(cartParse);
      localStorage.setItem(`cart`, newCart);
      console.log(`article ajouté a cartList`);
    } else {
      cartList.push(currentItem);
      let cartListString = JSON.stringify(cartList);
      localStorage.setItem(`cart`, cartListString);
      console.log(`localStorage Initialisé`);
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
