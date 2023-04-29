import * as PIXI from 'pixi.js';
import { useEffect, useCallback, MutableRefObject } from 'react';

export interface DraggableContainer extends PIXI.Container {
    dragging: boolean;
    dragData: PIXI.FederatedPointerEvent | null;
    dragOffset: PIXI.Point | null;
}
const useDraggable = (appRef: MutableRefObject<PIXI.Application | null>, containers: DraggableContainer[]) => {
    const handleDragStart = useCallback(
        (event: PIXI.FederatedPointerEvent) => {
            containers.forEach((container) => {
                container.alpha = 0.5;
                container.dragging = true;
                container.dragData = event;
                const localPosition = event.data.getLocalPosition(container);
                container.dragOffset = new PIXI.Point(
                    localPosition.x * container.scale.x,
                    localPosition.y * container.scale.y,
                );
                container.dragOffset.x *= -1;
                container.dragOffset.y *= -1;
            });
        },
        [containers],
    );

    const handleDragMove = useCallback(
        (event: PIXI.FederatedPointerEvent) => {
            let firstContainer = true;
            let sharedPosition = { x: 0, y: 0 };

            containers.forEach((container) => {
                if (container.dragging) {
                    const newPosition = event.data.getLocalPosition(container.parent);

                    newPosition.x += container.dragOffset.x;
                    newPosition.y += container.dragOffset.y;

                    if (firstContainer) {
                        sharedPosition = { x: newPosition.x, y: newPosition.y };
                        firstContainer = false;
                    } else {
                        newPosition.x = sharedPosition.x;
                        newPosition.y = sharedPosition.y;
                    }

                    container.x = newPosition.x;
                    container.y = newPosition.y;
                } else {
                    return;
                }
            });
        },
        [containers],
    );

    const handleDragEnd = useCallback(
        (event: PIXI.FederatedPointerEvent) => {
            containers.forEach((container) => {
                container.alpha = 1;
                container.dragging = false;
                container.dragData = null;
                container.dragOffset = null;
            });
        },
        [containers],
    );

    useEffect(() => {
        if (!appRef || !appRef.current || !containers || !Array.isArray(containers)) return;

        const app = appRef.current;

        containers.forEach((container) => {
            app.stage.sortableChildren = true;
            container.eventMode = 'static';

            container
                .on('pointerdown', handleDragStart)
                .on('pointerup', handleDragEnd)
                .on('pointerupoutside', handleDragEnd)
                .on('pointermove', handleDragMove);
        });

        return () => {
            containers.forEach((container) => {
                container.off('pointerdown', handleDragStart);
                container.off('pointerup', handleDragEnd);
                container.off('pointerupoutside', handleDragEnd);
                container.off('pointermove', handleDragMove);
            });
        };
    }, [appRef, containers, handleDragStart, handleDragEnd, handleDragMove]);
};

export default useDraggable;
