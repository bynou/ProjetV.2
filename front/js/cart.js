let container = document.getElementById(`cart__items`);
displayCart();
//Recuperation API
function callApi(id) {
  fetch(`http://localhost:3000/api/products/${id}`, { method: `GET` })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      displayCart(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Fonction localStorage
function getLocal() {
  let cart = localStorage.getItem(`cart`);
  if (cart == null) {
    alert("Veuillez remplir votre panier.");
  } else {
    return JSON.parse(cart);
  }
}
function displayCart() {
  let cart = getLocal();
  for (let product of cart) {
    displayProduct(product);
  }
}
//Fonction affichage produit localStorage
function displayProduct(product) {
  let articleContainer = document.createElement(`article`);
  articleContainer.classList.add(`cart__item`);
  articleContainer.setAttribute(`data-id`, `${product._id}`);
  articleContainer.setAttribute(`data-color`, `${product.color}`);
  container.appendChild(articleContainer);

  let iconContainer = document.createElement(`div`);
  iconContainer.classList.add(`cart__item__img`);
  articleContainer.appendChild(iconContainer);

  let icon = document.createElement(`img`);
  icon.src = product.imageUrl;
  icon.alt = product.altTxt;
  iconContainer.appendChild(icon);

  let displayProductContent = document.createElement(`div`);
  displayProductContent.classList.add(`cart__item__content`);
  articleContainer.appendChild(displayProductContent);

  let displayProductContentDetail = document.createElement(`div`);
  displayProductContentDetail.classList.add(`cart__item__content__description`);
  displayProductContent.appendChild(displayProductContentDetail);

  let displayProductContentDetailTitle = document.createElement(`h2`);
  displayProductContentDetailTitle.textContent = `${product.name}`;
  displayProductContentDetail.appendChild(displayProductContentDetailTitle);

  let displayProductContentDetailColor = document.createElement(`p`);
  displayProductContentDetailColor.textContent = `${product.color}`;
  displayProductContentDetail.appendChild(displayProductContentDetailColor);

  let displayProductContentDetailPrice = document.createElement(`p`);
  displayProductContentDetailPrice.textContent = `${product.price}`;
  displayProductContentDetail.appendChild(displayProductContentDetailPrice);

  let displayProductContentOptions = document.createElement(`div`);
  displayProductContentOptions.classList.add(`cart__item__content__settings`);
  displayProductContent.appendChild(displayProductContentOptions);

  let displayProductContentOptionsQuantity = document.createElement(`div`);
  displayProductContentOptionsQuantity.classList.add(
    `cart__item__content__settings__quantity`
  );
  displayProductContentOptions.appendChild(
    displayProductContentOptionsQuantity
  );

  let displayProductContentOptionsQuantityTxt = document.createElement(`p`);
  displayProductContentOptionsQuantityTxt.textContent = `Qté:`;
  displayProductContentOptionsQuantity.appendChild(
    displayProductContentOptionsQuantityTxt
  );

  let displayProductContentOptionsQuantityInput =
    document.createElement(`input`);
  displayProductContentOptionsQuantityInput.name = `itemQuantity`;
  displayProductContentOptionsQuantityInput.classList.add(`itemQuantity`);
  displayProductContentOptionsQuantityInput.type = `number`;
  displayProductContentOptionsQuantityInput.min = 1;
  displayProductContentOptionsQuantityInput.max = 100;
  displayProductContentOptionsQuantityInput.value = `${product.quantity}`;
  displayProductContentOptionsQuantity.appendChild(
    displayProductContentOptionsQuantityInput
  );

  let containerDelete = document.createElement(`div`);
  containerDelete.classList.add(`cart__item__content__settings__delete`);
  displayProductContentOptions.appendChild(containerDelete);

  let containerDeleteTxt = document.createElement(`p`);
  containerDeleteTxt.classList.add(`deleteItem`);
  containerDeleteTxt.textContent = `Supprimer`;
  containerDelete.appendChild(containerDeleteTxt);
}
