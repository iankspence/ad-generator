import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

const useCanvasApp = (appRef, size, updateCanvasApp, canvasName) => {
    useEffect(() => {
        appRef.current = new PIXI.Application({
            antialias: true,
            height: size,
            width: size,
            backgroundColor: 0x000000,
            backgroundAlpha: 0,
            resolution: 1,
        });
        document.getElementById(`${canvasName}-canvas-container`).appendChild(appRef.current.view as HTMLCanvasElement);

        updateCanvasApp(canvasName, appRef.current);

        return () => {
            appRef.current.destroy(true, { children: true });
            appRef.current = null;
            updateCanvasApp(null);
        };
    }, [size]);

    return appRef;
};

export default useCanvasApp;
