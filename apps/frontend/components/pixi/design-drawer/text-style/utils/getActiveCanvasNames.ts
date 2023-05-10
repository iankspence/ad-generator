export const getActiveCanvasNames = (activeCanvases) => {
    return Object.entries(activeCanvases).filter(([canvasName, isActive]) => isActive).map(([canvasName, isActive]) => canvasName);
};
