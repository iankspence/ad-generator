import * as PIXI from 'pixi.js';
import {useContext, useEffect } from 'react';
import { PixiContext } from '../contexts/PixiContext';

const useCanvasApp = (appRef, size, canvasName) => {
    const { updateCanvasApp } = useContext(PixiContext);

    useEffect(() => {
        appRef.current = new PIXI.Application({
            antialias: true,
            height: size,
            width: size,
            backgroundColor: 0x000000,
            backgroundAlpha: 0,
            resolution: 1,
        });

        appRef.current.stage.sortableChildren = true;
        document.getElementById(`${canvasName}-canvas-container`).appendChild(appRef.current.view as HTMLCanvasElement);

        updateCanvasApp(canvasName, appRef.current);

        return () => {
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
            updateCanvasApp(canvasName, null);
        };
    }, [size]);

    return appRef;
};

export default useCanvasApp;
