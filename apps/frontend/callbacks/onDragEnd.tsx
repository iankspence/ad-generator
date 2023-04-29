import { DraggableContainer } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';

export const onDragEnd =
    (container: DraggableContainer) =>
    (event: PIXI.FederatedPointerEvent): void => {
        if (!container || !container.dragging) return;

        container.alpha = 1;
        container.dragging = false;
    };
