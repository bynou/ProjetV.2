let container = document.getElementById("cart__items");
displayCart();
//Recuperation API pour le product
function callApi(id, color, quantity, key) {
  fetch(`http://localhost:3000/api/products/${id}`, { method: "GET" })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let product = data;
      Reflect.deleteProperty(product, `colors`);
      Reflect.deleteProperty(product, `_id`);
      let localProduct = {
        color: color,
        quantity: quantity,
        _id: id,
        key: key,
      };
      let newProduct = { ...data, ...localProduct };
      displayProduct(newProduct);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Fonction localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    alert("Veuillez remplir votre panier.");
  } else {
    return JSON.parse(cart);
  }
}
function displayCart() {
  let cart = getCart();
  for (let product of cart) {
    callApi(product._id, product.color, product.quantity, product.key);
  }
}
function deleteCart(product) {
  let cart = getCart();
  /* ce qui etait présent avant et ne fonctionnait pas:
  cart = cart.filter((p)=>p._id != product._id && p.color != product.color
  => supprimer tous les products qui avait le même id sans regarder 
  la condition de la couleur
  */
  cart = cart.filter((p) => p.key != product.key);
  saveCart(cart);
}
//Fonction affichage produit localStorage
function displayProduct(product) {
  let articleContainer = document.createElement("article");
  articleContainer.classList.add("cart__item");
  articleContainer.setAttribute("data-id", `${product._id}`);
  articleContainer.setAttribute("data-color", `${product.color}`);
  container.appendChild(articleContainer);

  let iconContainer = document.createElement("div");
  iconContainer.classList.add("cart__item__img");
  articleContainer.appendChild(iconContainer);

  let icon = document.createElement("img");
  icon.src = product.imageUrl;
  icon.alt = product.altTxt;
  iconContainer.appendChild(icon);

  let displayProductContent = document.createElement("div");
  displayProductContent.classList.add("cart__item__content");
  articleContainer.appendChild(displayProductContent);

  let displayProductContentDetail = document.createElement("div");
  displayProductContentDetail.classList.add("cart__item__content__description");
  displayProductContent.appendChild(displayProductContentDetail);

  let displayProductContentDetailTitle = document.createElement("h2");
  displayProductContentDetailTitle.textContent = `${product.name}`;
  displayProductContentDetail.appendChild(displayProductContentDetailTitle);

  let displayProductContentDetailColor = document.createElement("p");
  displayProductContentDetailColor.textContent = `${product.color}`;
  displayProductContentDetail.appendChild(displayProductContentDetailColor);

  let displayProductContentDetailPrice = document.createElement("p");
  displayProductContentDetailPrice.textContent = `${product.price},00€`;
  displayProductContentDetail.appendChild(displayProductContentDetailPrice);

  let displayProductContentOptions = document.createElement("div");
  displayProductContentOptions.classList.add("cart__item__content__settings");
  displayProductContent.appendChild(displayProductContentOptions);

  let displayProductContentOptionsQuantity = document.createElement("div");
  displayProductContentOptionsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  displayProductContentOptions.appendChild(
    displayProductContentOptionsQuantity
  );

  let displayProductContentOptionsQuantityTxt = document.createElement("p");
  displayProductContentOptionsQuantityTxt.textContent = "Qté:";
  displayProductContentOptionsQuantity.appendChild(
    displayProductContentOptionsQuantityTxt
  );

  let displayProductContentOptionsQuantityInput =
    document.createElement("input");
  displayProductContentOptionsQuantityInput.name = "itemQuantity";
  displayProductContentOptionsQuantityInput.classList.add("itemQuantity");
  displayProductContentOptionsQuantityInput.type = "number";
  displayProductContentOptionsQuantityInput.min = 1;
  displayProductContentOptionsQuantityInput.max = 100;
  displayProductContentOptionsQuantityInput.value = `${product.quantity}`;
  displayProductContentOptionsQuantity.appendChild(
    displayProductContentOptionsQuantityInput
  );

  let containerDelete = document.createElement("div");
  containerDelete.classList.add("cart__item__content__settings__delete");
  displayProductContentOptions.appendChild(containerDelete);
  let containerDeleteTxt = document.createElement("p");
  containerDeleteTxt.classList.add("deleteItem");
  containerDeleteTxt.textContent = "Supprimer";
  containerDelete.appendChild(containerDeleteTxt);
  containerDeleteTxt.addEventListener("click", function () {
    deleteCart(product);
    location.reload();
  });
}
