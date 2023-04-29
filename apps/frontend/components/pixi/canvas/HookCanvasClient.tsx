import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable, { DraggableContainer } from '../../../hooks/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useText from '../../../hooks/useText';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const textLayerRef = useRef(null); // Create a new ref for the text layer

    const {
        hookImageContainer,
        claimImageContainer,
        closeImageContainer,
        reviewImageContainer,
        activeCanvases,
        updateHookApp,
    } = useContext(PixiContext);

    useCanvasApp(appRef, size, updateHookApp, canvasName);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName, size, textLayerRef.current);

    useText(appRef.current, canvasName, textLayerRef);

    const imageContainer = useImage(appRef, imageUrl, canvasName);

    const activeContainers = [
        activeCanvases.hook ? hookImageContainer : null,
        activeCanvases.claim ? claimImageContainer : null,
        activeCanvases.close ? closeImageContainer : null,
        activeCanvases.review ? reviewImageContainer : null,
    ].filter((container) => container !== null);

    // If imageContainer is available, include it in the draggable and zoomable containers
    if (imageContainer) {
        activeContainers.push(imageContainer);
    }

    useDraggable(appRef, activeContainers as DraggableContainer[]);
    useZoom(appRef, activeContainers);

    // const container = useImage(appRef, imageUrl, canvasName);
    // useDraggable(appRef, container);
    // useZoom(appRef, container);

    console.log('appRef.current', appRef.current);
    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default HookCanvasClient;
