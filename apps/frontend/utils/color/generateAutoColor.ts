import { selectSourceColor } from './selectSourceColor';
import { selectPalette } from './selectPalette';
import { selectFinalColor } from './selectFinalColor';

export const generateAutoColor = (autoColorSettings, primaryColor, secondaryColor) => {
    const grayscaleColor = '#808080'
    const sourceColor = selectSourceColor(autoColorSettings, primaryColor, secondaryColor, grayscaleColor);
    const palette = selectPalette(autoColorSettings, sourceColor);
    return selectFinalColor(autoColorSettings, palette, sourceColor);
}
