import { sortPaletteByContrast } from './sortPaletteByContrast';

/**
 * Selects a color from a given palette based on contrast with a source color and other settings.
 *
 * This function first sorts the palette colors by their contrast to the source color, and then selects a color from the sorted palette based on the provided settings.
 *
 * @param {Object} autoColorSettings - An object with the properties 'minMaxType' and 'minMaxDistance'.
 *   - minMaxType {string} - Indicates whether to select a color with minimum ('min') or maximum ('max') contrast to the source color.
 *   - minMaxDistance {number} - Indicates how far the selected color should be from the source color in terms of contrast. For 'min', 0 means the source color, 1 means the color with the closest contrast to the source, etc. For 'max', 0 means the color with the maximum contrast to the source, 1 means the color with the second maximum contrast, etc.
 * @param {string[]} palette - An array of colors in hexadecimal format. Each color should be a string of the form '#RRGGBB', where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color, respectively.
 * @param {string} sourceColor - A color in hexadecimal format to which the contrast of the palette colors will be compared.
 * @returns {string|undefined} The selected color in hexadecimal format, or 'undefined' if any of the parameters are not provided.
 * @see {@link https://gka.github.io/chroma.js/ Chroma.js}
 */
export const selectFinalColor = (autoColorSettings, palette, sourceColor) => {
    if (!autoColorSettings || !palette || !sourceColor) {
        return undefined;
    }

    let sortedPalette = sortPaletteByContrast(palette, sourceColor);

    // Exclude sourceColor from the sortedPalette
    sortedPalette = sortedPalette.filter(color => color !== sourceColor);

    if (autoColorSettings.minMaxType === 'min') {
        return autoColorSettings.minMaxDistance === 0 ? sourceColor : sortedPalette[autoColorSettings.minMaxDistance - 1];
    }
    else if (autoColorSettings.minMaxType === 'max') {
        return autoColorSettings.minMaxDistance === 0 ? sortedPalette[sortedPalette.length - 1] : sortedPalette[sortedPalette.length - autoColorSettings.minMaxDistance - 1];
    }

    return sortedPalette[0];
}
