import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';
import useSync from "../../../hooks/useSync";

const ReviewCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const {updateCanvasApp} = useContext(PixiContext);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);
    useNewSelectedTheme(appRef, imageUrl, selectedThemeId, canvasName, size);

    useImage(appRef, imageUrl, canvasName);
    useDraggable(appRef, canvasName);
    useZoom(appRef, canvasName);

    useSync();

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default ReviewCanvasClient;
