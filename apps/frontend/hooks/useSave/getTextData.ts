export const getTextData = (canvasName, filteredData, position) => {
    const item = filteredData[position - 1] || {};
    return {
        sourceText: item[`${canvasName}Text`] || '',
        sourceTextEdited: item[`${canvasName}TextEdited`] || '',
        sourceTextId: item._id || '',
    }
};

