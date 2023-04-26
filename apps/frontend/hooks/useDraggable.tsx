import { onDragEnd } from '../callbacks/onDragEnd';
import { onDragMove } from '../callbacks/onDragMove';
import { onDragStart } from '../callbacks/onDragStart';
import * as PIXI from 'pixi.js';
import { useEffect, useCallback, useState, MutableRefObject } from 'react';

export interface CustomInteractionData {
    getLocalPosition(displayObject: PIXI.DisplayObject, point?: PIXI.Point, globalPos?: PIXI.Point): PIXI.Point;
}

export interface DraggableContainer extends PIXI.Container {
    dragging: boolean;
    dragData: PIXI.FederatedPointerEvent | null;
    dragOffset: PIXI.Point | null;
}

const useDraggable = (
    appRef: MutableRefObject<PIXI.Application | null>,
    imageUrl: string,
    containerRef: MutableRefObject<DraggableContainer | null>,
) => {
    const [imagePosition] = useState({ x: 0, y: 0 });

    const handleDragStart = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragStart(containerRef)(event),
        [appRef, containerRef],
    );
    const handleDragMove = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragMove(containerRef)(event),
        [containerRef],
    );
    const handleDragEnd = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragEnd(containerRef)(event),
        [containerRef],
    );

    useEffect(() => {
        if (!appRef || !appRef?.current) return;

        const app = appRef.current;
        if (!app || !imageUrl) return;

        if (app && imageUrl) {
            if (!containerRef.current) {
                app.stage.sortableChildren = true;

                const container = new PIXI.Container();
                app.stage.addChild(container);
                containerRef.current = container as DraggableContainer;

                const image = PIXI.Sprite.from(imageUrl);
                image.anchor.set(0.5);

                image.x = app.screen.width / 2;
                image.y = app.screen.height / 2;
                image.eventMode = 'static';
                image.cursor = 'pointer';

                image.zIndex = 0;

                container.addChild(image);

                container.eventMode = 'static';
                container
                    .on('pointerdown', handleDragStart)
                    .on('pointerup', handleDragEnd)
                    .on('pointerupoutside', handleDragEnd)
                    .on('pointermove', handleDragMove);
            }
        }

        const currentApp = app;

        return () => {
            const container = containerRef.current;

            if (currentApp && currentApp?.stage && container) {
                container.off('pointerdown', handleDragStart);
                container.off('pointerup', handleDragEnd);
                container.off('pointerupoutside', handleDragEnd);
                container.off('pointermove', handleDragMove);

                currentApp.stage.removeChild(container);
                containerRef.current = null;
            }
        };
    }, [appRef, imageUrl, imagePosition, containerRef, handleDragStart, handleDragEnd, handleDragMove]);

    return imagePosition;
};

export default useDraggable;
