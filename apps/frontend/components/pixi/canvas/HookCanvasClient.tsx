import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useNewSelectedTheme from '../../../hooks/useNewSelectedTheme';
import React, { useContext, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, size, selectedThemeId, canvasName }) => {
    const appRef = useRef(null);
    const { updateHookApp } = useContext(PixiContext);

    useCanvasApp(appRef, size, updateHookApp, canvasName);
    useNewSelectedTheme(appRef.current, imageUrl, selectedThemeId, canvasName);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default HookCanvasClient;
