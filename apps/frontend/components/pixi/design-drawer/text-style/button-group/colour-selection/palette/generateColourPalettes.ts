import { generateShadeTintPalette } from './generateShadeTintPalette';
import {generateSplitComplementaryColours} from "./generateSplitComplementaryColours";

export const generateColourPalettes = (inputColour) => {

    const inputShades = generateShadeTintPalette(inputColour, 8);

    const [inputSplit1, inputSplit2] = generateSplitComplementaryColours(inputColour);
    const inputSplit1Shades = generateShadeTintPalette(inputSplit1, 8);
    const inputSplit2Shades = generateShadeTintPalette(inputSplit2, 8);

    return [
        inputSplit1Shades,
        inputSplit2Shades,
        inputShades,
    ];
};
