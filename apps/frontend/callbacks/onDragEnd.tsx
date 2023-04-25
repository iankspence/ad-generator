import { DraggableContainer } from '../hooks/useDraggable';
import * as PIXI from 'pixi.js';
import { MutableRefObject } from 'react';

export const onDragEnd =
    (containerRef: MutableRefObject<DraggableContainer | null>) =>
    (event: PIXI.FederatedPointerEvent): void => {
        const container = containerRef.current;
        if (!container || !container.dragging) return;

        container.alpha = 1;
        container.dragging = false;
    };
