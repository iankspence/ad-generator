export const getTextNamesForCanvas = (canvasName) => {
    if (canvasName === 'hook' || canvasName === 'review') {
        return ['main', 'author'];
    } else if (canvasName === 'claim' || canvasName === 'close') {
        return ['main'];
    }
    return [];
};
