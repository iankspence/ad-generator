import findTextObject from "./findTextObject";
import {generateAutoColor} from "../../../../utils/color/generateAutoColor";
import {getSelectedTheme} from "../getSelectedTheme";
import { ThemeSettings } from '../../../../../../libs/type/src/lib/interface/themes/theme-settings';

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

    if (existingTextObject && selectedTheme ) {

        if (existingTextObject.themeId !== selectedTheme.id) {
            // Theme has changed, generate new color

            if ( !primaryColor || !secondaryColor)
                return existingTextObject;

            const newThemeSettings = Object.values(selectedTheme.settings)
                .flatMap((setting: ThemeSettings) => Object.values(setting))
                .find((text) => text.canvasName === canvasName && text.textName === textName);

            existingTextObject.style.fill = generateAutoColor(
                newThemeSettings.autoColor,
                primaryColor,
                secondaryColor,
            );
            existingTextObject.themeId = selectedTheme.id;

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
        .flatMap((setting: ThemeSettings) => Object.values(setting))
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
