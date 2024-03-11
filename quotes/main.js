"use strict";

const main = () => {
  const quoteText = document.querySelector(".quote");
  const nameText = document.querySelector(".name");
  const leftBtn = document.querySelector(".fa-chevron-left");
  const rightBtn = document.querySelector(".fa-chevron-right");
  const randomBtn = document.querySelector(".btn-random");

  const quotes = [
    {
      name: "Vivian Greene",
      quote:
        "La vie n'est pas d'attendre que les tempêtes passent, c'est d'apprendre à danser sous la pluie.",
    },
    {
      name: "Proverbe japonais",
      quote: "Le succès, c'est tomber sept fois et se relever huit.",
    },
    {
      name: "Steve Jobs",
      quote:
        "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
    },
    {
      name: "Winston Churchill",
      quote:
        "La véritable opportunité de succès réside dans la capacité à se relever après un échec.",
    },
    {
      name: "Mahatma Gandhi",
      quote: "La vie est un mystère à vivre, et non un problème à résoudre.",
    },
    {
      name: "Eleanor Roosevelt",
      quote:
        "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.",
    },
    {
      name: "Steve Jobs",
      quote:
        "Ne laissez pas le bruit des opinions des autres noyer votre propre voix intérieure.",
    },
    {
      name: "Winston Churchill",
      quote:
        "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.",
    },
    {
      name: "Mahatma Gandhi",
      quote: "Soyez le changement que vous voulez voir dans le monde.",
    },
    {
      name: "John Lennon",
      quote:
        "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets.",
    },
  ];

  const displayQuote = (index) => {
    const { name, quote } = quotes[index];
    quoteText.textContent = quote;
    nameText.textContent = name;
  };

  const randomIndex = () => Math.floor(Math.random() * quotes.length);

  const handleNextOrPrevQuote = (direction) => () => {
    const currentIndex = quotes.findIndex(
      (quote) => quote.quote === quoteText.textContent
    );
    let nextIndex;
    direction === "next"
      ? (nextIndex = (currentIndex + 1) % quotes.length)
      : (nextIndex = (currentIndex - 1 + quotes.length) % quotes.length);

    displayQuote(nextIndex);
  };

  const handleNextQuote = handleNextOrPrevQuote("next");
  const handlePrevQuote = handleNextOrPrevQuote("prev");

  rightBtn.addEventListener("click", handleNextQuote);
  leftBtn.addEventListener("click", handlePrevQuote);
  randomBtn.addEventListener("click", () => displayQuote(randomIndex()));

  displayQuote(randomIndex());
};

main();
