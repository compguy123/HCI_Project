var state = {
  items: [],
  total: 0,
  isCartClicked: false,
  
};

function removeItem(index) {
  //remove the item from the state
  state.total -= state.items[index].price;
  state.items.splice(index, 1);
  //update the cart
  localStorage.setItem("cart",JSON.stringify(state));
  updateCart();
  handleCartClick();
  handleCartClick();
}


if(localStorage.getItem("cart")){
  state = JSON.parse(localStorage.getItem("cart"))
  updateCart();
}


var indexClicked = -1;

function handleCloseButtonClick() {
  this.hideCart();
}


function handleTopSellerClick(event, price) {
  //get parent element of event target and fetch the title
  var title =
    event.target.parentElement.parentElement.querySelector(
      ".card-title"
    ).innerHTML;
  //add the item to the state
  state.items.push({ title: title, price: price });
  state.total += price;
  //update the cart
  updateCart();
  localStorage.setItem("cart",JSON.stringify(state));
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

function handleCheckout() {
  window.location.href = "Checkout.html";
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
    cart.innerHTML +=
      '<div class="cartItem">' +
      item.title +
      " - " +
      item.price +
      ` <span class=\"cartItemRemove\" onClick=removeItem(${index})> X </span></div>`;
  });
  cart.innerHTML += '<div class="cartTotal">Total: $' + state.total + "</div>";
  // a checkout button which is centered on the right
  cart.innerHTML += '<button class="checkoutButton" onClick="handleCheckout()">Checkout</button>';
  // a close button which is on the top right
  cart.innerHTML +=
    '<button class="closeButton" onClick="hideCart()">X</button>';
}



function showCart() {
  var cart = document.querySelector(".cart-items");
  cart.style.display = "block";
}

function hideCart() {
  var cart = document.querySelector(".cart-items");
  cart.style.display = "none";
}

var setBreadCrumb = function (pagelink,path,breadCrumbEl) {
  var history = JSON.parse(localStorage.history);
  if(!history.includes(pagelink)){
  history.push(pagelink)
  }
  localStorage.setItem("history", JSON.stringify(history));

  console.log(pagelink);
  console.log(breadCrumbEl);

  breadCrumbEl.innerHTML =`<a href="../Index.html" class="breadCrumbLinks">Home</a>`;


}