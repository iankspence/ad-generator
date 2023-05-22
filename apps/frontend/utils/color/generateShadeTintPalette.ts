import chroma from 'chroma-js';

/**
 * Generates a palette of colors based on a given base color, creating both darker and brighter variations.
 * The palette will have the number of colors specified by the count parameter.
 *
 * The function will throw an error if an invalid color is provided or if the count is negative.
 * If the count is zero, an empty array will be returned.
 *
 * @param {string} color - The base color to generate the palette from. This should be a valid hex color string (ex. "#123123").
 * @param {number} count - The number of colors to generate in the palette. Must be a non-negative integer.
 * @returns {string[]} An array of color strings representing the palette. The first color will be darker than the base color, and the last color will be brighter.
 * If the count is zero, an empty array is returned.
 *
 * @throws {Error} Will throw an error if the color is not valid or if the count is negative.
 */
export const generateShadeTintPalette = (color: string, count: number): string[] => {
    if (count < 0) {
        throw new Error('Count cannot be negative');
    }

    if (count === 0) {
        return [];
    }

    if (!chroma.valid(color)) {
        throw new Error('Invalid color provided');
    }

    const scale = chroma.scale([chroma(color).darken(2.5), chroma(color).brighten(2.5)]).mode('lch');
    return scale.colors(count);
};
