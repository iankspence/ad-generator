import * as PIXI from 'pixi.js';
import {useEffect, useCallback, useContext} from 'react';
import {PixiContext} from "../contexts/PixiContext";
import {findImageContainer} from "../components/pixi/utils/findImageContainer";
import {DraggableContainer} from "./useDraggable";

export const useZoom = (appRef, canvasName: string) => {
    const { canvasApps, eventEmitter } = useContext(PixiContext);

    const scaleFactor = 1.1;

    const container = findImageContainer(canvasApps, canvasName) as DraggableContainer;

    const handleWheel = useCallback(
        (event) => {
            if (!appRef.current || !container) return;

            const app = appRef.current;

            event.preventDefault();

            const direction = event.deltaY < 0 ? 1 : -1;
            const scale = direction > 0 ? scaleFactor : 1 / scaleFactor;

            const globalMousePosition = new PIXI.Point(event.clientX, event.clientY);
            app.renderer.events.mapPositionToPoint(globalMousePosition, event.clientX, event.clientY);

            const localMousePositionBeforeZoom = container.toLocal(globalMousePosition);

            container.scale.x *= scale;
            container.scale.y *= scale;

            const localMousePositionAfterZoom = container.toLocal(globalMousePosition);
            container.position.x +=
                (localMousePositionAfterZoom.x - localMousePositionBeforeZoom.x) * container.scale.x;
            container.position.y +=
                (localMousePositionAfterZoom.y - localMousePositionBeforeZoom.y) * container.scale.y;

            eventEmitter.emit("zoom", container);

            console.log("zoom", container.name)
        },
    [appRef, container, scaleFactor, eventEmitter],
    );

    useEffect(() => {
        if (!appRef.current) return;

        const app = appRef.current;

        if (app.view) {
            app.view.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (appRef.current && app.view) {
                app.view.removeEventListener('wheel', handleWheel);
            }
        };
    }, [handleWheel]);

};

export default useZoom;
