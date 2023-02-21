const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const iconContainer = document.getElementsByClassName(`item__img`);
let button = document.getElementById(`addToCart`);
let currentItem = {};
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
  addDetailProduct(product);
}
function addDetailProduct(product) {
  //let key = product._id + product.color;
  currentItem._id = product._id;
  //currentItem.key = key;
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
// ON AJOUTE DES EVENTLISTENER POUR LA COMPLETION DE ITEM
//OPTION COULEUR
document.getElementById(`colors`).addEventListener(`change`, function (e) {
  currentItemColor = e.target.value;
  currentItem.color = currentItemColor;
  let key = currentItem._id + currentItem.color;
  currentItem.key = key;
});
//OPTION QUANTITY
document.getElementById(`quantity`).addEventListener(`change`, function (e) {
  currentItemQuantity = e.target.value;
  currentItem.quantity = currentItemQuantity;
});
//BOUTON ADD TO CART
button.addEventListener(`click`, function () {
  addCart(currentItem);
});
//LOCAL STORAGE
function saveCart(cart) {
  localStorage.setItem(`cart`, JSON.stringify(cart));
}
function getCart() {
  let cart = localStorage.getItem(`cart`);
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
function addCart(product) {
  let cart = getCart();
  let foundProduct = cart.find(
    (p) => p._id == product._id && p.color == product.color
  );
  if (foundProduct != undefined) {
    let newQuantity =
      parseInt(foundProduct.quantity) + parseInt(currentItem.quantity);
    foundProduct.quantity = newQuantity;
  } else {
    cart.push(product);
  }

  saveCart(cart);
}
