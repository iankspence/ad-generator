import useDraggable from '../../../hooks/useDraggable';
import useZoom from '../../../hooks/useZoom';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const HookCanvasClient = ({ imageUrl }) => {
    const appRef = useRef(null);

    useEffect(() => {
        appRef.current = new PIXI.Application({ antialias: true });
        document.getElementById('canvas-container').appendChild(appRef.current.view as HTMLCanvasElement);

        return () => {
            // Clean up PIXI Application when the component is unmounted
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
        };
    }, []);

    useDraggable(appRef, imageUrl);
    useZoom(appRef);

    return (
        <>
            <div id="canvas-container"></div>
        </>
    );
};

export default HookCanvasClient;
