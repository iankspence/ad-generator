import { DraggableContainer } from './useDraggable';
import * as PIXI from 'pixi.js';

export const onDragStart =
    (container: DraggableContainer, eventEmitter) =>
    (event: PIXI.FederatedPointerEvent): void => {
        container.alpha = 0.5;
        container.dragging = true;
        container.dragData = event;
        const localPosition = event.getLocalPosition(container);
        container.dragOffset = new PIXI.Point(localPosition.x * container.scale.x, localPosition.y * container.scale.y);
        container.dragOffset.x *= -1;
        container.dragOffset.y *= -1;
        eventEmitter.emit("dragstart", container);
    };
