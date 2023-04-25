import { useLayerContext } from '../../../contexts/LayerContext';
import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useSelectedTheme from '../../../hooks/useSelectedTheme';
import { renderLayer } from '../utils/renderLayer';
import React, { useContext, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const { updateHookApp } = useContext(PixiContext);
    const { layers } = useLayerContext();

    useCanvasApp(appRef, size, updateHookApp, canvasName);
    useSelectedTheme(imageUrl, selectedThemeId, canvasName);

    console.log('HookCanvasClient: layers', layers);
    console.log('canvasName: ', canvasName);
    return (
        <div id={`${canvasName}-canvas-container`}>
            {layers.map((layer) => {
                {
                    console.log(layer.id);
                }
                if (layer.id.split('__')[0] === canvasName) return renderLayer(layer, appRef);
            })}
        </div>
    );
};

export default HookCanvasClient;
