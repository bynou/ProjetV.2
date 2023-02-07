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

addCart();
function addCart() {
  const cart = {};

  //Add to Cart => init localStorage
  button.addEventListener(`click`, function () {
    let quantityChoice;
    quantityChoice = quantity.value;
    cart.quantity = quantityChoice;
    cart.id = id;
    localStorage.setItem(`cart`, JSON.stringify(cart));
    console.log(cart);
  });
  // Set la couleur de l'item
  document.getElementById(`colors`).addEventListener(`change`, function (e) {
    let colorChoice;
    colorChoice = e.target.value;
    cart.color = colorChoice;
    console.log(colorChoice);
  });
}
const local = JSON.parse(localStorage.getItem("cart"));
console.log(colors.value);
