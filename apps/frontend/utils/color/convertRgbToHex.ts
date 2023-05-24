/**
 * Converts an RGB color to HEX format.
 * @param {number[]} rgb - An array of three numbers representing the red, green, and blue components of a color.
 * @returns {string} A color in HEX format.
 */
export const convertRgbToHex = (rgb) => {
    return "#" + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}
