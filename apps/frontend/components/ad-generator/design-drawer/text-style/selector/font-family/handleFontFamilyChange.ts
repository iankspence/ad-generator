import { handleTextStyleChange } from '../../utils/handleTextStyleChange';

export const handleFontFamilyChange = (event, newFontFamily, setFontFamily, textName, activeCanvases, canvasApps) => {
    console.log('handleFontFamilyChange', newFontFamily);

    if (newFontFamily) {
        setFontFamily(newFontFamily);
        handleTextStyleChange(textName, { fontFamily: newFontFamily }, activeCanvases, canvasApps);

    } else {
        setFontFamily('Arial');
        handleTextStyleChange(textName, { fontFamily: 'Arial' }, activeCanvases, canvasApps);
    }
};
