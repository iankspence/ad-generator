export const handleActiveButtonClick = (canvasName, activeCanvases, updateActiveCanvases) => {
    const newSelectedCanvases = { ...activeCanvases, [canvasName]: !activeCanvases[canvasName] };
    updateActiveCanvases(newSelectedCanvases);
};
