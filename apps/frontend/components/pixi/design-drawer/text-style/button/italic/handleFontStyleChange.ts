import {handlePaddingChange} from "./handleFontPaddingChange";
import {handleTextStyleChange} from "../../utils/handleTextStyleChange";

export const handleFontStyleChange = (event, newFontStyle, setFontStyle, textName, activeCanvases, canvasApps) => {
    if (newFontStyle) {
        setFontStyle(newFontStyle);
        handleTextStyleChange(textName, { fontStyle: newFontStyle }, activeCanvases, canvasApps) ;
        if (newFontStyle === 'italic') {
            handlePaddingChange(textName, 3, activeCanvases, canvasApps);
        } else {
            handlePaddingChange(textName, 0, activeCanvases, canvasApps);
        }
    } else {
        setFontStyle('normal');
        handleTextStyleChange(textName, { fontStyle: 'normal' }, activeCanvases, canvasApps);
        handlePaddingChange(textName, 0, activeCanvases, canvasApps);
    }
};
