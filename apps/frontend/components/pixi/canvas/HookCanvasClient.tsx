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
    console.log('HookCanvasClient: layers', layers);

    useCanvasApp(appRef, size, updateHookApp);
    useSelectedTheme(imageUrl, selectedThemeId, canvasName);

    return (
        <>
            <div id="canvas-container"></div>
            {layers.map((layer) => {
                if (layer.id.split('__')[0] === canvasName) return renderLayer(layer, appRef);
            })}
        </>
    );
};

export default HookCanvasClient;
