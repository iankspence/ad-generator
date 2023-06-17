export const handleActiveCanvasChange = (canvas, activeCanvases, updateActiveCanvases) => {
    const newSelectedCanvases = { ...activeCanvases, [canvas]: !activeCanvases[canvas] };

    updateActiveCanvases(newSelectedCanvases);
};
