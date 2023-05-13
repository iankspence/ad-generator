import findTextObject from "./findTextObject";
import {generateAutoColor} from "../../../../utils/generateAutoColor";
//
export const getTextSettings = (canvasName, textName, selectedTheme, canvasApp, xRanges, yRanges, primaryColor, secondaryColor) => {
    const existingTextObject = findTextObject(canvasApp, `${canvasName}-${textName}`);
    if (existingTextObject) {
        return {
            style: existingTextObject.style,
            x: existingTextObject.x,
            y: existingTextObject.y,
            xRange: xRanges[canvasName],
            yRange: yRanges[canvasName],
        };
    }

    // the first time the text is being added to the canvas, use autoColor
    const textDefaults = Object.values(selectedTheme.settings)
        .flatMap(setting => Object.values(setting))
        .find(text => text.canvasName === canvasName && text.textName === textName);
    if (textDefaults) {

        console.log('canvasName, textName', canvasName, textName);
        console.log('textDefaults.autoColor', textDefaults.autoColor);
        console.log('primaryColor', primaryColor);
        console.log('secondaryColor', secondaryColor);

        if (!textDefaults.autoColor || !primaryColor || !secondaryColor) return textDefaults;

        const autoColor = generateAutoColor(textDefaults.autoColor, primaryColor, secondaryColor);
        console.log('autoColor', autoColor);
        return {
            style: {...textDefaults.style, fill: autoColor},
            xRange: textDefaults.xRange,
            yRange: textDefaults.yRange,
        };
    }
    return null;
};

