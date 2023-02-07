// on pointe sur l'element items
let displayProducts = document.getElementById(`items`);
main();
//Afficher le contenu dynamiquement
function main() {
  callApi();
}
//Recuperation API
function callApi() {
  fetch("http://localhost:3000/api/products", { method: "GET" })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      display(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
// creation fonction boucle api
function display(API) {
  for (let product of API) {
    //création balise <a> de chaque produit
    let container = document.createElement(`a`);
    displayProducts.appendChild(container);
    container.href = `product.html?id=${product._id}`;

    //creation article fiche produit
    let articleContainer = document.createElement(`article`);
    container.appendChild(articleContainer);

    //creation contenu fiche produit
    let icon = document.createElement(`img`);
    icon.src = product.imageUrl;
    icon.alt = product.altTxt;
    articleContainer.appendChild(icon);

    let iconTitle = document.createElement(`h3`);
    iconTitle.classList.add(`productName`);
    iconTitle.textContent = `${product.name}`;
    articleContainer.appendChild(iconTitle);

    let iconDetails = document.createElement(`p`);
    iconDetails.classList.add(`productDescription`);
    iconDetails.textContent = `${product.description}`;
    articleContainer.appendChild(iconDetails);
  }
}
