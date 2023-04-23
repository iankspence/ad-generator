import { useLayerContext } from '../../../contexts/LayerContext';
import PixiContext from '../../../contexts/PixiContext';
import ImageLayer from '../layer/ImageLayer';
import MaskLayer from '../layer/MaskLayer';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, app, setApp, size, themeSettings }) => {
    const appRef = useRef(null);
    const { layers, setLayers } = useLayerContext();

    const maskColour = { r: 255, g: 0, b: 0 }; // Red color for the white part of the mask

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

        setApp(appRef.current);

        return () => {
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
            setApp(null);
        };
    }, [setApp]);

    const addImageLayer = () => {
        setLayers((prevLayers) => [
            ...prevLayers,
            { id: Date.now(), type: 'image', imageUrl, ...themeSettings.imageLayer },
        ]);
    };

    const addMaskLayers = () => {
        setLayers((prevLayers) =>
            themeSettings.maskLayers.reduce((layers, maskLayer) => {
                layers.push({
                    id: Date.now(),
                    type: 'mask',
                    maskName: maskLayer.id,
                    colour: maskLayer.colour,
                    ...maskLayer,
                });
                return layers;
            }, prevLayers),
        );
    };

    useEffect(() => {
        if (imageUrl) {
            addImageLayer();
            addMaskLayers();
        }
    }, [imageUrl]);

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
        <PixiContext.Provider value={appRef.current}>
            <div id="canvas-container"></div>
            {layers.map(renderLayer)}
            {/* Add other layer types buttons here */}
        </PixiContext.Provider>
    );
};

export default HookCanvasClient;