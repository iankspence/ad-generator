import useDraggable from '../../../hooks/useDraggable';
import useZoom from '../../../hooks/useZoom';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const HookCanvasClient = ({ imageUrl }) => {
    const appRef = useRef(new PIXI.Application({ antialias: true }));

    useEffect(() => {
        document.getElementById('canvas-container').appendChild(appRef.current.view as HTMLCanvasElement);
    }, [appRef.current.view]);

    useDraggable(appRef, imageUrl);
    useZoom(appRef);

    return (
        <>
            <div id="canvas-container"></div>
        </>
    );
};

export default HookCanvasClient;
