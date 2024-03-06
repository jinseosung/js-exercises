"use strict";

const number = document.querySelector(".number");

const btnDecrease = document.querySelector(".btn-decrease");
const btnReset = document.querySelector(".btn-reset");
const btnIncrease = document.querySelector(".btn-increase");

let counter = 0;

const updateCounter = () => {
  number.textContent = counter;
};

const changeCounterColor = () => {
  let color;
  switch (true) {
    case counter > 0:
      color = "#008000";
      break;
    case counter < 0:
      color = "#FF0000";
      break;
    default:
      color = "#a688fa";
      break;
  }
  number.style.color = color;
};

const handleDecreaseClick = () => {
  --counter;
  changeCounterColor();
  updateCounter();
};

const handleIncreaseClick = () => {
  ++counter;
  changeCounterColor();
  updateCounter();
};

const handleResetClick = () => {
  counter = 0;
  changeCounterColor();
  updateCounter();
};

btnDecrease.addEventListener("click", handleDecreaseClick);
btnIncrease.addEventListener("click", handleIncreaseClick);
btnReset.addEventListener("click", handleResetClick);
