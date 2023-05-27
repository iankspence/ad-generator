import { DraggableContainer } from './useDraggable';
import * as PIXI from 'pixi.js';

export const onDragEnd =
    (container: DraggableContainer, eventEmitter) =>
    (event: PIXI.FederatedPointerEvent): void => {
        if (!container || !container.dragging) return;

        container.alpha = 1;
        container.dragging = false;

        eventEmitter.emit("dragend", container);
    };
