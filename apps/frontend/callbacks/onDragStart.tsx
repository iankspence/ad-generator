import { DraggableContainer, CustomInteractionData } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragStart =
    (containerRef: MutableRefObject<DraggableContainer | null>) =>
    (event: PIXI.FederatedPointerEvent): void => {
        const container = containerRef.current;
        if (!container) return;

        container.alpha = 0.5;
        container.dragging = true;
        container.dragData = event;
        const localPosition = event.getLocalPosition(container);
        container.dragOffset = new PIXI.Point(localPosition.x * container.scale.x, localPosition.y * container.scale.y);
        container.dragOffset.x *= -1;
        container.dragOffset.y *= -1;
    };
