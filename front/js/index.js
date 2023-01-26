// on pointe sur l'element items
let displayProducts = document.getElementById(`items`);

fetch("http://localhost:3000/api/products", { method: "GET" })
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  /* Boucle pour implanter dynamiquement les produits du catalogue*/
  .then(function (data) {
    for (let product of data) {
      //création balise <a> de chaque produit
      let container = document.createElement(`a`);
      displayProducts.appendChild(container);
      container.href = `<a href="./product.html?id=${product._id}`;

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
  })
  .catch(function (err) {
    console.log(err);
  });
