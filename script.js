"use strict";

const grid = document.querySelector(`main`);
const factItemClass = `factItem`;
const addFactItemClass = `addFactItem`;
const removeFactButtonClass = `removeFactButton`;
const addFactButtonClass = `addFactButton`;
const factContentClass = `factContent`;

const createInfoItem = function () {
  const factParagraph = document.createElement(`p`);
  factParagraph.classList.add(factContentClass);
  factParagraph.innerText = `In this grid you can download and view informative facts about cats`;

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(factItemClass);
  factDiv.appendChild(factParagraph);

  grid.innerHTML += factItemHTML;
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

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(factItemClass);
  factDiv.appendChild(factParagraph);
  factDiv.appendChild(factRemoveButton);

  return factDiv;
};

const addCatFactItemToGrid = async () => {
  const factItem = await createCatFactItem();

  grid.insertBefore(factItem, grid.children[grid.children.length - 1]);
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
