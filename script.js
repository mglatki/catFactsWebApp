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
