"use strict";

const main = () => {
  const toggleBtn = document.querySelector(".btn-toggle");
  const closeBtn = document.querySelector(".sidebar__btn-close");
  const sidebar = document.querySelector(".sidebar");

  const toggleSidebar = () => {
    sidebar.classList.toggle("visible");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("visible"))
      toggleSidebar();
  };

  toggleBtn.addEventListener("click", toggleSidebar);
  closeBtn.addEventListener("click", toggleSidebar);
  document.addEventListener("keydown", handleKeyDown);
};

main();
