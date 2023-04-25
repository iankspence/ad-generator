import { DraggableContainer } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragMove =
    (containerRef: MutableRefObject<DraggableContainer | null>) =>
    (event: PIXI.FederatedPointerEvent): void => {
        const container = containerRef.current;
        if (!container) return;

        if (container.dragging) {
            const newPosition = event.data.getLocalPosition(container.parent);

            newPosition.x += container.dragOffset.x;
            newPosition.y += container.dragOffset.y;

            container.x = newPosition.x;
            container.y = newPosition.y;
        } else {
            return;
        }
    };
