import useDraggable from '../../../hooks/useDraggable';
import useZoom from '../../../hooks/useZoom';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const HookCanvas = ({ imageUrl }) => {
    const appRef = useRef(new PIXI.Application({ antialias: true }));

    useEffect(() => {
        document.getElementById('canvas-container').appendChild(appRef.current.view as HTMLCanvasElement);
    }, [appRef.current.view]);

    useDraggable(() => appRef.current, imageUrl);
    useZoom(() => appRef.current);

    return (
        <>
            <div id="canvas-container"></div>
        </>
    );
};

export default HookCanvas;
