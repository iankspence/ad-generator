import * as PIXI from 'pixi.js';
import { useEffect, useCallback, MutableRefObject } from 'react';

const useZoom = (
    appRef: MutableRefObject<PIXI.Application | null>,
    containers: PIXI.Container[],
    scaleFactor = 1.1,
) => {
    const handleWheel = useCallback(
        (event) => {
            if (!appRef || !appRef.current || !containers || !Array.isArray(containers)) return;

            const app = appRef.current;

            event.preventDefault();

            const delta = -event.deltaY * 0.001;
            const scaleChange = 1 + delta;

            const globalMousePosition = new PIXI.Point(event.clientX, event.clientY);
            app.renderer.plugins.interaction.mapPositionToPoint(globalMousePosition, event.clientX, event.clientY);

            let firstContainer = true;
            let sharedScale = { x: 1, y: 1 };
            let sharedPosition = { x: 0, y: 0 };

            containers.forEach((container) => {
                container.scale.x *= scaleChange;
                container.scale.y *= scaleChange;

                const localMousePositionBeforeZoom = container.toLocal(globalMousePosition);
                const tempPoint = new PIXI.Point();
                const localMousePositionAfterZoom = container.toLocal(globalMousePosition, undefined, tempPoint);

                container.position.x +=
                    (localMousePositionAfterZoom.x - localMousePositionBeforeZoom.x) * container.scale.x;
                container.position.y +=
                    (localMousePositionAfterZoom.y - localMousePositionBeforeZoom.y) * container.scale.y;

                if (firstContainer) {
                    sharedScale = { x: container.scale.x, y: container.scale.y };
                    sharedPosition = { x: container.position.x, y: container.position.y };
                    firstContainer = false;
                } else {
                    container.scale.x = sharedScale.x;
                    container.scale.y = sharedScale.y;
                    container.position.x = sharedPosition.x;
                    container.position.y = sharedPosition.y;
                }
            });
        },
        [appRef, containers],
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
    }, [appRef, handleWheel]);
};

export default useZoom;
