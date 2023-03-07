// Récupération du bon de commande orderId de l'url

let orderId = new URLSearchParams(window.location.search).get("orderId");

// Implémentation de l'id du bon de commande
document.getElementById("orderId").textContent = orderId;

// Clear localStorage
window.localStorage.clear();
