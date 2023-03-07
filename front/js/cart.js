let container = document.getElementById("cart__items");
let msgErrQty = document.createElement("p");
function msgErrQtyTxt() {
  msgErrQty.textContent = "  * Veuillez saisir une quantité positive.";
  msgErrQty.style.color = "red";
}
displayCart();
//Recuperation API pour completion data product
function callApi(id, color, quantity) {
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
      };
      let newProduct = { ...data, ...localProduct };
      displayProduct(newProduct);
    })
    .catch(function (err) {
      console.log(err);
    });
}
/*
function callPrice() {
  fetch(`http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926`, {
    method: "GET",
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      return data.price;
    })
    .then(function (prix) {
      let price = prix;
      console.log(price);
      return price;
    })
    .catch(function (err) {
      console.log(err);
    });
}
function calculePrice(price, quantity) {
  return parseInt(price) * parseInt(quantity);
}*/
//fonction Display price avec appel API: prix pas stocké dans variable
function displayPriceSum() {
  let displayPrice = document.getElementById("totalPrice");
  let total = 0;
  let cart = getCart();
  for (let product of cart) {
    fetch(`http://localhost:3000/api/products/${product._id}`, {
      method: "GET",
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        total += parseInt(data.price) * parseInt(product.quantity);
        displayPrice.textContent = total + ",00";
      })
      .catch(function (err) {
        console.log(err);
      });
  }
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
    callApi(product._id, product.color, product.quantity);
  }
}
function deleteCart(product) {
  let cart = getCart();

  cart = cart.filter(
    (p) => !(p._id == product._id && p.color == product.color)
  );

  //cart = cart.filter((p) => p.key != product.key);
  saveCart(cart);
  displayPriceSum();
  displayQuantitySum();
}
function displayInputQuantity(e, product) {
  let currentQuantity = e.target.value;
  let cart = getCart();
  let foundProduct = cart.find(
    (p) => p._id == product._id && p.color == product.color
  );
  if (foundProduct) {
    let newQuantity = currentQuantity;
    foundProduct.quantity = parseInt(newQuantity);
  } else {
    console.log("bug pour quantité");
  }
  saveCart(cart);
  displayPriceSum();
  displayQuantitySum();
}
function displayQuantitySum() {
  let total = 0;
  let QuantitySum = document.getElementById("totalQuantity");
  let cart = getCart();
  for (let product of cart) {
    total += parseInt(product.quantity);
  }
  QuantitySum.textContent = total;
}
//Fonction affichage produit localStorage
function displayProduct(product) {
  let articleContainer = document.createElement("article");
  articleContainer.classList.add("cart__item");
  articleContainer.setAttribute("data-id", product._id);
  articleContainer.setAttribute("data-color", product.color);
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
  displayProductContentDetailTitle.textContent = product.name;
  displayProductContentDetail.appendChild(displayProductContentDetailTitle);

  let displayProductContentDetailColor = document.createElement("p");
  displayProductContentDetailColor.textContent = product.color;
  displayProductContentDetail.appendChild(displayProductContentDetailColor);

  let displayProductContentDetailPrice = document.createElement("p");
  displayProductContentDetailPrice.textContent = product.price + ",00€";
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
  displayProductContentOptionsQuantityInput.value = product.quantity;
  displayProductContentOptionsQuantity.appendChild(
    displayProductContentOptionsQuantityInput
  );
  displayProductContentOptionsQuantityInput.addEventListener(
    "change",
    function (e) {
      if (/^-/.test(e.target.value)) {
        //displayProductContentOptionsQuantityInput.value.replace(/^-/, "lol");
        msgErrQtyTxt();
        console.log("BOUTTON QUANTITE ");
        console.log("ko");
        console.log(localStorage.getItem("cart"));
      } else {
        msgErrQty.textContent = " ";
        console.log("BOUTTON QUANTITE");
        console.log("ok");
        displayInputQuantity(e, product);
        console.log(localStorage.getItem("cart"));
      }
    }
  );
  displayProductContentOptionsQuantity.appendChild(msgErrQty);
  // ici  code displayProductContentOptionsQuantityInput

  let containerDelete = document.createElement("div");
  containerDelete.classList.add("cart__item__content__settings__delete");
  displayProductContentOptions.appendChild(containerDelete);
  let containerDeleteTxt = document.createElement("p");
  containerDeleteTxt.classList.add("deleteItem");
  containerDeleteTxt.textContent = "Supprimer";
  containerDelete.appendChild(containerDeleteTxt);
  containerDeleteTxt.addEventListener("click", function () {
    deleteCart(product);
    //Permet d'interagir avec le DOM, utilisation fonction element.closest()
    //demandée pour refresh après utilisation btn Delete
    containerDeleteTxt
      .closest(
        `article[data-id="${product._id}"][data-color="${product.color}"]`
      )
      .remove();
  });
  displayPriceSum();
  displayQuantitySum();
}

