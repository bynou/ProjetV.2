// on pointe sur le conteneur des produits
let displayProducts = document.getElementById(`items`);

//Creation de la fonction pour la boucle for.. of

/* On recupère ici l'api dans un tableau catalogue */

fetch("http://localhost:3000/api/products", { method: "GET" })
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  /* Boucle pour implanter dynamiquement les produits du catalogue*/
  .then(function (data) {
    const catalogue = data;
    for (let product of data) {
      // Modification du DOM selon le produit
      // main container du catalogue
      /*let container = document.createElement("a");
      document.getElementById("items").appendChild(container);
      container.href = `./product.html?id=${product._id}`;


      let articleContainer = document.createElement("article");
      container.appendChild(articleContainer);

      let icon = document.createElement("img");
      articleContainer.appendChild(icon);
      icon.setAttribute("src",${product.imgUrl});
      icon.setAttribute("alt",${product.altTxt});

      let iconTitle = document.createElement("h3");
      iconTitle.classList.add("productName");
      iconTitle.append(${product.name});

      let iconDetails = document.createElement("p");
      iconDetails.classList.add("productDescription");
      iconDetails.append(${product.description});*/

      /*displayProducts
        .appendChild(container)
        .appendChild(articleContainer)
        .append(icon, iconTitle, iconDetails);
      iconTitle.append("hello");*/

      /*displayProducts.appendChild(container);
container.appendChild(articleContainer);
articleContainer.appendChild(icon);
articleContainer.appendChild(iconTitle);
articleContainer.appendChild(iconDescription);
      container.setAttribute(`href`,`./product.html?id=${product._id}`);
      icon.setAttribute(`src`, `${product.imageUrl}`);
      icon.setAttribute(`alt`, `${product.altTxt}`);
      iconTitle.setAttribute(`class`,`productName`);
      iconTitle.textContent = ${product.name};
      iconDescription.setAttribute(`class`,`productDescription`);
      iconDescription.textContent = ${product.description};*/
      let blockHTML = `<a href="./product.html?id=${product._id}"><article>
<img src="${product.imageUrl}" alt="${product.altTxt}">
<h3 class="productName">${product.name}</h3>
<p class="productDescription">${product.description}</p></article></a>`;
      displayProducts.innerHTML += blockHTML;
    }
  })
  .catch(function (err) {
    console.log(err);
  });
