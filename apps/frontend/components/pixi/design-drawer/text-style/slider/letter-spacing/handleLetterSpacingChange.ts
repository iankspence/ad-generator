import {handleTextStyleChange} from "../../utils/handleTextStyleChange";

export const handleLetterSpacingChange = (event, newValue, setLetterSpacing, textName, activeCanvases, canvasApps) => {
    setLetterSpacing(newValue);
    handleTextStyleChange(textName, { letterSpacing: newValue / 100 }, activeCanvases, canvasApps);
};
