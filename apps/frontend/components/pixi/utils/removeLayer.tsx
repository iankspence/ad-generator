export const removeLayer = (id, setLayers) => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
};
