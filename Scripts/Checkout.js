window.onload = function () {
  let cart = localStorage.getItem('cart');
  document.querySelector(".odrTotal").innerHTML=JSON.parse(cart).total;
}