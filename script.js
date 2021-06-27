'use strict';

let factsGridItems = new Array();
const grid = document.querySelector(`main`);

const createFactsGridItem = function (itemType, content) {
    const item = {
        itemType: itemType,
        content: content,
    }

    if(itemType === `fact`) {
        factsGridItems.splice((factsGridItems.length - 1), 0, item);
    }
    else
    factsGridItems.push(item);
}

const createInfoItem = function () {
    createFactsGridItem(`info`,`In this grid you can download and view fn and informative facts about cats`);
}

const createAddItemButton = function () {
    createFactsGridItem(`add`,``)
}

const getCatFact = async () => {
    try {
        const url = `https://catfact.ninja/fact`;
        const res = await fetch(url);
        console.log(res.ok);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
    }

const createCatFactItem = async () => {
    const data = await getCatFact();
    createFactsGridItem(`fact`,data.fact)
    createFactsGrid();
}

const addFactItemToGrid = function (factItem) {

    let factItemHTML = ``;
    if (factItem.itemType === `add`) {
        factItemHTML = `
        <div class="factItem">
            <button class="addFactButton">+</button>
        </div>`;

        grid.innerHTML += factItemHTML;

        document
        .querySelector(`.addFactButton`)
        .addEventListener(`click`, createCatFactItem);
    } else {
        factItemHTML = `
        <div class="factItem">
            <p class="factContent">${factItem.content}</p>
        </div>`;

        grid.innerHTML += factItemHTML;
    }
}

const createFactsGrid = function () {
    grid.innerHTML = ``;

    factsGridItems.forEach(item => {
        addFactItemToGrid(item);
    });
}

createInfoItem();
createAddItemButton();
createFactsGrid();

