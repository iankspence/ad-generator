import {handlePaddingChange} from "./handleFontPaddingChange";
import {handleTextStyleChange} from "../../utils/handleTextStyleChange";

export const handleFontStyleChange = (event, newFontStyle, setFontStyle, textName, activeCanvases, canvasApps) => {
    if (newFontStyle) {
        setFontStyle(newFontStyle);
        handleTextStyleChange(textName, { fontStyle: newFontStyle }, activeCanvases, canvasApps) ;
    } else {
        setFontStyle('normal');
        handleTextStyleChange(textName, { fontStyle: 'normal' }, activeCanvases, canvasApps);
    }
};
