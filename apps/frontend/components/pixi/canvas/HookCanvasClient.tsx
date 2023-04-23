import { useLayerContext } from '../../../contexts/LayerContext';
import { PixiContext } from '../../../contexts/PixiContext';
import { themes } from '../../../utils/constants/themes';
import ImageLayer from '../layer/ImageLayer';
import MaskLayer from '../layer/MaskLayer';
import * as PIXI from 'pixi.js';
import React, { useContext, useEffect, useRef, useState } from 'react';

const HookCanvasClient = ({ imageUrl, size, selectedThemeId }) => {
    const appRef = useRef(null);
    const { updateHookApp } = useContext(PixiContext);
    const { layers, setLayers } = useLayerContext();
    const [imageLayerId, setImageLayerId] = useState(null);
    const [maskLayerIds, setMaskLayerIds] = useState([]);

    console.log('layers', layers);

    useEffect(() => {
        appRef.current = new PIXI.Application({
            antialias: true,
            height: size,
            width: size,
            backgroundColor: 0x000000,
            backgroundAlpha: 0,
            resolution: 1,
        });
        document.getElementById('canvas-container').appendChild(appRef.current.view as HTMLCanvasElement);

        updateHookApp(appRef.current);

        return () => {
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
            updateHookApp(null);
        };
    }, [updateHookApp]);

    const addImageLayer = (selectedTheme) => {
        const newImageLayerId = Date.now();
        setImageLayerId(newImageLayerId);

        setLayers((prevLayers) => [
            ...prevLayers,
            { id: newImageLayerId, type: 'image', imageUrl, ...selectedTheme.settings },
        ]);
    };
    const addMaskLayers = (selectedTheme) => {
        console.log('layers addMaskLayers before', layers);
        const newMaskLayerIds = selectedTheme.settings.shortMasks.map((maskLayer) => maskLayer.id);
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
        console.log('layers addMaskLayers after', layers);
    };

    useEffect(() => {
        if (selectedThemeId) {
            const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

            if (imageUrl && selectedTheme) {
                // Remove the previous image layer if it exists
                if (imageLayerId) {
                    removeLayer(imageLayerId);
                }

                if (maskLayerIds) {
                    maskLayerIds.forEach((maskLayerId) => {
                        removeLayer(maskLayerId);
                    });
                }

                addImageLayer(selectedTheme);
                addMaskLayers(selectedTheme);
            }
        }
    }, [selectedThemeId, imageUrl]);

    const removeLayer = (id) => {
        setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
    };

    const renderLayer = (layer) => {
        if (layer.type === 'image') {
            return <ImageLayer key={layer.id} appRef={appRef} imageUrl={layer.imageUrl} />;
        } else if (layer.type === 'mask') {
            return <MaskLayer key={layer.id} appRef={appRef} maskName={layer.maskName} colour={layer.colour} />;
        }
    };

    return (
        <>
            <div id="canvas-container"></div>
            {layers.map(renderLayer)}
            {/* Add other layer types buttons here */}
        </>
    );
};

export default HookCanvasClient;
