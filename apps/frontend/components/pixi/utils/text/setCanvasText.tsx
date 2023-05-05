import * as PIXI from 'pixi.js';
import findTextObject from './findTextObject';
import { abbreviateAuthor } from "./abbreviateAuthor";
import { addQuotesToText } from "./addQuotesToText";
import { updateTextStyleAndPosition } from "./updateTextStyleAndPosition";

const setCanvasText = (
    canvasName,
    appRef,
    textArray,
    position,
    activeReviews,
    reviewPosition,
    mainStyleSettings,
    authorStyleSettings,
    size,
    xRange,
    yRange,
    lineHeightMultipliers,
) => {
    if (!canvasName || !textArray || !position || !appRef?.current ) return;

    const app = appRef.current;

    let mainText = '';
    let authorText = '';

    switch (canvasName) {
        case 'hook':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = addQuotesToText(textArray[position - 1]?.hookText);
                authorText = abbreviateAuthor(activeReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'claim':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = textArray[position - 1]?.claimText;
            }
            break;
        case 'review':
            if (activeReviews && reviewPosition > 0 && activeReviews[reviewPosition - 1]) {
                mainText = addQuotesToText(activeReviews[reviewPosition - 1]?.reviewText);
                authorText = abbreviateAuthor(activeReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'close':
            if (textArray && position > 0 && textArray[position - 1]) {
                mainText = textArray[position - 1]?.closeText;
            }
            break;
        default:
            break;
    }

    if (!app || !app.stage || !mainText ) return;

    console.log('setting text for canvas: ', canvasName, mainText, authorText)

    let mainTextObject = findTextObject(app, `${canvasName}-main`);
    if (!mainTextObject) {
        mainTextObject = new PIXI.Text(mainText, mainStyleSettings.style);
        mainTextObject.name = `${canvasName}-main`;
        mainTextObject.zIndex = 3;
        mainTextObject.resolution = 1080 / size;
        app.stage.addChild(mainTextObject);
    } else {
        mainTextObject.text = mainText;
        mainTextObject.style = mainStyleSettings.style;
    }

    let authorTextObject;
    if (authorText) {
        authorTextObject = findTextObject(app, `${canvasName}-author`);
        if (!authorTextObject) {
            authorTextObject = new PIXI.Text(authorText, authorStyleSettings.style);
            authorTextObject.name = `${canvasName}-author`;
            authorTextObject.zIndex = 3;
            authorTextObject.resolution = 1080 / size;
            app.stage.addChild(authorTextObject);
        } else {
            authorTextObject.text = authorText;
            authorTextObject.style = authorStyleSettings.style;
        }
    }

    console.log('updating style for canvas: ', canvasName)

    const { main: { updatedStyle: mainUpdatedStyle, updatedPosition: mainUpdatedPosition }, author: { updatedStyle: authorUpdatedStyle, updatedPosition: authorUpdatedPosition } } = updateTextStyleAndPosition(mainText, authorText, mainStyleSettings.style, authorStyleSettings?.style, size, xRange, yRange, lineHeightMultipliers[canvasName]);

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
