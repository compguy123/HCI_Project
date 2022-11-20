
let currentPrice= 0;

async function getGames() {
  const jsonPath = "../JavaScript/data.json";
  const response = await fetch(jsonPath);
  const games = await response.json();
  return games;
}

function getTopSellersContainer() {
  return document.querySelector(".topSellersContainer");
}

function getTopSellersButton() {
  return document.querySelector("#topSellersButton");
}

function getTopSellerGames() {
  return document.querySelector("#topSellerGames")
}

async function displayFilteredTopSellerGames(filterByCost) {
  const gamesElement = getTopSellerGames();
  const games = await getGames();
  let numberOfTopGames = 10;
  gamesElement.innerHTML ="";
  for (let i = 0; i < numberOfTopGames; i++) {
    const game = games[i];
    if (game.price !== filterByCost)
      continue;
    const cardHTML =
      `<div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${game.url}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">${game.gameTitle}</h5>
          <p class="card-text">
            ${game.description}
          </p>
          <div>
          <button class="btn btn-primary" onClick=handleTopSellerClick(event,${game.price})>Add to Cart</button>
          <span class="price" >$${game.price}</span>
          </div>
        </div>
      </div>`
      gamesElement.insertAdjacentHTML("afterbegin", cardHTML);
  }

}



document.addEventListener("DOMContentLoaded", async x => {
  const listOfButtons = getTopSellersButton();
  console.log(listOfButtons);
  for (const child of listOfButtons.children) {
    child.addEventListener("click", x => {
      const cost = x.target.textContent;
      //remove dollor sign 
      displayFilteredTopSellerGames(+cost.substring(1));
    });

  }

})
/*
const topSellersContainer = getTopSellersContainer();
  const games = await getGames();
  let numberOfTopGames = 5;
  for (let i = 0; i < numberOfTopGames; i++) {
    const game = games[i];
    const cardHTML =
      `<div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${game.url}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">${game.gameTitle}</h5>
          <p class="card-text">
            ${game.description}
          </p>
          <div>
          <button class="btn btn-primary" onClick=handleTopSellerClick(event,${game.price})>Add to Cart</button>
          <span class="price" >$${game.price}</span>
          </div>
        </div>
      </div>`
    topSellersContainer.insertAdjacentHTML("afterbegin", cardHTML);
  }
*/

var state = {
  items: [],
  total: 0,
  isCartClicked: false
}

var indexClicked = -1;


function handleCloseButtonClick() {
  this.hideCart();
}

function handleTopSellerClick(event, price) {
  //get parent element of event target and fetch the title
  var title = event.target.parentElement.parentElement.querySelector(".card-title").innerHTML;
  //add the item to the state
  state.items.push({ title: title, price: price });
  state.total += price;
  //update the cart
  updateCart();
  this.hideCart();

}

function updateCart() {
  //increase the cart count
  var cartCount = document.querySelector("#cart-count");
  cartCount.innerHTML = state.items.length;
  cartCount.style.color = "white";
  cartCount.style.backgroundColor = "green";
  cartCount.style.borderRadius = "20%";
}

function handleCartClick() {
  //toggle the cart
  this.state.isCartClicked = !this.state.isCartClicked;

  if (this.state.isCartClicked) {
    showCart();
  } else {
    hideCart();
  }
  var cart = document.querySelector("#cart");
  cart.innerHTML = "";
  state.items.forEach(function (item, index) {
    indexClicked = index;
    cart.innerHTML += "<div class=\"cartItem\">" + item.title + " - " + item.price + " <span class=\"cartItemRemove\" onClick='removeItem(indexClicked)'> X </span></div>";
  });
  cart.innerHTML += "<div class=\"cartTotal\">Total$: " + state.total + "</div>";
  // a checkout button which is centered on the right
  cart.innerHTML += "<button class=\"checkoutButton\">Checkout</button>";
  // a close button which is on the top right
  cart.innerHTML += "<button class=\"closeButton\" onClick=\"hideCart()\">X</button>";
}

function removeItem(index) {
  //remove the item from the state
  state.total -= state.items[index].price;
  state.items.splice(index, 1);
  //update the cart
  updateCart();
  handleCartClick();
  handleCartClick();
}

function showCart() {
  var cart = document.querySelector(".cart-items");
  cart.style.display = "block";
}

function hideCart() {
  var cart = document.querySelector(".cart-items");
  cart.style.display = "none";
}

