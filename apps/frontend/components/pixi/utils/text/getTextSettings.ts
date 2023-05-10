import findTextObject from "./findTextObject";

export const getTextSettings = (canvasName, textName, selectedTheme, canvasApp, xRanges, yRanges) => {
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

    const textDefaults = Object.values(selectedTheme.settings)
        .flatMap(setting => Object.values(setting))
        .find(text => text.canvasName === canvasName && text.textName === textName);
    return textDefaults ? { style: textDefaults.style, xRange: textDefaults.xRange, yRange: textDefaults.yRange  } : null;
};
