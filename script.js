"use strict";

const grid = document.querySelector(`main`);
const catFactsMode = document.getElementById(`catFactModeSwitch`);
const factItemClass = `factItem`;
const addFactItemClass = `addFactItem`;
const removeFactButtonClass = `removeFactButton`;
const addFactButtonClass = `addFactButton`;
const factContentClass = `factContent`;
const hideRemoveButtonClass = `hideRemoveButton`;
const singleFactSliderModeText = `Single fact`;
const stackFactsSliderModeText = `Stack facts`;

const createInfoItem = function () {
  const factParagraph = document.createElement(`p`);
  factParagraph.classList.add(factContentClass);
  factParagraph.innerText = `In this grid you can download and view informative facts about cats`;

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(factItemClass);
  factDiv.appendChild(factParagraph);

  grid.appendChild(factDiv);
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
  return createFactsGridItem(data.fact);
};

const removeCatFactItem = async (item) => {
  grid.removeChild(item);
};

const createFactsGridItem = function (content) {
  const factParagraph = document.createElement(`p`);
  factParagraph.classList.add(factContentClass);
  factParagraph.innerText = content;

  const factRemoveButton = document.createElement(`button`);
  factRemoveButton.classList.add(removeFactButtonClass);
  factRemoveButton.innerText = `Remove`;

  if (catFactsMode.checked) {
    factRemoveButton.classList.add(hideRemoveButtonClass);
  }

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(factItemClass);
  factDiv.appendChild(factParagraph);
  factDiv.appendChild(factRemoveButton);

  return factDiv;
};

const addAnotherCatFactItemToGrid = async (factItem) => {
  grid.insertBefore(factItem, grid.lastChild);
};

const replaceCatFactItemInGrid = async (factItem) => {
  const nodes = [grid.firstChild, factItem, grid.lastChild];
  grid.innerText = ``;
  grid.append(...nodes);
};

const addCatFactItemToGrid = async () => {
  const factItem = await createCatFactItem();

  if (catFactsMode.checked) {
    replaceCatFactItemInGrid(factItem);
  } else {
    addAnotherCatFactItemToGrid(factItem);
  }
};

const createAddItemButton = function () {
  const factRemoveButton = document.createElement(`button`);
  factRemoveButton.classList.add(addFactButtonClass);
  factRemoveButton.innerText = `Add new cat fact`;

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(factItemClass);
  factDiv.classList.add(addFactItemClass);
  factDiv.appendChild(factRemoveButton);

  grid.appendChild(factDiv);

  document
    .querySelector(`.${addFactButtonClass}`)
    .addEventListener(`click`, addCatFactItemToGrid);
};

const createFactsGridStartItems = function () {
  createInfoItem();
  createAddItemButton();
};

createFactsGridStartItems();

grid.addEventListener(
  `click`,
  (event) => {
    let removeButton = event.target;
    const selector = `button`;
    while (removeButton != null) {
      if (removeButton.localName == selector) {
        if (removeButton.classList.contains(removeFactButtonClass)) {
          removeCatFactItem(removeButton.parentElement);
        }
        return;
      }
      removeButton = removeButton.parentElement;
    }
  },
  true
);

const toggleCatFactsMode = () => {
  let sliderModeText = document.getElementById(`sliderModeText`);

  if (catFactsMode.checked) {
    sliderModeText.innerText = singleFactSliderModeText;
    if (grid.childElementCount > 2) {
      const factItem = grid.childNodes[grid.childElementCount - 2];
      replaceCatFactItemInGrid(factItem);
    }
    hideRemoveButtons();
  } else {
    sliderModeText.innerText = stackFactsSliderModeText;
    showRemoveButtons();
  }
};

const hideRemoveButtons = () => {
  if (grid.childElementCount > 2) {
    for (let i = 1; i < grid.childElementCount - 1; i++) {
      const lastChild = grid.children[i].lastChild;

      if (
        lastChild.localName === `button` &&
        lastChild.classList.contains(removeFactButtonClass) &&
        !lastChild.classList.contains(hideRemoveButtonClass)
      ) {
        lastChild.classList.add(hideRemoveButtonClass);
      }
    }
  }
};

const showRemoveButtons = () => {
  if (grid.childElementCount > 2) {
    for (let i = 1; i < grid.childElementCount - 1; i++) {
      const lastChild = grid.children[i].lastChild;

      if (
        lastChild.localName === `button` &&
        lastChild.classList.contains(removeFactButtonClass) &&
        lastChild.classList.contains(hideRemoveButtonClass)
      ) {
        lastChild.classList.remove(hideRemoveButtonClass);
      }
    }
  }
};

catFactsMode.checked = false;
sliderModeText.innerText = stackFactsSliderModeText;
