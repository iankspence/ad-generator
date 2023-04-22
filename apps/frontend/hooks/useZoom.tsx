import * as PIXI from 'pixi.js';
import { useEffect, useCallback, MutableRefObject } from 'react';

const useZoom = (
    appRef: MutableRefObject<PIXI.Application | null>,
    containerRef: MutableRefObject<PIXI.Container | null>,
    scaleFactor = 1.1,
) => {
    const handleWheel = useCallback(
        (event) => {
            const app = appRef.current;
            const container = containerRef.current;

            if (!app || !container) return;

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
        },
        [appRef, containerRef, scaleFactor],
    );
    useEffect(() => {
        if (!appRef?.current) return;

        const app = appRef.current;

        if (app && app?.view) {
            app.view.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (app && app?.view) {
                app.view.removeEventListener('wheel', handleWheel);
            }
        };
    }, [appRef, handleWheel]);
};

export default useZoom;
