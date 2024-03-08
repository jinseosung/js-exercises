"use strict";

const main = () => {
  const menuBtn = document.querySelector(".container span");
  const links = document.querySelector(".links");
  const socialsLinks = document.querySelector(".socials-links");

  const toggleMenu = () => {
    links.classList.toggle("active");
    socialsLinks.classList.toggle("active");
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("active")) {
      links.classList.remove("active");
      socialsLinks.classList.remove("active");
    }
  });
  menuBtn.addEventListener("click", toggleMenu);
};

main();
