'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;

const toogleActiveClass = function () {
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
};

const switchPlayer = function () {
    currentScore = 0;
    const currentEl = document.getElementById(`current--${activePlayer}`);
    currentEl.textContent = currentScore;
    activePlayer = activePlayer ? 0 : 1;
    toogleActiveClass();
};

//Rolling dice functionality

const rollingDice = function () {
    // Generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1: if true
    if (dice !== 1) {
        //add dice to current score
        currentScore += dice;
        const currentEl = document.getElementById(`current--${activePlayer}`);
        currentEl.textContent = currentScore;
    } else {
        //switch to next player
        switchPlayer();
    }
};

//When player win
const playerWin = function () {
    const winner = document.querySelector(`.player--${activePlayer}`);
    winner.classList.add('player--winner');
    btnRoll.removeEventListener('click', rollingDice);
    btnHold.removeEventListener('click', holdingScores);
    diceEl.classList.add('hidden');
};

//Holding current scores;
const holdingScores = function () {
    const scoreEl = document.getElementById(`score--${activePlayer}`);
    scores[activePlayer] += currentScore;
    scoreEl.textContent = scores[activePlayer];
    if (scores[activePlayer] < 100) {
        switchPlayer();
    } else {
        playerWin();
    }
};

const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    diceEl.classList.add('hidden');
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    btnRoll.addEventListener('click', rollingDice);
    btnHold.addEventListener('click', holdingScores);
};

const newGame = function () {
    //Starting conditions
    init();
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

btnNew.addEventListener('click', newGame);
