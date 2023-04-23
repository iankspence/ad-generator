export const addImageLayer = (selectedTheme, setImageLayerId, setLayers, imageUrl, canvasName) => {
    const newImageLayerId = `${canvasName}__${Date.now()}`;
    setImageLayerId(newImageLayerId);

    setLayers((prevLayers) => [
        ...prevLayers,
        { id: newImageLayerId, type: 'image', imageUrl, ...selectedTheme.settings },
    ]);
};
