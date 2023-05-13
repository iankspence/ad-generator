import findTextObject from "./findTextObject";
import {generateAutoColor} from "../../../../utils/generateAutoColor";

export const getTextSettings = (
    canvasName,
    textName,
    selectedTheme,
    canvasApp,
    xRanges,
    yRanges,
    primaryColor,
    secondaryColor
) => {
    const existingTextObject = findTextObject(
        canvasApp,
        `${canvasName}-${textName}`
    );

    if (existingTextObject) {

        if (existingTextObject.themeId !== selectedTheme.id) {
            // Theme has changed, generate new color

            if ( !primaryColor || !secondaryColor)
                return existingTextObject;

            const newThemeSettings = Object.values(selectedTheme.settings)
                .flatMap((setting) => Object.values(setting))
                .find((text) => text.canvasName === canvasName && text.textName === textName);

            existingTextObject.style.fill = generateAutoColor(
                newThemeSettings.autoColor,
                primaryColor,
                secondaryColor
            );
            existingTextObject.themeId = selectedTheme.id;

            return existingTextObject;
        }

        // Theme has not changed, use existing style
        return {
            style: { ...existingTextObject.style },
            x: existingTextObject.x,
            y: existingTextObject.y,
            xRange: xRanges[canvasName],
            yRange: yRanges[canvasName],
            themeId: existingTextObject.themeId,
        };
    }

    // The first time the text is being added to the canvas, use autoColor
    const textDefaults = Object.values(selectedTheme.settings)
        .flatMap((setting) => Object.values(setting))
        .find((text) => text.canvasName === canvasName && text.textName === textName);

    if (textDefaults) {
        if (!textDefaults.autoColor || !primaryColor || !secondaryColor)
            return textDefaults;

        const autoColor = generateAutoColor(
            textDefaults.autoColor,
            primaryColor,
            secondaryColor
        );

        return {
            style: { ...textDefaults.style, fill: autoColor },
            xRange: textDefaults.xRange,
            yRange: textDefaults.yRange,
            themeId: selectedTheme.id, // Store the current theme ID
        };
    }

    return null;
};
