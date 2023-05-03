import * as PIXI from 'pixi.js';
import findTextObject from './findTextObject';
import { abbreviateAuthor } from "./abbreviateAuthor";
import { addQuotesToText } from "./addQuotesToText";
import { getUpdatedTextStyle } from "./getUpdatedTextStyle";

const setCanvasText = (
    canvasName,
    canvasApps,
    textArray,
    position,
    reviews,
    reviewPosition,
    mainStyle,
    authorStyle,
    size,
    xRange,
    yRange
) => {
    if (!canvasName || !textArray || !position) return;
    const canvasApp = canvasApps[canvasName];
    let mainText = '';
    let authorText = '';

    switch (canvasName) {
        case 'hook':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = addQuotesToText(textArray[position - 1].hookText);
                authorText = abbreviateAuthor(reviews[reviewPosition - 1].author);
            }
            break;
        case 'claim':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = textArray[position - 1].claimText;
            }
            break;
        case 'review':
            if (reviews && reviewPosition > 0 && reviews[reviewPosition - 1]) {
                mainText = addQuotesToText(reviews[reviewPosition - 1].reviewText);
                authorText = abbreviateAuthor(reviews[reviewPosition - 1].author);
            }
            break;
        case 'close':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = textArray[position - 1].closeText;
            }
            break;
        default:
            break;
    }

    if (!canvasApp || !canvasApp.stage) return;

    let mainTextObject = findTextObject(canvasApp, `${canvasName}-main`);
    if (!mainTextObject) {
        mainTextObject = new PIXI.Text(mainText, mainStyle);
        mainTextObject.name = `${canvasName}-main`;
        mainTextObject.zIndex = 3;
        mainTextObject.resolution = 1080 / size;
        canvasApp.stage.addChild(mainTextObject);
    } else {
        mainTextObject.text = mainText;
        mainTextObject.style = mainStyle;
    }

    let authorTextObject;
    if (authorText) {
        authorTextObject = findTextObject(canvasApp, `${canvasName}-author`);
        if (!authorTextObject) {
            authorTextObject = new PIXI.Text(authorText, authorStyle);
            authorTextObject.name = `${canvasName}-author`;
            authorTextObject.zIndex = 3;
            authorTextObject.resolution = 1080 / size;
            canvasApp.stage.addChild(authorTextObject);
        } else {
            authorTextObject.text = authorText;
            authorTextObject.style = authorStyle;
        }
    }

    console.log('updating style for canvas: ', canvasName)

    const { main: { updatedStyle: mainUpdatedStyle, updatedPosition: mainUpdatedPosition }, author: { updatedStyle: authorUpdatedStyle, updatedPosition: authorUpdatedPosition } } = getUpdatedTextStyle(mainText, authorText, mainStyle, authorStyle, size, xRange, yRange);

    mainTextObject.style = mainUpdatedStyle;
    mainTextObject.x = mainUpdatedPosition.x;
    mainTextObject.y = mainUpdatedPosition.y;

    if (authorTextObject) {
        authorTextObject.style = authorUpdatedStyle;
        authorTextObject.x = authorUpdatedPosition.x;
        authorTextObject.y = authorUpdatedPosition.y;
    }
};

export default setCanvasText;
