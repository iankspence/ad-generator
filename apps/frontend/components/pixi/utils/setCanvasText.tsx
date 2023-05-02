import * as PIXI from 'pixi.js';
import findTextObject from './findTextObject';

const setCanvasText = (canvasName, canvasApps, textName, textArray, position, reviews, reviewPosition, style, size, x, y) => {

    if (!canvasName || !textArray || !position) return;
    const objectName = `${canvasName}-${textName}`;
    const canvasApp = canvasApps[canvasName];
    let text = '';

    switch (objectName) {
        case 'hook-main':
            if (textArray && position > 0 && textArray[position - 1]) {
                text = textArray[position - 1].hookText;
            }
            break;
        case 'hook-author':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].author;
            }
            break;
        case 'hook-date':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].reviewDate;
            }
            break;
        case 'hook-source':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].source;
            }
            break;
        case 'claim-main':
            if (textArray && position > 0 && textArray[position - 1]) {
                text = textArray[position - 1].claimText;
            }
            break;
        case 'review-main':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].reviewText;
            }
            break;
        case 'review-author':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].author;
            }
            break;
        case 'review-date':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].reviewDate;
            }
            break;
        case 'review-source':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                text = reviews[reviewPosition - 1].source;
            }
            break;
        case 'close-main':
            if (textArray && position > 0 && textArray[position - 1]) {
                text = textArray[position - 1].closeText;
            }
            break;
        default:
            break;
    }


    if (!text || !canvasApp || !canvasApp.stage ) return;
    let textObject = findTextObject(canvasApp, objectName);

    if (!textObject) {
        textObject = new PIXI.Text(text, style);
        textObject.name = objectName;
        textObject.x = x;
        textObject.y = y;
        textObject.zIndex = 3;
        textObject.resolution = 1080 / size;
        canvasApp.stage.addChild(textObject);

    } else {
        textObject.text = textObject;
        textObject.style = style;
    }
    canvasApp.render();
};

export default setCanvasText;
