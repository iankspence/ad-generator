import {handleTextStyleChange} from "../../utils/handleTextStyleChange";

export const handlePaddingChange = (event, newValue, setPadding, textName, activeCanvases, canvasApps) => {
    setPadding(newValue);
    handleTextStyleChange(textName, { padding: newValue }, activeCanvases, canvasApps);
};
