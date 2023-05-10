import { handleTextStyleChange } from '../utils/handleTextStyleChange';

export const handleFontFamilyChange = (event, newFontFamily, setFontFamily, textName, activeCanvases, canvasApps) => {
    if (newFontFamily !== null) {
        setFontFamily(newFontFamily);
        handleTextStyleChange(textName, newFontFamily, activeCanvases, canvasApps);
    } else {
        setFontFamily('Arial');
        handleTextStyleChange(textName, 'Arial', activeCanvases, canvasApps);
    }
};
