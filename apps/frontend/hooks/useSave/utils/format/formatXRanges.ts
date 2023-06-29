export const formatXRanges = (xRanges) => {
    const formattedRanges = [];
    for(const key in xRanges) {
        formattedRanges.push({
            canvasName: key,
            xRange: xRanges[key]
        });
    }
    return formattedRanges;
};
