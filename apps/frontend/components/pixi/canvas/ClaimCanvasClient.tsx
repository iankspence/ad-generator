import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';

const ClaimCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const {updateCanvasApp} = useContext(PixiContext);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName, size);

    const container = useImage(appRef, imageUrl, canvasName);
    useDraggable(appRef, container);
    useZoom(appRef, container);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default ClaimCanvasClient;
