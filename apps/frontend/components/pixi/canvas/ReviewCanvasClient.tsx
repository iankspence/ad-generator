import { useLayerContext } from '../../../contexts/LayerContext';
import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useSelectedTheme from '../../../hooks/useSelectedTheme';
import { renderLayer } from '../utils/renderLayer';
import React, { useContext, useRef } from 'react';

const ReviewCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const { updateReviewApp } = useContext(PixiContext);
    const { layers } = useLayerContext();
    console.log('ReviewCanvasClient: layers', layers);

    useCanvasApp(appRef, size, updateReviewApp, canvasName);
    useSelectedTheme(imageUrl, selectedThemeId, canvasName);

    return (
        <div id={`${canvasName}-canvas-container`}>
            {layers.map((layer) => {
                if (layer.id.split('__')[0] === canvasName) return renderLayer(layer, appRef);
            })}
        </div>
    );
};

export default ReviewCanvasClient;
