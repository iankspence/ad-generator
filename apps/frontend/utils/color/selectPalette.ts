import { generateShadeTintPalette } from "./generateShadeTintPalette";
import { generateSplitComplementaryColors } from "./generateSplitComplementaryColors";
import chroma from 'chroma-js';

/**
 * Selects the palette based on the provided settings and source color.
 * The function uses the 'paletteType' property from the autoColorSettings parameter to determine which type of palette to return.
 *
 * The function will throw an error if an invalid color is provided, if the 'paletteType' property is not a string or if the 'paletteType' property is an empty string.
 *
 * @param {object} autoColorSettings - The settings object to determine the palette. This object should have a 'paletteType' property which is either 'split-complementary-1', 'split-complementary-2' or 'adjacent'.
 * @param {string} sourceColor - The source color. This should be a valid color string.
 * @returns {string[]} The selected palette based on the 'paletteType' property from the autoColorSetting.
 */
export const selectPalette = (autoColorSettings, sourceColor) => {
    if (typeof autoColorSettings !== 'object' || autoColorSettings === null) {
        throw new Error('Expected autoColorSettings to be an object');
    }

    if (typeof autoColorSettings.paletteType !== 'string' || autoColorSettings.paletteType === '') {
        throw new Error('Expected autoColorSettings.paletteType to be a non-empty string');
    }

    if (autoColorSettings.paletteType !== 'split-complementary-1' && autoColorSettings.paletteType !== 'split-complementary-2' && autoColorSettings.paletteType !== 'adjacent') {
        throw new Error('Expected autoColorSettings.paletteType to be either "split-complementary-1", "split-complementary-2", or "adjacent"');
    }

    if (!chroma.valid(sourceColor)) {
        throw new Error('Invalid color provided');
    }

    const splitComplementaryColors = generateSplitComplementaryColors(sourceColor);

    if (autoColorSettings.paletteType === 'split-complementary-1') {
        return generateShadeTintPalette(splitComplementaryColors[0], 8);
    } else if (autoColorSettings.paletteType === 'split-complementary-2') {
        return generateShadeTintPalette(splitComplementaryColors[1], 8);
    } else if (autoColorSettings.paletteType === 'adjacent') {
        return generateShadeTintPalette(sourceColor, 8);
    }
};
