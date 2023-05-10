import { handleTextStyleChange } from '../../utils/handleTextStyleChange';

export const handleFontVariantChange = (event, newFontVariant, setFontVariant, textName, activeCanvases, canvasApps) => {
    if (newFontVariant) {
        setFontVariant(newFontVariant);
        handleTextStyleChange(textName, { fontVariant: newFontVariant }, activeCanvases, canvasApps);
    } else {
        setFontVariant('normal');
        handleTextStyleChange(textName, { fontVariant: 'normal' }, activeCanvases, canvasApps);
    }
};
