import {handleTextStyleChange} from "./handleTextStyleChange";

export const handleColorChange = (event, setFill, textName, activeCanvases, canvasApps) => {
    setFill(event.target.value);
    console.log('event.target.value', event.target.value);
    const hexColor = event.target.value.startsWith('#')
        ? event.target.value
        : `#${event.target.value}`;
    console.log('textName', textName)
    handleTextStyleChange(textName, { fill: hexColor }, activeCanvases, canvasApps);
};

