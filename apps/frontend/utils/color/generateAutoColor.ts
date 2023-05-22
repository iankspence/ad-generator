import {
    generateSplitComplementaryColors
} from "./generateSplitComplementaryColors";
import {
    generateShadeTintPalette
} from "./generateShadeTintPalette";
import * as Chroma from 'chroma-js';

export const generateAutoColor = (autoColorSettings, primaryColor, secondaryColor) => {

    let sourceColor;
    let palette;

    if (autoColorSettings.sourceType === 'primary') {
        sourceColor = primaryColor;
    } else if (autoColorSettings.sourceType === 'secondary') {
        sourceColor = secondaryColor;
    }

    const splitComplementaryColors = generateSplitComplementaryColors(sourceColor);

    if (autoColorSettings.paletteType === 'split-complementary-1') {
        palette = generateShadeTintPalette(splitComplementaryColors[0], 8);
    } else if (autoColorSettings.paletteType === 'split-complementary-2') {
        palette = generateShadeTintPalette(splitComplementaryColors[1], 8);
    } else if (autoColorSettings.paletteType === 'adjacent') {
        palette = generateShadeTintPalette(sourceColor, 8);
    }

    const sortPalette = (palette, sourceColor) => {
        return palette.sort((a, b) => {
            const contrastA = Chroma.contrast(sourceColor, a);
            const contrastB = Chroma.contrast(sourceColor, b);
            return contrastA - contrastB;
        });
    }

    const sortedPalette = sortPalette(palette, sourceColor);

    if (autoColorSettings.minMaxType === 'min') {
        return sortedPalette[autoColorSettings.minMaxDistance];
    }
    else if (autoColorSettings.minMaxType === 'max') {
        return sortedPalette[sortedPalette.length - autoColorSettings.minMaxDistance];
    }

    return sortedPalette[0];
}
