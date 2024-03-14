"use strict";

const main = () => {
  const sections = document.querySelectorAll(".section");
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modal__content");
  const modalBottom = modal.querySelector(".modal__bottom");
  const btnModalClose = document.querySelector(".fa-x");
  const [chevronLeft, chevronRight] = document.querySelectorAll(".chevrons i");
  const modalSlider = document.querySelector(".modal__slider");

  let imgList = [];
  let clickedImgIndex;

  const closeModal = () => {
    modalSlider.innerHTML = "";
    modalBottom.innerHTML = "";
    modal.classList.remove("open");
  };

  const setImgOpacity = (index) => {
    const imgs = Array.from(modalBottom.querySelectorAll("img"));
    imgs.forEach((img) =>
      img.classList.toggle("opacity", imgs.indexOf(img) === index)
    );
  };

  const displayClickedImg = (index) => {
    if (imgList.length === 0) return;

    displayImgList(modalSlider);
    modalSlider.scrollTo({ left: modalSlider.offsetWidth * index });
    setImgOpacity(index);
    handleDescription();
  };

  const displayImgList = (element) => {
    imgList.forEach((el, index) => {
      const img = document.createElement("img");
      img.classList.add("main__img");
      img.src = el.src;
      img.addEventListener("click", () => {
        clickedImgIndex = index;
        displayClickedImg(index);
      });
      element.appendChild(img);
    });
  };

  const handleDescription = (direction) => {
    clickedImgIndex =
      direction === "next"
        ? (clickedImgIndex + 1) % imgList.length
        : direction === "prev"
        ? (clickedImgIndex - 1 + imgList.length) % imgList.length
        : clickedImgIndex;

    const description =
      modalContent.querySelector(".modal__description") ||
      document.createElement("p");

    description.classList.add("modal__description");
    description.textContent = imgList[clickedImgIndex].alt;

    if (!modalContent.contains(description)) {
      modalContent.insertBefore(description, modalBottom);
    }
  };

  const handleImgScroll = (direction) => {
    const imgWidth = modalSlider.offsetWidth;
    const scrollTarget = direction === "prev" ? -imgWidth : imgWidth;
    const scrollCondition =
      direction === "prev"
        ? modalSlider.scrollLeft !== 0
        : modalSlider.scrollLeft < modalSlider.scrollWidth - imgWidth;

    if (scrollCondition) {
      modalSlider.scrollBy({ left: scrollTarget });
    } else {
      modalSlider.scrollTo({
        left: direction === "prev" ? modalSlider.scrollWidth : 0,
      });
    }

    handleDescription(direction);
    setImgOpacity(clickedImgIndex);
  };

  // const handlePrevImg = () => {
  //   const imgWidth = modalSlider.offsetWidth;
  //   if (modalSlider.scrollLeft !== 0) {
  //     modalSlider.scrollBy({ left: -imgWidth });
  //   } else {
  //     modalSlider.scrollTo({ left: modalSlider.scrollWidth });
  //   }

  //   handleDescription("prev");
  // };

  // const handleNextImg = () => {
  //   const imgWidth = modalSlider.offsetWidth;
  //   if (modalSlider.scrollLeft < modalSlider.scrollWidth - imgWidth) {
  //     modalSlider.scrollBy({ left: imgWidth });
  //   } else {
  //     modalSlider.scrollTo({ left: 0 });
  //   }

  //   handleDescription("next");
  // };

  // event listeners

  sections.forEach((section) =>
    section.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") return;

      const sectionClosest = e.target.closest("section");
      imgList = Array.from(sectionClosest.querySelectorAll("img"));
      clickedImgIndex = imgList.findIndex((img) => img === e.target);

      modal.classList.add("open");
      displayImgList(modalBottom);
      displayClickedImg(clickedImgIndex);
    })
  );

  btnModalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeModal();
  });

  chevronLeft.addEventListener("click", () => {
    handleImgScroll("prev");
  });

  chevronRight.addEventListener("click", () => {
    handleImgScroll("next");
  });
};

main();
