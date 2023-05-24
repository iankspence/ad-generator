import { selectSourceColor } from './selectSourceColor';
import { selectPalette } from './selectPalette';
import { selectFinalColor } from './selectFinalColor';

export const generateAutoColor = (autoColorSettings, primaryColor, secondaryColor) => {
    console.log('generating auto color: ', autoColorSettings, primaryColor, secondaryColor)
    const sourceColor = selectSourceColor(autoColorSettings, primaryColor, secondaryColor);
    const palette = selectPalette(autoColorSettings, sourceColor);
    return selectFinalColor(autoColorSettings, palette, sourceColor);
}
