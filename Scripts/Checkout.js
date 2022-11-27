window.onload = function () {
  let cart = localStorage.getItem('cart');
  document.querySelector(".odrTotal").innerHTML=JSON.parse(cart).total;
}

function handlePurchase(e) {
  e.preventDefault();
  localStorage.removeItem("cart");
  //redirect to Index.html
  window.location.href = "../Index.html";
  
  alert("THANK YOU FOR YOUR PURCHASE")
}
