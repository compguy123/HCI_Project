function x(){
alert("Hello World");
}


async function getGames(){
    const jsonPath ="../JavaScript/data.json";
    const response = await fetch(jsonPath);
    const games = await response.json();
    return games;    
}

function getTopSellersContainer(){
    return document.querySelector(".topSellersContainer");
}

document.addEventListener("DOMContentLoaded",async x =>{
    const topSellersContainer = getTopSellersContainer();
    const games = await getGames();
    for(const game of games){
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
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
      topSellersContainer.insertAdjacentHTML("afterbegin",cardHTML);
    }
    
})

