export const handleLineHeightChange = (event, newValue, updateLineHeightMultipliers, activeCanvases, canvasApps,) => {
    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                updateLineHeightMultipliers(canvasName, newValue);
            }
        }
    });
};