// Traitement du formulaire

// Selection btn order
let btnOrder = document.getElementById("order");
//RegEx pour prénom/nom/ville
let regExNameCity = (data) => {
  return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(data);
};
// function validiter controle
function firstNameControl(form) {
  let firstName = form.firstName;
  if (regExNameCity(firstName)) {
    document.getElementById("firstNameErrorMsg").textContent = " ";
    console.log("CHAMPS PRENOM");
    console.log("OK");
    return true;
  } else {
    document.getElementById("firstNameErrorMsg").textContent =
      " * Veuillez saisir un prénom valide.";
    console.log("CHAMPS PRENOM");
    console.log("KO");
    return false;
  }
}
function lastNameControl(form) {
  let lastName = form.lastName;
  if (regExNameCity(lastName)) {
    document.getElementById("lastNameErrorMsg").textContent = " ";
    console.log("CHAMPS LASTNAME");
    console.log("OK");
    return true;
  } else {
    document.getElementById("lastNameErrorMsg").textContent =
      " * Veuillez saisir un nom valide.";
    console.log("CHAMPS LASTNAME");
    console.log("KO");
    return false;
  }
}
function addressControl(form) {
  let address = form.address;
  // Tentative de (adress === undefined) => fonctionne pas
  if (address) {
    document.getElementById("addressErrorMsg").textContent = " ";
    console.log("CHAMPS ADDRESSE");
    console.log("OK");
    return true;
  } else {
    document.getElementById("addressErrorMsg").textContent =
      "* Veuillez saisir une adresse. ";
    console.log("CHAMPS ADRESSE");
    console.log("KO");
    return false;
  }
}
function cityControl(form) {
  let city = form.city;
  if (regExNameCity(city)) {
    document.getElementById("cityErrorMsg").textContent = " ";
    console.log("CHAMPS CITY");
    console.log("OK");
    return true;
  } else {
    document.getElementById("cityErrorMsg").textContent =
      " * Veuillez saisir le nom d'une Ville valide.";
    console.log("CHAMPS CITY");
    console.log("KO");
    return false;
  }
}
function emailControl(form) {
  let email = form.email;
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
      email
    )
  ) {
    document.getElementById("emailErrorMsg").textContent = " ";
    console.log("CHAMPS EMAIL");
    console.log("OK");
    return true;
  } else {
    document.getElementById("emailErrorMsg").textContent =
      " * Veuillez saisir une adresse mail valide.";
    console.log("CHAMPS EMAIL");
    console.log("KO");
    return false;
  }
}

// ----------------- FIN FUNCTION CONTROL-------------------
// add Event Listener
btnOrder.addEventListener("click", function (e) {
  e.preventDefault();
  // Création objet avec les values du form
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log("formulaire");
  console.log(contact);
  // controle des champs du form
  firstNameControl(contact);
  lastNameControl(contact);
  addressControl(contact);
  cityControl(contact);
  emailControl(contact);
  //Si les champs passe le control alors on crée le bon de commande
  if (
    firstNameControl(contact) &&
    lastNameControl(contact) &&
    addressControl(contact) &&
    cityControl(contact) &&
    emailControl(contact)
  ) {
    let products = arrayIdProducts();
    let bonCommande = {
      contact: contact,
      products: products,
    };
    //TEST
    //
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bonCommande),
    })
      .then(function (res) {
        if (res.ok) {
          console.log("RESS API");
          console.log(res.ok);
          return res.json();
        }
      })
      .then(function (data) {
        console.log(data.orderId);
        window.location.href = "confirmation.html?orderId=" + data.orderId;
      })
      .catch(function (err) {
        console.log(err);
      });
    //FIN TEST
    //sendCommand(bonCommande);
    console.log("bon de commande");
    console.log("OK");
    console.log(bonCommande);
  } else {
    console.log("bon de commande");
    console.log("KO");
    console.log(bonCommande);
  }
});

async function sendCommand(contactForm) {
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(contactForm),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.orderId);
      //window.location.href = "confirmation.html?orderId=" + orderId;
    })
    .catch((err) => {
      console.error(err);
      alert("erreur: " + err);
    });
}
//on init tableau qui va récuperer les ids des produits du localStorage
let listId = [];
//Creation nouveaux tableau qui ne contient que les ids des produits du panier
function arrayIdProducts() {
  let cart = getCart();
  for (let product of cart) {
    listId.push(product._id);
  }
  console.log("Tableau des products_id");
  console.log(listId);
  return listId;
}
