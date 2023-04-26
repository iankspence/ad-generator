import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const containerRef = useRef(null);
    const { updateHookApp } = useContext(PixiContext);

    useCanvasApp(appRef, size, updateHookApp, canvasName);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName);

    useDraggable(appRef, imageUrl, containerRef);

    useZoom(appRef, containerRef);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default HookCanvasClient;
