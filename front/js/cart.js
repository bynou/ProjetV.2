const lastCart = JSON.parse(localStorage.getItem(`cart`));
let currentCart = JSON.parse(localStorage.getItem(`globalCart`));
console.log(lastCart);
let globalCart = [];
addCart();
function addCart() {
  if (globalCart.length < 1) {
    globalCart.push(lastCart);
    localStorage.setItem(`globalCart`, JSON.stringify(globalCart));
    console.log(`lol`);
  } else {
  }
}
/*let globalCart = [];
// déclare objet qu'on va pouvoir comparer
let addToCart = {};
addToCart.color = lastCart.color;
addToCart.quantity = lastCart.quantity;
addToCart.id = lastCart.id;
cartDisplay();
function cartDisplay() {
  if (globalCart.length != 0) {
    console.log(`y a un truc qu'on voit peut etre`);
  } else {
    globalCart.push(addToCart);
    console.log(`y a r donc ça a push lol`);
  }
}
// ebauche pour l'implantation des articles du panier
/*const cartContainer = document.getElementById(`cart__items`);
let cartArticle = document.createElement(`article`);
cartArticle.classList.add(`cart__item`);
cartContainer.appendChild(cartArticle);*/
//init Array pour récuperer les differents produits
