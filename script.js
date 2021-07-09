"use strict";

let factsGridItems = new Array();
const grid = document.querySelector(`main`);

const createFactsGridItem = function (itemType, content) {
  const item = {
    itemType: itemType,
    content: content,
  };

  if (itemType === `fact`) {
    factsGridItems.splice(factsGridItems.length - 1, 0, item);
  } else factsGridItems.push(item);
};

const createInfoItem = function () {
  createFactsGridItem(
    `info`,
    `In this grid you can download and view informative facts about cats`
  );
};

const createAddItemButton = function () {
  createFactsGridItem(`add`, ``);
};

const getCatFact = async () => {
  try {
    const url = `https://catfact.ninja/fact`;
    const res = await fetch(url);
    console.log(res.ok);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createCatFactItem = async () => {
  const data = await getCatFact();
  createFactsGridItem(`fact`, data.fact);
  createFactsGrid();
};

const removeCatFactItem = async (index) => {
  factsGridItems.splice(index, 1);
  createFactsGrid();
};

const addFactItemToGrid = function (index, factItem) {
  let factItemHTML = ``;
  if (factItem.itemType === `add`) {
    factItemHTML = `
        <div class="factItem" gridItemId="${index}">
            <button class="addFactButton">Add new cat fact</button>
        </div>`;

    grid.innerHTML += factItemHTML;

    document
      .querySelector(`.addFactButton`)
      .addEventListener(`click`, createCatFactItem);
  } else if (factItem.itemType === `fact`) {
    factItemHTML = `
        <div class="factItem" gridItemId="${index}">
            <p class="factContent">${factItem.content}</p>
            <button class="removeFactButton">Remove</button>
        </div>`;

    grid.innerHTML += factItemHTML;
  } else {
    factItemHTML = `
        <div class="factItem" gridItemId="${index}">
            <p class="factContent">${factItem.content}</p>
        </div>`;

    grid.innerHTML += factItemHTML;
  }
};

const createFactsGrid = function () {
  grid.innerHTML = ``;

  for (let i = 0; factsGridItems.length > i; i++) {
    addFactItemToGrid(i, factsGridItems[i]);
  }
};

createInfoItem();
createAddItemButton();
createFactsGrid();

grid.addEventListener(
  `click`,
  (event) => {
    let removeButton = event.target;
    const selector = `button`;
    while (removeButton != null) {
      if (removeButton.localName == selector) {
        if (removeButton.classList.contains(`removeFactButton`)) {
          removeCatFactItem(
            removeButton.parentElement.getAttribute("griditemid")
          );
        }
        return;
      }
      removeButton = removeButton.parentElement;
    }
  },
  true
);
