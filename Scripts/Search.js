"use strict";

var carousel = document.getElementsByClassName('carousel')[0],
slider = carousel.getElementsByClassName('carousel__slider')[0],
items = carousel.getElementsByClassName('carousel__slider__item'),
prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
nextBtn = carousel.getElementsByClassName('carousel__next')[0];

var width, height, totalWidth, margin = 20,
    currIndex = 0,
    interval, intervalTime = 4000;

function init() {
    resize();
    move(Math.floor(items.length / 2)+1);
    bindEvents();
    console.log(items);
    timer();
}

function resize() {
    // width = Math.max(window.innerWidth * .25, 275),
    width = 310;
    height = window.innerHeight * .5,
        totalWidth = width * items.length;

    slider.style.width = totalWidth + "px";

    for (var i = 0; i < items.length; i++) {
        let item = items[i];
        item.style.width = (width - (margin * 2)) + "px";
        item.style.height = height + "px";
    }
}

function move(index) {

    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;
    
    for (var i = 0; i < items.length; i++) {
        let item = items[i],
            box = item.getElementsByClassName('item__3d-frame')[0];
        if (i == (index - 1)) {
            item.classList.add('carousel__slider__item--active');
            box.style.transform = "perspective(1200px)";
        } else {
            item.classList.remove('carousel__slider__item--active');
            box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
        }
    }

    slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
}

function timer() {
    clearInterval(interval);
    interval = setInterval(() => {
        move(++currIndex);
    }, intervalTime);
}

function prev() {
    move(--currIndex);
    timer();
}

function next() {
    move(++currIndex);
    timer();
}


function bindEvents() {
    window.onresize = resize;
    prevBtn.addEventListener('click', () => { prev(); });
    nextBtn.addEventListener('click', () => { next(); });
}


function getQuery() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let query = params.query;
    return query;
}



let lastClickedButton = 0;

async function getGames() {
    const jsonPath = "https://raw.githubusercontent.com/compguy123/HCI_Project/larenwork/Assets/data.json";
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


async function displayFilteredTopSellerGames(filterByCost) {
    const gamesElement = getTopSellerGames();
    let games = await getGames();
    const query = getQuery();
    games = games.filter(x => x.gameTitle.toUpperCase().includes(query?.toUpperCase()));
    if(!query)
    return;
    if (games.length ===0) {
        gamesElement.innerHTML = `<span> OOPS! Nothing found. Here are other games you might be interesed in:</span>
       
    `
    function generateCard(game){
        return ` <div class="carousel__slider__item" style="width: 18rem;  max-height: 250px;">
        <div class="item__3d-frame">
            <div class="item__3d-frame__box item__3d-frame__box--front">
                <div class="card">
                    <img class="card-img-top" width = "50" src="${game.url}" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">${game.gameTitle}</h5>
                        <p class="card-text">
                            ${game.description}
                        </p>
                        <div class="card-actions">
                            <button class="btn btn-primary" onClick=handleTopSellerClick(event,${game.price})>Add to
                                Cart</button>
                            <span class="price">$${game.price}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>`
    
    }
    const c = document.querySelector(".carousel");
    const s = document.querySelector(".carousel__slider");
    c.style.display="block";
    games =await getGames();
    games = games.reverse();
    games= games.slice(0,10);
    const htmlCards = games.map(x => generateCard(x));
    s.innerHTML= htmlCards.join("\n");
        return;
    }
    gamesElement.innerHTML = "";
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const cardHTML = `<div class="card" style="width: 18rem">
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
    await displayFilteredTopSellerGames();
    init();
});


window.onload = function () {
    
    var breadCrumbEl = document.querySelector(".history");
    setBreadCrumb("Pages/TopSellers.html", "../../", breadCrumbEl);
 
}

