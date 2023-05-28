export const getTextData = (canvasName, filteredData, position) => {

    const item = filteredData[position - 1] || {};

    return {
        sourceTextId: item._id || '',
        sourceText: item[`${canvasName}Text`] || '',
        sourceTextEdited: item[`${canvasName}TextEdited`] || '',
    }
};

