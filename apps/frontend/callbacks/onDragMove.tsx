import { DraggableContainer } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragMove =
    (container: DraggableContainer) =>
    (event: PIXI.FederatedPointerEvent): void => {
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
