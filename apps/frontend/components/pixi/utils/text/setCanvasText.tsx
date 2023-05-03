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
    style,
    size,
    x,
    y,
    xRange,
    yRange
) => {
    if (!canvasName || !textArray || !position) return;
    const canvasApp = canvasApps[canvasName];
    let mainText = '';
    let authorText = '';

    console.log('setting canvas text: ', canvasName);

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

    if (!mainText || !canvasApp || !canvasApp.stage) return;

    let mainTextObject = findTextObject(canvasApp, `${canvasName}-main`);

    if (!mainTextObject) {
        mainTextObject = new PIXI.Text(mainText, style);
        mainTextObject.name = `${canvasName}-main`;
        mainTextObject.zIndex = 3;
        mainTextObject.resolution = 1080 / size;
        canvasApp.stage.addChild(mainTextObject);
    } else {
        mainTextObject.text = mainText;
        mainTextObject.style = style;
    }

    const { updatedStyle, updatedPosition } = getUpdatedTextStyle(style,  mainText, size, 'main', xRange, yRange);
    mainTextObject.style = updatedStyle;
    mainTextObject.x = updatedPosition.x;
    mainTextObject.y = updatedPosition.y;

    if (authorText) {
        let authorTextObject = findTextObject(canvasApp, `${canvasName}-author`);
        const mainTextObject = findTextObject(canvasApp, `${canvasName}-main`);

        if (!authorTextObject) {
            authorTextObject = new PIXI.Text(authorText, style);
            authorTextObject.name = `${canvasName}-author`;
            authorTextObject.zIndex = 3;
            authorTextObject.resolution = 1080 / size;
            canvasApp.stage.addChild(authorTextObject);
        } else {
            authorTextObject.text = authorText;
            authorTextObject.style = style;
        }

        const { updatedStyle, updatedPosition } = getUpdatedTextStyle(style, authorText, size, 'author', xRange, yRange, mainTextObject);
        authorTextObject.style = updatedStyle;
        authorTextObject.x = updatedPosition.x;
        authorTextObject.y = updatedPosition.y;
    }
};

export default setCanvasText;
