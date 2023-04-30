import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable, { DraggableContainer } from '../../../hooks/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import useText from '../../../hooks/useText';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';
import useSync from "../../../hooks/useSync";

const HookCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const textLayerRef = useRef(null); // Create a new ref for the text layer

    const {updateCanvasApp} = useContext(PixiContext);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);

    useNewSelectedTheme(appRef, imageUrl, selectedThemeId, canvasName, size);
    useText(appRef, canvasName, textLayerRef);
    useImage(appRef, imageUrl, canvasName);
    useDraggable(appRef, canvasName);
    useZoom(appRef, canvasName);
    // add the useSync hook
    useSync();

    console.log('appRef.current', appRef.current);
    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default HookCanvasClient;
