"use strict";

const grid = document.querySelector(`main`);

const createInfoItem = function () {
  const factItemHTML = `
        <div class="factItem">
            <p class="factContent">'In this grid you can download and view informative facts about cats'</p>
        </div>`;

  grid.innerHTML += factItemHTML;
};

const createAddItemButton = function () {
  const factItemHTML = `
        <div class="factItem addFactItem">
            <button class="addFactButton">Add new cat fact</button>
        </div>`;

  grid.innerHTML += factItemHTML;

  document
    .querySelector(`.addFactButton`)
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

const removeCatFactItemByID = async (index) => {
  factsGridItems.splice(index, 1);
  createFactsGridStartItems();
};

const createFactsGridItem = function (content) {
  const factParagraph = document.createElement(`p`);
  factParagraph.classList.add(`factContent`);
  factParagraph.innerText = content;

  const factRemoveButton = document.createElement(`button`);
  factRemoveButton.classList.add(`removeFactButton`);
  factRemoveButton.innerText = `Remove`;

  const factDiv = document.createElement(`div`);
  factDiv.classList.add(`factItem`);
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
        if (removeButton.classList.contains(`removeFactButton`)) {
          removeCatFactItemByID(
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
