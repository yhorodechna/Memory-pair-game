
const DATA = {
    levelOne: [
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
    ],
    levelTwo: [
        {
            num: 4,
            id: 4
        },
        {
            num: 5,
            id: 5
        },
        {
            num: 6,
            id: 6
        },
    ],
    levelThree: [
        {
            num: 7,
            id: 7
        },
        {
            num: 8,
            id: 8
        },
        {
            num: 9,
            id: 9
        },
        {
            num: 10,
            id: 10
        }
    ],

};

const LEVEL_ONE = [...DATA.levelOne];
const LEVEL_TWO = [...DATA.levelOne, ...DATA.levelTwo];
const LEVEL_THREE = [...DATA.levelOne, ...DATA.levelTwo, ...DATA.levelThree];

const MAIN = document.querySelector('#main');
const MAIN_GAME_BOARD_EL = document.querySelector('#main__game-board');
let LEVEL = 1;
let ALL_MOVES = 0;
let CORRECT_MOVES = 0;
let ACCURACY;
const MAIN_LEVEL = document.querySelector('#main__level');


function startGame() {
    MAIN_GAME_BOARD_EL.classList.remove('hide')
    MAIN_WON_MESSAGE.classList.add('hide')
    MAIN_LEVEL.innerHTML=`Level ${LEVEL}` 
    ACTIVE_CARDS = [];
    HIDDEN_CARDS = 0
    while (MAIN_GAME_BOARD_EL.firstChild) {
        MAIN_GAME_BOARD_EL.removeChild(MAIN_GAME_BOARD_EL.firstChild)
    }
    while (MAIN_GAME_BOARD_EL.firstChild) {
        MAIN_WON_MESSAGE.removeChild(MAIN_WON_MESSAGE.firstChild)
    }
    if (LEVEL === 1) {
        fillGameBoard(LEVEL_ONE);
        MAIN_GAME_BOARD_EL.classList.add('level__one')
    }
    if (LEVEL === 2) {
        fillGameBoard(LEVEL_TWO);
        MAIN_GAME_BOARD_EL.classList.add('level__two')
        MAIN_GAME_BOARD_EL.classList.remove('level__one')
    }
    if (LEVEL >= 3) {
        fillGameBoard(LEVEL_THREE);
        MAIN_GAME_BOARD_EL.classList.remove('level__one')
        MAIN_GAME_BOARD_EL.classList.remove('level__two')
        MAIN_GAME_BOARD_EL.classList.add('level__three')
    }
}

function createGameCard(num, id) {
    const gameCardHtml = `
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
    MAIN_GAME_BOARD_EL.innerHTML += gameCardHtml;
};



const MAIN_WON_MESSAGE = document.querySelector('#main__won-message');

function createPlayerWonMessage() {
    const mainWonHtml = `
        <div class="won__message">
            <span class="won__level" >Level ${LEVEL} Completed!</span>
            <span class="won__moves" > You do ${ALL_MOVES} moves</span>
            <span class="won__accuracy" > Your accuracy ${ACCURACY}% </span>
            <button class="won__button" ><span class="won__button-text" >Go to the next level</span></button>
        </div>
        `;
    MAIN_WON_MESSAGE.innerHTML = mainWonHtml;
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

let ACTIVE_CARDS = [];
let HIDDEN_CARDS = 0

function onClick(event) {
    const cards = document.querySelectorAll('.flip-container');
    console.log()
    console.log()
    let current = event.target;

    function removeActiveClass() {
        cards.forEach(card => card.classList.remove('active'))
        ACTIVE_CARDS = [];
    };

    function addHiddenClass() {
        ACTIVE_CARDS.forEach(card => card.classList.add('hidden'))
        ACTIVE_CARDS = [];
        HIDDEN_CARDS += 2;

        function hideGameBoard() {
            MAIN_GAME_BOARD_EL.classList.add('hide')
        }
        if (HIDDEN_CARDS === cards.length) {
            MAIN_WON_MESSAGE.classList.remove('hide')
            ACCURACY = Math.floor((100 * CORRECT_MOVES) / ALL_MOVES);
            MAIN_LEVEL.innerHTML='' 
            console.log('win');
            hideGameBoard()
            createPlayerWonMessage()
            return;
        };
    };
    console.log(cards.length)
    console.log(HIDDEN_CARDS)

    while (current) {
        if (current.className && current.className.includes('flip-container')) {
            if (ACTIVE_CARDS.length < 2) {
                current.classList.add('active');
                ACTIVE_CARDS.push(current);
            };
            if (ACTIVE_CARDS.length === 2 && ACTIVE_CARDS[0].id === ACTIVE_CARDS[1].id) {
                ALL_MOVES++
                CORRECT_MOVES++

                setTimeout(addHiddenClass, 1000);
                return;
            };
            if (ACTIVE_CARDS.length === 2 && ACTIVE_CARDS[0].id !== ACTIVE_CARDS[1].id) {
                ALL_MOVES++
                setTimeout(removeActiveClass, 1000);
                return;
            };
        } else if (current.className && current.className.includes('won__button')) {
            LEVEL++

            startGame()
            return;
        }
        current = current.parentNode;
    }
};

MAIN.addEventListener("click", onClick);
startGame()

