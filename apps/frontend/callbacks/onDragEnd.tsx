import { DraggableContainer } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragEnd =
    (container: DraggableContainer) =>
    (event: PIXI.FederatedPointerEvent): void => {
        if (!container || !container.dragging) return;

        container.alpha = 1;
        container.dragging = false;
    };
