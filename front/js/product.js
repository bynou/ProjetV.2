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
  currentItemColor = e.target.value;
  currentItem.color = currentItemColor;
  console.log(currentItem.color);
});
//OPTION QUANTITY
document.getElementById(`quantity`).addEventListener(`change`, function (e) {
  currentItemQuantity = e.target.value;
  currentItem.quantity = currentItemQuantity;
  console.log(currentItem.quantity);
});

function saveCart(cart) {
  localStorage.setItem(`cart`, JSON.stringify(cart));
}
function getCart() {
  let basket = localStorage.getItem(`cart`);
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}
function addBasket(product) {
  let basket = getCart();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (foundProduct != undefined) {
    let newQuantity =
      parseInt(foundProduct.quantity) + parseInt(currentItem.quantity);
    foundProduct.quantity = newQuantity;
  } else {
    basket.push(product);
  }

  saveCart(basket);
}

//boutton ajouter au panier
button.addEventListener(`click`, function () {
  addBasket(currentItem);
});
