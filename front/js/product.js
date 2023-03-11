const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const iconContainer = document.getElementsByClassName("item__img");
let button = document.getElementById("addToCart");
let currentItem = {};
//Affichage msg erreur pour l'order
let containerOrder = document.getElementsByClassName("item__content")[0];
let msg = document.createElement("p");
containerOrder.appendChild(msg);
//création paragraphe pour msg erreur QT

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
  window.parent.document.title = product.name;
  //img
  let icon = document.createElement("img");
  icon.src = product.imageUrl;
  icon.alt = product.altTxt;
  iconContainer[0].append(icon);

  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;

  selectOptions(product.colors);
  currentItem._id = product._id;
}

//création boucle options produit
function selectOptions(options) {
  for (let focus of options) {
    let newOption = document.createElement("option");
    newOption.value = focus;
    newOption.textContent = focus;
    document.getElementById("colors").appendChild(newOption);
  }
}
// ON AJOUTE DES EVENTLISTENER POUR LA COMPLETION DE ITEM
//OPTION COULEUR
document.getElementById("colors").addEventListener("change", function (e) {
  currentItemColor = e.target.value;
  currentItem.color = currentItemColor;
});
//OPTION QUANTITY
document.getElementById("quantity").addEventListener("change", function (e) {
  if (e.target.value < 1) {
    console.log("BOUTTON QUANTITE");
    console.log("ko");
  } else {
    currentItem.quantity = e.target.value;
    console.log("BOUTTON QUANTITE");
    console.log("ok");
  }
});
//BOUTON ADD TO CART
button.addEventListener("click", function () {
  // On verifie que l'input est bien saisi et valeur positive avant de l'envoyer
  // au localStorage
  console.log("QUANTITE AVANT IF");
  console.log(currentItem.quantity);
  if (
    parseInt(currentItem.quantity) > 0 &&
    parseInt(currentItem.quantity) < 100 &&
    currentItem.color
  ) {
    addCart(currentItem);
    msg.textContent = " ";
    console.log("BOUTTON ADD TO CART");
    console.log("ok order");
    console.log(currentItem.quantity);
    console.log("qté après if");
    console.log(localStorage.getItem("cart"));
  } else {
    msg.textContent =
      "* Veuillez saisir une couleur et une quantité valide pour envoyer la commande";
    msg.style.color = "red";
    msg.style.fontSize = 11 + "px";
    msg.style.fontWeight = "500";
    console.log("BOUTTON ADDTOCART");
    console.log("ko order");
    console.log(localStorage.getItem("cart"));
  }
});
//LOCAL STORAGE
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function getCart() {
  let cart = localStorage.getItem("cart");
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
  if (foundProduct) {
    //let newQuantity =
    //parseInt(foundProduct.quantity) + parseInt(currentItem.quantity);
    foundProduct.quantity =
      parseInt(foundProduct.quantity) + parseInt(currentItem.quantity);
  } else {
    cart.push(product);
  }

  saveCart(cart);
  //On refresh la quantite du produit avant la selection d'un nouvel input Qté
  currentItem.quantity = 0;
}
