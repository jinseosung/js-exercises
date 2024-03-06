"use strict";

const main = () => {
  const colors = [
    { hex: "#D53032", name: "Strawberry red" },
    { hex: "#025669", name: "Azure blue" },
    { hex: "#474B4E", name: "Blue grey" },
    { hex: "#59351F", name: "Fawn brown" },
    { hex: "#C2B078", name: "Beige" },
    { hex: "#2D572C", name: "Leaf green" },
    { hex: "#ED760E", name: "Yellow orange" },
  ];

  const btn = document.querySelector(".btn");
  const description = document.querySelector(".description");

  const handleBgColor = () => {
    const { hex, name } = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = hex;
    description.textContent = name;
  };

  btn.addEventListener("click", handleBgColor);
};

main();
