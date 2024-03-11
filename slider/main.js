"use strict";

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const sliders = document.querySelector(".sliders");
const sliderWidth = sliders.offsetWidth;

const handlePrevImg = () => {
  sliders.scrollLeft !== 0
    ? sliders.scrollBy({ left: -sliderWidth, behavior: "smooth" })
    : sliders.scrollTo({ left: sliders.scrollWidth, behavior: "smooth" });
};

const handleNextImg = () => {
  sliders.scrollLeft < sliders.scrollWidth - sliderWidth
    ? sliders.scrollBy({ left: sliderWidth, behavior: "smooth" })
    : sliders.scrollTo({ left: 0, behavior: "smooth" });
};

btnLeft.addEventListener("click", handlePrevImg);
btnRight.addEventListener("click", handleNextImg);
