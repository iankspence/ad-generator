import * as PIXI from 'pixi.js';
import findTextObject from './find-text-object';

const setCanvasMainText = (canvasName, canvasApps, textArray, position, style, size, x, y) => {
    if (!canvasName) return;
    const objectName = `${canvasName}-main`;
    const canvasApp = canvasApps[canvasName];

    if (!canvasApp || !canvasApp.stage) return;
    let mainText = '';
    switch (canvasName) {
        case 'hook':
            if (textArray.length > 0) {
                mainText = textArray[position - 1].hookText;
            }
            break;
        case 'claim':
            if (textArray.length > 0) {
                mainText = textArray[position - 1].claimText;
            }
            break;
        case 'review':
            if (textArray.length > 0) {
                mainText = textArray[position - 1].reviewText;
            }
            break;
        case 'close':
            if (textArray.length > 0) {
                mainText = textArray[position - 1].closeText;
            }
            break;
        default:
            break;
    }

    if (!mainText) return;
    let mainTextObject = findTextObject(canvasApp, objectName);
    if (!mainTextObject) {
        mainTextObject = new PIXI.Text(mainText, style);
        mainTextObject.name = objectName;
        canvasApp.stage.addChild(mainTextObject);
    } else {
        mainTextObject.text = mainText;
        mainTextObject.style = style;
    }

    mainTextObject.x = x;
    mainTextObject.y = y;

    // mainTextObject.x = canvasApp.view.width / 2 - mainTextObject.width / 2;
    // mainTextObject.y = canvasApp.view.height / 1.1 - mainTextObject.height / 2;
    mainTextObject.zIndex = 3;
    mainTextObject.resolution = 1080 / size;

    canvasApp.render();
};

export default setCanvasMainText;
