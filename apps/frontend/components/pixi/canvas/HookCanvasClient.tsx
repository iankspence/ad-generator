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

    const {updateCanvasApp} = useContext(PixiContext);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);
    // useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName, size, textLayerRef.current);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName, size);

    useText(appRef.current, canvasName, textLayerRef);

    const container = useImage(appRef, imageUrl, canvasName);
    useDraggable(appRef, container);
    useZoom(appRef, container);

    // useActionSync(appRef.current, canvasName);

    console.log('appRef.current', appRef.current);
    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default HookCanvasClient;
