const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(url);
console.log(id);

/*Récupération API ?? */
fetch("http://localhost:3000/api/products", { method: "GET" })
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (data) {
    const findId = (data, id) => {
      for (let product of data) {
        if (product._id === id) {
          let displayImg = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
          document.querySelector("item_img").innerHTML += displayImg;
        }
      }
    };
  })
  .catch(function (err) {
    console.log(err);
  });
