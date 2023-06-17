export const handleRangeChange = (rangeLabel, newValue, activeCanvases, canvasApps, xRanges, yRanges, updateRange) => {
    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                if (rangeLabel === 'X Range') {
                    const updatedYRange = yRanges[canvasName];
                    updateRange(canvasName, newValue, updatedYRange);
                } else if (rangeLabel === 'Y Range') {
                    const updatedXRange = xRanges[canvasName];
                    updateRange(canvasName, updatedXRange, newValue);
                }
            }
        }
    });
};
