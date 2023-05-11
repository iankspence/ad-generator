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
    filteredReviews,
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
                if (textArray[position - 1]?.hookTextEdited) {
                    mainText = addQuotesToText(textArray[position - 1]?.hookTextEdited);
                } else {
                    mainText = addQuotesToText(textArray[position - 1]?.hookText);
                }
                authorText = abbreviateAuthor(filteredReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'claim':
            if (textArray && position > 0 && textArray[position - 1]) {
                if (textArray[position - 1]?.claimTextEdited) {
                    mainText = textArray[position - 1]?.claimTextEdited;
                } else {
                    mainText = textArray[position - 1]?.claimText;
                }
            }
            break;
        case 'review':
            if (filteredReviews && reviewPosition > 0 && filteredReviews[reviewPosition - 1]) {
                if (filteredReviews[reviewPosition - 1]?.reviewTextEdited) {
                    mainText = addQuotesToText(filteredReviews[reviewPosition - 1]?.reviewTextEdited);
                } else {
                    mainText = addQuotesToText(filteredReviews[reviewPosition - 1]?.reviewText);
                }
                authorText = abbreviateAuthor(filteredReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'close':
            if (textArray && position > 0 && textArray[position - 1]) {
                if (textArray[position - 1]?.closeTextEdited) {
                    mainText = textArray[position - 1]?.closeTextEdited;
                } else {
                    mainText = textArray[position - 1]?.closeText;
                }
            }
            break;
        default:
            break;
    }


    if (!app || !app.stage || !mainText ) return;

    let mainTextObject = findTextObject(app, `${canvasName}-main`);

    if (!mainTextObject) {
        mainTextObject = new PIXI.HTMLText(mainText, mainStyleSettings.style);
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
            authorTextObject = new PIXI.HTMLText(authorText, authorStyleSettings.style);
            authorTextObject.name = `${canvasName}-author`;
            authorTextObject.zIndex = 3;
            authorTextObject.resolution = 1080 / size;
            app.stage.addChild(authorTextObject);
        } else {
            authorTextObject.text = authorText;
            authorTextObject.style = authorStyleSettings.style;
        }
    }

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
