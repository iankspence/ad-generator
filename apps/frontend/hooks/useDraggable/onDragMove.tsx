import { DraggableContainer } from './useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragMove =
    (container: DraggableContainer, eventEmitter) =>
    (event: PIXI.FederatedPointerEvent): void => {
        if (container.dragging) {
            const newPosition = event.data.getLocalPosition(container.parent);

            newPosition.x += container.dragOffset.x;
            newPosition.y += container.dragOffset.y;

            container.x = newPosition.x;
            container.y = newPosition.y;

            eventEmitter.emit("dragmove", container);
        } else {
            return;
        }
    };
