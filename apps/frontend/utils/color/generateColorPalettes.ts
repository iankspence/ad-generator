import { generateShadeTintPalette } from './generateShadeTintPalette';
import {generateSplitComplementaryColors} from "./generateSplitComplementaryColors";
import chroma from 'chroma-js';

/**
 * Generates an array of three color palettes based on a given input color.
 *
 * The first palette is a shade-tint palette of the input color.
 * The other two palettes are shade-tint palettes of the two split complementary colors to the input color.
 * Each palette contains 8 colors.
 *
 * The function will throw an error if an invalid color is provided.
 *
 * @param {string} inputColor - The base color to generate the palettes from. This should be a valid color string.
 * @returns {Array<Array<string>>} An array of three color palettes. Each palette is an array of eight color strings.
 *
 * @throws {Error} Will throw an error if the color is not valid.
 */
export const generateColorPalettes = (inputColor: string) => {
    if (!chroma.valid(inputColor)) {
        throw new Error('Invalid color provided');
    }

    const inputShades = generateShadeTintPalette(inputColor, 8);

    const [inputSplit1, inputSplit2] = generateSplitComplementaryColors(inputColor);
    const inputSplit1Shades = generateShadeTintPalette(inputSplit1, 8);
    const inputSplit2Shades = generateShadeTintPalette(inputSplit2, 8);

    return [
        inputSplit1Shades,
        inputSplit2Shades,
        inputShades,
    ];
};
