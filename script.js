'use strict';
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnChangeNames = document.querySelector('.changeNames');

//variables for players name feature
const name0El = document.querySelector('#name--0');
const name1El = document.querySelector('#name--1');
let player0name = 'Player 1';
let player1name = 'Player 2';

//Game variables
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let win = null;

// initial conditions
hide(diceEl);
score0El.textContent = 0;
score1El.textContent = 0;
name0El.textContent = player0name;
name1El.textContent = player1name;

//Switch Players
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Start Game - when 'Roll Dice' Button is clicked
const startGame = () => {
  if (!win) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    show(diceEl);
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
};

//Hold Points
const holdPoints = () => {
  if (!win) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      win = true;
      setTimeout(() => {
        window.alert(`${activePlayer === 0 ? player0name : player1name} Wins!`);
      }, 100);
    } else {
      switchPlayer();
    }
  }
};

//Start New Game - Game Reseting
const newGame = () => {
  if (win) {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    hide(diceEl);
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    removeClass(player1El, 'player--active');
    addClass(player0El, 'player--active');
    win = null;
  }
};

const changeNames = () => {
  if (!win) {
    let tempPlayer0Name = window.prompt('Player 1 name: ', player0name);
    let tempPlayer1Name = window.prompt('Player 2 name: ', player1name);
    if (tempPlayer0Name && tempPlayer1Name) {
      player0name = tempPlayer0Name;
      player1name = tempPlayer1Name;
    }
    if (player0name && player1name) {
      name0El.textContent = player0name;
      name1El.textContent = player1name;
    }
  } else {
    window.alert(`You can't change Player names for the moment`);
  }
};

// Event handller for rolling the Dice
btnRoll.addEventListener('click', startGame);
// Event for holding points
btnHold.addEventListener('click', holdPoints);
//Event handller for Reseting the Game when New Game button is clicked
btnNew.addEventListener('click', newGame);
// Event handeller for changing  Player Names
btnChangeNames.addEventListener('click', changeNames);

//functions
function hide(el) {
  el.style.display = 'none';
}
function show(el) {
  el.style.display = 'block';
}
function addClass(el, elClass) {
  el.classList.add(elClass);
}
function removeClass(el, elClass) {
  el.classList.remove(elClass);
}
