import chroma from 'chroma-js';

/**
 * Generates an array of two colors that are split complementary to the given base color.
 * Split complementary colors are created by taking the hue of the base color and shifting it by 150 and 210 degrees on the color wheel.
 * The returned colors maintain the chroma (colorfulness) and luminance (brightness) of the base color.
 *
 * The function will throw an error if an invalid color is provided.
 *
 * @param {string} color - The base color to generate the split complementary colors from. This should be a valid color string.
 * @returns {[string, string]} An array of two color strings representing the split complementary colors.
 *
 * @throws {Error} Will throw an error if the color is not valid.
 */
export const generateSplitComplementaryColors = (color: string): [string, string] => {
    if (!chroma.valid(color)) {
        throw new Error('Invalid color provided');
    }

    const hclColor = chroma(color).hcl();
    const splitComplementaryHue1 = (hclColor[0] + 150) % 360;
    const splitComplementaryHue2 = (hclColor[0] + 210) % 360;
    return [
        chroma.hcl(splitComplementaryHue1, hclColor[1], hclColor[2]),
        chroma.hcl(splitComplementaryHue2, hclColor[1], hclColor[2]),
    ];
};
