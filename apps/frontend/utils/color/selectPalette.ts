import { generateShadeTintPalette } from "./generateShadeTintPalette";
import { generateSplitComplementaryColors } from "./generateSplitComplementaryColors";
import chroma from 'chroma-js';

export const selectPalette = (autoColorSettings, sourceColor) => {
    if (typeof autoColorSettings !== 'object' || autoColorSettings === null) {
        throw new Error('Expected autoColorSettings to be an object');
    }

    if (typeof autoColorSettings.paletteType !== 'string' || autoColorSettings.paletteType === '') {
        throw new Error('Expected autoColorSettings.paletteType to be a non-empty string');
    }

    console.log('autoColorSettings.paletteType', autoColorSettings.paletteType);
    console.log('sourceColor', sourceColor);
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
