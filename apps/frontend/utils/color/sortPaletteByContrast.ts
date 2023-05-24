import * as Chroma from 'chroma-js';

/**
 * Sorts a palette of colors by their contrast to a given source color.
 *
 * This function uses the contrast function from the chroma-js library to calculate the contrast between each color in the palette and the source color. It then sorts the colors in ascending order of contrast, so that the colors with the lowest contrast to the source color come first.
 *
 * @param {string[]} palette - An array of colors in hexadecimal format. Each color should be a string of the form '#RRGGBB', where RR, GG, and BB are two-digit hexadecimal numbers representing the red, green, and blue components of the color, respectively.
 * @param {string} sourceColor - A color in hexadecimal format to which the contrast of the palette colors will be compared.
 * @returns {string[]} An array of colors sorted by ascending contrast to the source color. Colors with the same contrast are sorted in their original order.
 * @see {@link https://gka.github.io/chroma.js/ Chroma.js}
 */
export const sortPaletteByContrast = (palette: string[], sourceColor: string) => {
    const paletteCopy = [...palette];
    return paletteCopy.sort((a, b) => {
        const contrastA = Chroma.contrast(sourceColor, a);
        const contrastB = Chroma.contrast(sourceColor, b);
        return contrastA - contrastB;
    });
}
