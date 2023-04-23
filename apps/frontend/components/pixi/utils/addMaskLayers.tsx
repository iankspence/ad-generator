export const addMaskLayers = (selectedTheme, setMaskLayerIds, layer, setLayers, canvasName) => {
    const newMaskLayerIds = selectedTheme.settings.shortMasks.map((maskLayer) => `${canvasName}__${maskLayer.id}`);

    setMaskLayerIds(newMaskLayerIds);

    setLayers((prevLayers) =>
        selectedTheme.settings.shortMasks.reduce((layers, maskLayer) => {
            layers.push({
                id: newMaskLayerIds.shift(),
                type: 'mask',
                maskName: maskLayer.id,
                colour: maskLayer.colour,
            });
            return layers;
        }, prevLayers),
    );
};
