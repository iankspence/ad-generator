export const formatYRanges = (yRanges) => {
    const formattedRanges = [];
    for(const key in yRanges) {
        formattedRanges.push({
            canvasName: key,
            yRange: yRanges[key]
        });
    }
    return formattedRanges;
};
