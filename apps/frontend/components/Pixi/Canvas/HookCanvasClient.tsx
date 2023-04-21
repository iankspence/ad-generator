import PixiContext from '../../../contexts/PixiContext';
import useDraggable from '../../../hooks/useDraggable';
import useZoom from '../../../hooks/useZoom';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const HookCanvasClient = ({ imageUrl, app, setApp, size }) => {
    const appRef = useRef(null);

    useEffect(() => {
        appRef.current = new PIXI.Application({ antialias: true, height: size, width: size });
        document.getElementById('canvas-container').appendChild(appRef.current.view as HTMLCanvasElement);

        setApp(appRef.current);

        return () => {
            // Clean up PIXI Application when the component is unmounted
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
            setApp(null);
        };
    }, [setApp]);

    useDraggable(appRef, imageUrl);
    useZoom(appRef);

    return (
        <PixiContext.Provider value={appRef.current}>
            <div id="canvas-container"></div>
        </PixiContext.Provider>
    );
};

export default HookCanvasClient;
