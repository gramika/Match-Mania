
// shuffle the cards
function shuffle() {
    let subDiv = document.getElementById("game");
    let cards = subDiv.getElementsByClassName("card");

    let cardArray = [];
    for (let i = 0; i < cards.length; i++) {
        cardArray.push(cards[i]);
    }

    cardArray.sort(() => Math.random() - 0.5);
    subDiv.innerHTML = "";
    for (let i = 0; i < cardArray.length; i++) {
        subDiv.appendChild(cardArray[i]);
    }
}

// shuffle();



let timeLeft = 30;
let timerId;
let gameOver = false;
let gameStarted = false;
// set timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft = timeLeft - 1;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameOver = true;
            gameStarted = false;
            alert("time over!!!");
        }
    }, 1000);
}
// game starting
function startGame() {

    // reseting the values
    clearInterval(timerId);
    timeLeft = 30;
    document.getElementById("time").innerText = timeLeft;
    gameOver = false;
    gameStarted = true;

    // shuffle the cards
    shuffle();
    // starting the timer
    startTimer();

}

// reset the board
function reSet() {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("flip");
    }
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    // shuffle the cards again
    shuffle();
    clearInterval(timerId);
    timeLeft = 30;
    gameOver = false;
    gameStarted=false;
    document.getElementById("time").innerText = timeLeft;
}

// startTimer();
// flip cards

let firstCard = null;
let secondCard = null;
let lockBoard = false; // stops clicking too fast


function flipCard(cardId) {
    if (!gameStarted || lockBoard || gameOver) return;

    let card = document.getElementById(cardId);
    if (card == firstCard) {
        return;
    }
    card.classList.add("flip");
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

// card match

function checkMatch() {
    let img1 = firstCard.querySelector("img").src;
    let img2 = secondCard.querySelector("img").src;

    if (img1 == img2) {
        firstCard = null;
        secondCard = null;
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }

}