import { generateShadeTintPalette } from './generateShadeTintPalette';
import {generateSplitComplementaryColors} from "./generateSplitComplementaryColors";

export const generateColorPalettes = (inputColor) => {

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
