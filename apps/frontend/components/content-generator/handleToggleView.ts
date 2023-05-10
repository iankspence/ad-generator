export const handleToggleView = (event, singleCanvasView, setSingleCanvasView, activeCanvases, canvases, currentCanvasIndex, updateActiveCanvases) => {
    if (singleCanvasView) {
        const updatedActiveCanvases = { ...activeCanvases };
        Object.keys(updatedActiveCanvases).forEach((key) => {
            updatedActiveCanvases[key] = key === canvases[currentCanvasIndex].canvasName;
        });
        updateActiveCanvases(updatedActiveCanvases);
    }
    setSingleCanvasView(!singleCanvasView);
};
