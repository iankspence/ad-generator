import { handleTextStyleChange } from '../../utils/handleTextStyleChange';

export const handleAlignChange = (event, newAlign, setTextAlign, textName, activeCanvases, canvasApps ) => {
    if (newAlign) {
        setTextAlign(newAlign);
        handleTextStyleChange(textName, { align: newAlign }, activeCanvases, canvasApps);
    } else {
        setTextAlign('left');
        handleTextStyleChange(textName, { align: 'left' }, activeCanvases, canvasApps);
    }
};
