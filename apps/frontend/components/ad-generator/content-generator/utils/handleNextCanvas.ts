export const handleNextCanvas = (currentCanvasIndex, setCurrentCanvasIndex, canvases, activeCanvases, updateActiveCanvases ) => {
    if (currentCanvasIndex < canvases.length - 1) {
        const previousCanvasName = canvases[currentCanvasIndex].canvasName;
        setCurrentCanvasIndex((prevIndex) => prevIndex + 1);
        const currentCanvasName = canvases[currentCanvasIndex + 1].canvasName;
        updateActiveCanvases({ ...activeCanvases, [previousCanvasName]: false, [currentCanvasName]: true });
    }
};
