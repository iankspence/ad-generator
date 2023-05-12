import { handleTextStyleChange } from '../../utils/handleTextStyleChange';

export const handleFontWeightChange = (event, newFontWeight, setFontWeight, textName, activeCanvases, canvasApps) => {

    if (newFontWeight) {
        setFontWeight(newFontWeight);
        handleTextStyleChange(textName, { fontWeight: newFontWeight }, activeCanvases, canvasApps);
    } else {
        setFontWeight('normal');
        handleTextStyleChange(textName, { fontWeight: 'normal' }, activeCanvases, canvasApps);
    }
};
