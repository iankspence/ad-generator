import * as PIXI from 'pixi.js';
import { useEffect, useCallback, useRef, useState, MutableRefObject } from 'react';

interface CustomInteractionData {
    getLocalPosition(displayObject: PIXI.DisplayObject, point?: PIXI.Point, globalPos?: PIXI.Point): PIXI.Point;
}

export interface DraggableContainer extends PIXI.Container {
    dragging: boolean;
    dragData: CustomInteractionData | null;
    dragOffset: PIXI.Point | null;
}

const useDraggable = (
    appRef: MutableRefObject<PIXI.Application | null>,
    imageUrl: string,
    containerRef: MutableRefObject<DraggableContainer | null>,
) => {
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const imagePositionRef = useRef(imagePosition);

    const onDragStart = useCallback(
        (event) => {
            if (!appRef.current) return;

            const container = containerRef.current;
            if (!container) return;

            container.alpha = 0.5;
            container.dragging = true;
            container.dragData = event.data;
            const localPosition = event.data.getLocalPosition(container);
            container.dragOffset = new PIXI.Point(
                localPosition.x * container.scale.x,
                localPosition.y * container.scale.y,
            );
            container.dragOffset.x *= -1;
            container.dragOffset.y *= -1;

            imagePositionRef.current = { x: container.x, y: container.y };
        },
        [appRef, imageUrl, containerRef],
    );

    const onDragMove = useCallback(
        (event) => {
            const container = containerRef.current;
            if (!container) return;

            if (container.dragging) {
                const newPosition = event.data.getLocalPosition(container.parent);

                newPosition.x += container.dragOffset.x;
                newPosition.y += container.dragOffset.y;

                container.x = newPosition.x;
                container.y = newPosition.y;
                imagePositionRef.current = { x: newPosition.x, y: newPosition.y };
            } else {
                return;
            }
        },
        [containerRef],
    );

    const onDragEnd = useCallback(
        (event) => {
            const container = containerRef.current;
            if (!container || !container.dragging) return;

            container.alpha = 1;
            container.dragging = false;
        },
        [containerRef],
    );

    useEffect(() => {
        if (!appRef || !appRef?.current) return;

        const app = appRef.current;
        if (!app || !imageUrl) return;

        if (app && imageUrl) {
            if (!containerRef.current) {
                const container = new PIXI.Container();
                app.stage.addChild(container);
                containerRef.current = container as DraggableContainer;

                const image = PIXI.Sprite.from(imageUrl);
                image.anchor.set(0.5);

                image.x = app.screen.width / 2;
                image.y = app.screen.height / 2;
                image.eventMode = 'static';
                image.cursor = 'pointer';

                container.addChild(image);
                container.eventMode = 'static';
                container
                    .on('pointerdown', onDragStart)
                    .on('pointerup', onDragEnd)
                    .on('pointerupoutside', onDragEnd)
                    .on('pointermove', onDragMove);
            }
        }
        return () => {
            const app = appRef.current;
            const container = containerRef.current;

            if (app && container) {
                container.off('pointerdown', onDragStart);
                container.off('pointerup', onDragEnd);
                container.off('pointerupoutside', onDragEnd);
                container.off('pointermove', onDragMove);

                app.stage.removeChild(container);
                containerRef.current = null;
            }
        };
    }, [appRef, imageUrl, imagePosition, onDragStart, onDragEnd, onDragMove]);

    return imagePosition;
};

export default useDraggable;
