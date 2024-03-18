"use strict";

const toggleBtn = document.querySelector(".toggle");

toggleBtn.addEventListener("click", () => {
  document.querySelector("html").toggleAttribute("data-dark-mode");
});
