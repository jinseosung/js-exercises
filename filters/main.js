"use strict";

const filterLists = document.querySelector(".filter__lists");
const productsContainer = document.querySelector(".products");
const allBtn = document.querySelector(".all");
const filterInput = document.querySelector(".filter__form input");

let allProducts = [];

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const initializeApp = async () => {
  allProducts = await fetchProducts();
  displayCategory(allProducts);
  displayProducts(allProducts);
};

const displayCategory = (products) => {
  const categories = [...new Set(products.map((product) => product.category))];
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("filter__list");
    li.setAttribute("data-title", category);
    li.textContent = category;
    filterLists.appendChild(li);
    li.addEventListener("click", () => displayFilteredProducts(category));
  });
};

const displayFilteredProductsByTitle = (e) => {
  const value = e.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(value)
  );

  filteredProducts.length === 0
    ? (productsContainer.textContent = "Sorry, no products matched your search")
    : displayProducts(filteredProducts);
};

const displayFilteredProducts = (category) => {
  const filteredProducts = allProducts.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
};

const displayProducts = (products) => {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.id = product.id;
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <p class="product__title">${product.title}</p>
      <span class="product__price">${product.price}</span>
    `;

    productsContainer.appendChild(div);
  });
};

// Initialize App
initializeApp();

// addEventListener
allBtn.addEventListener("click", () => {
  displayProducts(allProducts);
});

filterInput.addEventListener("input", displayFilteredProductsByTitle);
