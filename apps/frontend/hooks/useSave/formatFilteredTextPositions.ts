export const formatFilteredTextPositions = (hookPosition, claimPosition, reviewPosition, closePosition, copyPosition) => {
    const formattedFilteredTextPositions = [];
    formattedFilteredTextPositions.push({
        canvasName: 'hook',
        position: hookPosition
    });
    formattedFilteredTextPositions.push({
        canvasName: 'claim',
        position: claimPosition
    });
    formattedFilteredTextPositions.push({
        canvasName: 'review',
        position: reviewPosition
    });
    formattedFilteredTextPositions.push({
        canvasName: 'close',
        position: closePosition
    });
    formattedFilteredTextPositions.push({
        canvasName: 'copy',
        position: copyPosition
    });
    return formattedFilteredTextPositions;
};
