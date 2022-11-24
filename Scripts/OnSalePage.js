(async function () {
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
        move(Math.floor(items.length / 2));
        bindEvents();

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






    async function getGames() {
        const jsonPath = "../Assets/data.json";
        const response = await fetch(jsonPath);
        const games = await response.json();
        return games;
    }
    
    async function getOnSale() {
        const games = await getGames();
        return games.filter(game => game.price === 1);

    }
    
    async function generateCards(){
        const carousel  = document.querySelector(".carousel__slider");
        const games =  await getOnSale();
        for(let i =0;i<games.length;i++){
            const game = games[i];
            const card =`<div class="carousel__slider__item" style="width: 18rem;  max-height: 250px;">
            <div class="item__3d-frame">
                <div class="item__3d-frame__box item__3d-frame__box--front">
                    <div class="card">
                        <span class="stamp">$1</span>
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
    carousel.insertAdjacentHTML("afterbegin", card);
        }
        
    }
   
   await generateCards();
   
   
   init();

})();


  window.onload =  function () {
    
    var breadCrumbEl = document.querySelector(".history");
    setBreadCrumb("Pages/OnSalePage.html","../../",breadCrumbEl);
  }