import findTextObject from "./findTextObject";
import {generateAutoColor} from "../../../../utils/color/generateAutoColor";
import {getSelectedTheme} from "../getSelectedTheme";

export const getTextSettings = (
    canvasName,
    textName,
    selectedThemeId,
    canvasApp,
    xRanges,
    yRanges,
    updateRange,
    primaryColor,
    secondaryColor
) => {
    const existingTextObject = findTextObject(
        canvasApp,
        `text-${canvasName}-${textName}`
    );

    const selectedTheme = getSelectedTheme(selectedThemeId);


    console.log('existingTextObject', existingTextObject);
    console.log('selectedTheme', selectedTheme);


    if (existingTextObject && selectedTheme ) {

        console.log('existingTextObject.themeId (getTextSettings): ', existingTextObject.themeId);
        console.log('selectedTheme.id (getTextSettings): ', selectedTheme.id);

        if (existingTextObject.themeId !== selectedTheme.id) {
            // Theme has changed, generate new color

            console.log('theme has changed, generating new color (getTextSettings):')

            if ( !primaryColor || !secondaryColor)
                return existingTextObject;

            const newThemeSettings = Object.values(selectedTheme.settings)
                .flatMap((setting) => Object.values(setting))
                .find((text) => text.canvasName === canvasName && text.textName === textName);

            existingTextObject.style.fill = generateAutoColor(
                newThemeSettings.autoColor,
                primaryColor,
                secondaryColor,
            );
            existingTextObject.themeId = selectedTheme.id;

            console.log('getting xRange and yRange for canvasName: ', canvasName)
            console.log('xRange: ', xRanges[canvasName])
            console.log('yRange: ', yRanges[canvasName])

            const newXRange = newThemeSettings.xRange;
            const newYRange = newThemeSettings.yRange;

            updateRange(canvasName, newXRange, newYRange);

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

        console.log('xRangeDefaults: canvasName: ', textDefaults.xRange, canvasName)
        console.log('yRangeDefaults: canvasName: ', textDefaults.yRange, canvasName)

        return {
            style: { ...textDefaults.style, fill: autoColor },
            xRange: textDefaults.xRange,
            yRange: textDefaults.yRange,
            themeId: selectedTheme.id, // Store the current theme ID
        };
    }

    return null;
};
