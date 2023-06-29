export const formatLineHeightMultipliers = (lineHeightMultipliers) => {
    const formattedMultipliers = [];
    for(const key in lineHeightMultipliers) {
        formattedMultipliers.push({
            canvasName: key,
            lineHeightMultiplier: lineHeightMultipliers[key]
        });
    }
    return formattedMultipliers;
};
