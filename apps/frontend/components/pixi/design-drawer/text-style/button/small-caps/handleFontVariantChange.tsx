import { handleTextStyleChange } from '../../utils/handleTextStyleChange';

export const handleFontVariantChange = (event, newFontVariant, setFontVariant, textName, activeCanvases, canvasApps) => {
    if (newFontVariant) {
        setFontVariant(newFontVariant);
        handleTextStyleChange(textName, { fontStyle: newFontVariant }, activeCanvases, canvasApps);
    } else {
        setFontVariant('normal');
        handleTextStyleChange(textName, { fontStyle: 'normal' }, activeCanvases, canvasApps);
    }
};
