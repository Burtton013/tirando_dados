"use strict";

//BOTONES
const newGame = document.querySelector(".btn--new");
const rollingDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

//DADO
const dice = document.querySelector(".dice");

//SCORE JUGADORES
const scorePlayerOne = document.getElementById("current--0");
const scorePlayerTwo = document.getElementById("current--1");
const totalPlayerOne = document.getElementById("score--0");
const totalPlayerTwo = document.getElementById("score--1");

//SECTION JUGADORES
const sectionOne = document.querySelector(".player--0");
const sectionTwo = document.querySelector(".player--1");

//Variables

let currentScore, playing, activePlayer, globalScores;

//Functiones refactorizando

const init = () => {
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  globalScores = [0, 0];

  totalPlayerOne.textContent = 0;
  totalPlayerTwo.textContent = 0;
  scorePlayerOne.textContent = 0;
  scorePlayerTwo.textContent = 0;

  dice.classList.add("hidden");
  sectionOne.classList.remove("player--winner");
  sectionTwo.classList.remove("player--winner");
  sectionOne.classList.add("player--active");
  sectionTwo.classList.remove("player--active");
};

const switchingPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  sectionOne.classList.toggle("player--active");
  sectionTwo.classList.toggle("player--active");
};

//Corriendo la funcion inicializadora

init();

//Tirando el dado

rollingDice.addEventListener("click", () => {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    dice.src = `./source/dice-${diceNumber}.png`;
    dice.classList.remove("hidden");

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Cambiando de jugador
      switchingPlayer();
    }
    console.log(diceNumber);
  }
});

//Manteniendo puntaje

hold.addEventListener("click", () => {
  if (playing) {
    globalScores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      globalScores[activePlayer];
    if (globalScores[activePlayer] >= 20) {
      dice.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchingPlayer();
    }
  }
});

newGame.addEventListener("click", init);
