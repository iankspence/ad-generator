import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';

const ClaimCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const containerRef = useRef(null);
    const { updateClaimApp } = useContext(PixiContext);

    useCanvasApp(appRef, size, updateClaimApp, canvasName);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName);

    useDraggable(appRef, imageUrl, containerRef);

    useZoom(appRef, containerRef);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default ClaimCanvasClient;
