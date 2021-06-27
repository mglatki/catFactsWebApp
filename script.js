'use strict';

let factsGridItems = new Array();

const createFactsGridItem = function (itemType, content) {
    const item = {
        itemType: itemType,
        content: content,
    }

    factsGridItems.push(item);
}

const createInfoItem = function () {
    createFactsGridItem(`info`,`In this grid you can dosnload and view fn and informative facts about cats`);
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
}
