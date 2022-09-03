
const DATA = [
    {
        num: 1,
        id: 1
    },
    {
        num: 2,
        id: 2
    },
    {
        num: 3,
        id: 3
    }
];
const main = document.querySelector('#main');
const mainGameBoardEl = document.querySelector('#main__game-board');
function createGameCard(num, id) {
    const mainGameHtml = `
    <div id=${id} class="flip-container">
        <div class="flipper">
            <div class="front">
                <img class="card" src="./images/front-side.jpeg" alt="">
            </div>
            <div class="back">
                <span >${num}</span> 
            </div>
        </div>
    </div>
        `;
    mainGameBoardEl.innerHTML += mainGameHtml;
};

const mainWonMessage = document.querySelector('#main__won-message');
function createPlayerWonMessage() {
    const mainWonHtml = `
        <div class="won__message">
            <span class="won__level" >Level 1</span>
            <span class="won__text" >Completed!</span>
            <button class="won__button" ><span class="won__button-text" >Go to the next level</span></button>
        </div>
        `;
    mainWonMessage.innerHTML += mainWonHtml;
};

function fillGameBoard(data) {
    let dataCards = [];

    for (let i = 0; i < data.length; i++) {
        let numberOfSimilarCards = 2;
        while (numberOfSimilarCards != 0) {
            dataCards.push({ num: data[i].num, id: data[i].id });
            numberOfSimilarCards--;
        };
    };
    dataCards.sort(() => Math.random() - 0.5)
    for (let i = 0; i < dataCards.length; i++) {
        createGameCard(dataCards[i].num, dataCards[i].id)
    };

};
fillGameBoard(DATA);



let activeCards = [];
let hiddenCards = 0

function onClick(event) {
    const cards = document.querySelectorAll('.flip-container');
    const gameBoard = document.querySelector('#main__game-board');
    let current = event.target;
    console.log(current)
    function removeActiveClass() {
        cards.forEach(card => card.classList.remove('active'))
        activeCards = [];
    };

    function addHiddenClass() {
        activeCards.forEach(card => card.classList.add('hidden'))
        activeCards = [];
        hiddenCards += 2;

        function hideGameBoard() {
            gameBoard.classList.add('hide')
        }
        if (hiddenCards === cards.length) {
            console.log('win');
            hideGameBoard()
            createPlayerWonMessage()
        };
    };

    while (current) {
        if (current.className && current.className.includes('flip-container')) {
            if (activeCards.length < 2) {
                current.classList.add('active');
                activeCards.push(current);
            };
            if (activeCards.length === 2 && activeCards[0].id === activeCards[1].id) {
                setTimeout(addHiddenClass, 1000);
                return;
            };
            if (activeCards.length === 2 && activeCards[0].id !== activeCards[1].id) {
                setTimeout(removeActiveClass, 1000);
                return;
            };
        } else if (current.className && current.className.includes('won__button')) {
            console.log('next level')
            return;
        }
        current = current.parentNode;
    }
};
main.addEventListener("click", onClick);


