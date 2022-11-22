
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

