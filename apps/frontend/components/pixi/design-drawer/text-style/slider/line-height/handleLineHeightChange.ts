export const handleLineHeightChange = (event, newValue, setLineHeightMultiplier, activeCanvases, canvasApps, updateLineHeightMultipliers) => {
    setLineHeightMultiplier(newValue);

    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                updateLineHeightMultipliers(canvasName, newValue / 100);
            }
        }
    });
};
