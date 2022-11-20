function x(){
alert("Hello World");
}

var state={
    items: [],
    total: 0, 
    isCartClicked: false,
    topSeller:[
        {title:"Sifu",description:"The beat-’em-up is dead. We aren’t getting a new Teenage Mutant Ninja Turtles game anytime soon, and you still need to drive to your local Six Flags if you want to drop quarters into the Simpsons arcade game.", price: 8,imgUrl:"https://pyxis.nymag.com/v1/imgs/5e8/530/d19eddd3c64f0cf7c9d1fca7a924eca24b-pokemon-legends-arceus.2x.rhorizontal.w700.jpg"},
        {title:"Pokémon Legends: Arceus",description:"Pokémon didn’t necessarily need to change. Over the past three years, we received new editions in the primary series with Sword and Shield as well as remasters of two DS classics in Brilliant Diamond and Shining Pearl.", price:12,imgUrl:"https://pyxis.nymag.com/v1/imgs/32e/0a0/ad5a5b9dc0de51e819d77a1137c0c10b7c-uncharted-legacy-of-thieves.2x.rhorizontal.w700.jpg"},
        {title:"Uncharted: Legacy",description:"Naughty Dog frequently rereleases its back catalogue, so it was no surprise that the great PlayStation developer bundled its PS4 Uncharted games in a package that coincides with the mediocre film adaptation.",price:10,imgUrl:"https://pyxis.nymag.com/v1/imgs/540/d91/3abec0a292f7acf7ef05ab7c2a617fa055-strange-horticulture.2x.rhorizontal.w700.jpg"},
        {title:"Strange Horticulture",description:"As the name implies, Strange Horticulture is a game about looking at plants. Beleaguered customers pour through your door and request specific herbal remedies, and you consult a dusty tome full of botanical theory before delivering the specimen of choice.",price:12,imgUrl:"https://pyxis.nymag.com/v1/imgs/540/d91/3abec0a292f7acf7ef05ab7c2a617fa055-strange-horticulture.2x.rhorizontal.w700.jpg"},
        {title:"Nobody Saves the World",description:"In most RPGs, your character’s destiny is set in stone by the second or third time you’ve leveled up. We allocate some talent points into strength and dexterity and become resigned to the fact that if we ever want to roll a mage, we’ll have to start the game over someday.", price: 8,imgUrl:"https://pyxis.nymag.com/v1/imgs/003/894/a68f0ee610fff4ed59c2d5a68d498234cf-rainbow-six-extraction.2x.rhorizontal.w700.jpg"},
        {title:"Elden Ring",description:"FromSoftware spent the past ten years creating some of the greatest single-player action games ever made. Dark Souls, Bloodborne, and Sekiro turned us loose in fascinating universes replete with devastatingly difficult bosses and a teeming underbelly of secrets, Easter eggs, and branching paths that continue to prod at your imagination long after the credits roll.", price:12,imgUrl:"https://pyxis.nymag.com/v1/imgs/0fb/305/9af48303ed31b6ab041d08ef6994b6973a-nobody-saves-the-world.2x.rhorizontal.w700.jpg"},
        {title:"Horizon Forbidden West", description:"It’s tough to wrap your mind around the setting of the Horizon series. You’re a neolithic cavewoman in a prehistoric America that happens to be populated by hulking cybernetic dinosaurs.",price:10,imgUrl:"https://pyxis.nymag.com/v1/imgs/5e8/530/d19eddd3c64f0cf7c9d1fca7a924eca24b-pokemon-legends-arceus.2x.rhorizontal.w700.jpg"},
        {title:"Tunic",description:"We are living in a golden age of abstruse, elliptical video games when Elden Ring has sold 12 million copies, but FromSoftware’s indomitable opacity has nothing on Tunic — a top-down Zelda-ish adventure that provides the player with no helpful exposition whatsoever.", price:12,imgUrl:"https://pyxis.nymag.com/v1/imgs/843/28c/bd0354ea60d5b44a7eded3aed74735d33a-tunic.2x.rhorizontal.w700.jpg"},
    ]
}

//onwindow load
window.onload = function(){

    state.topSeller.forEach(function(item,index){
        var gamesContainer = document.querySelector(".topSellerGamesContainer");
        gamesContainer.innerHTML += (`<div class="card" style="width: 18rem"> <img
        class="card-img-top"
        src="${item.imgUrl}"
      />
      <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
                ${item.description}
              </p>
              <a href="#" class="btn btn-primary" onClick=handleTopSellerClick(event,${item.price})>Add to Cart</a>
              <span class="price" id="price">$${item.price}</span>
            </div>
          </div>`)
    })
    
}



var indexClicked = -1;


function handleCloseButtonClick(){
    this.hideCart();
}

function handleTopSellerClick(event,price){
   //get parent element of event target and fetch the title
    var title = event.target.parentElement.querySelector(".card-title").innerHTML;
    //add the item to the state
    state.items.push({title:title, price: price});
    state.total += price;
    //update the cart
    updateCart();
    this.hideCart();

}

function updateCart(){
   //increase the cart count
    var cartCount = document.querySelector("#cart-count");
    cartCount.innerHTML = state.items.length;
    cartCount.style.color = "white";
    cartCount.style.backgroundColor = "green";
    cartCount.style.borderRadius = "20%";
}

function handleCartClick(){
    //toggle the cart
    this.state.isCartClicked = !this.state.isCartClicked;

    if(this.state.isCartClicked){
        showCart();
    }else{
        hideCart();
    }
    var cart = document.querySelector("#cart");
    cart.innerHTML = "";
    state.items.forEach(function(item,index){
        indexClicked = index;
        cart.innerHTML += "<div class=\"cartItem\">"+item.title+" - "+item.price+" <span class=\"cartItemRemove\" onClick='removeItem(indexClicked)'> X </span></div>";
    });
    cart.innerHTML += "<div class=\"cartTotal\">Total$: "+state.total+"</div>";
    // a checkout button which is centered on the right
    cart.innerHTML += "<button class=\"checkoutButton\">Checkout</button>";
    // a close button which is on the top right
    cart.innerHTML += "<button class=\"closeButton\" onClick=\"hideCart()\">X</button>";
}

function removeItem(index){
    //remove the item from the state
    state.total -= state.items[index].price;
    state.items.splice(index,1);
    //update the cart
    updateCart();
    handleCartClick();
    handleCartClick();
}

function showCart(){
    var cart = document.querySelector(".cart-items");
    cart.style.display = "block";
}

function hideCart(){
    var cart = document.querySelector(".cart-items");
    cart.style.display = "none";
}

