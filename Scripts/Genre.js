let lastClickedButton = 0;

async function getGames() {
    const jsonPath = "https://raw.githubusercontent.com/compguy123/HCI_Project/thepace/Assets/data.json";
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
    return document.querySelector("#topSellerGames");
}

function getGenre(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let genre = params.genre;
    return genre;
}

async function displayFilteredTopSellerGames(filterByCost) {
    const gamesElement = getTopSellerGames();
    let games = await getGames();
    let genre = getGenre();
    games = games.filter(x => x.genre == genre)
    gamesElement.innerHTML = "";
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        if (game.price !== filterByCost) continue;
        const cardHTML = `<div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${game.url}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 title = "${game.gameTitle}" class="card-title">${game.gameTitle}</h5>
          <p class="card-text">
            ${game.description}
          </p>
          <div class="card-actions">
            <button class="btn btn-primary" onClick=handleTopSellerClick(event,${game.price})>Add to Cart</button>
            <span class="price">$${game.price}</span>
          </div>
        </div>
      </div>`;
        gamesElement.insertAdjacentHTML("afterbegin", cardHTML);
    }
}

document.addEventListener("DOMContentLoaded", async (x) => {
    const headerText = document.querySelector(".headerText h1");
    headerText.textContent=getGenre().toUpperCase();
    const listOfButtons = getTopSellersButton();
    for (const child of listOfButtons.children) {
        child.addEventListener("click", (x) => {
            const cost = +x.target.textContent.substring(1);
            const btn = x.target;
            btn.classList.replace("btn-primary", "btn-info");

            btn.style= " border: 10px black solid; ";

            if (lastClickedButton){
                lastClickedButton.classList.replace("btn-info", "btn-primary");
                 lastClickedButton.style="border:none;";
            }
            lastClickedButton = btn;
            //remove dollor sign
            displayFilteredTopSellerGames(cost);
        });
    }
    listOfButtons.children[0].click();
});


window.onload =  function () {
    var breadCrumbEl = document.querySelector(".history");
    setBreadCrumb("Pages/GenrePage.html","../../",breadCrumbEl);
  }


