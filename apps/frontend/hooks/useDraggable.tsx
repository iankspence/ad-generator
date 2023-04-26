import { onDragEnd } from '../callbacks/onDragEnd';
import { onDragMove } from '../callbacks/onDragMove';
import { onDragStart } from '../callbacks/onDragStart';
import * as PIXI from 'pixi.js';
import { useEffect, useCallback, useState, MutableRefObject } from 'react';

export interface CustomInteractionData {
    getLocalPosition(displayObject: PIXI.DisplayObject, point?: PIXI.Point, globalPos?: PIXI.Point): PIXI.Point;
}

export interface DraggableContainer extends PIXI.Container {
    dragging: boolean;
    dragData: PIXI.FederatedPointerEvent | null;
    dragOffset: PIXI.Point | null;
}
const useDraggable = (appRef: MutableRefObject<PIXI.Application | null>, container: DraggableContainer | null) => {
    const handleDragStart = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragStart(container)(event),
        [container],
    );
    const handleDragMove = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragMove(container)(event),
        [container],
    );
    const handleDragEnd = useCallback((event: PIXI.FederatedPointerEvent) => onDragEnd(container)(event), [container]);

    useEffect(() => {
        if (!appRef || !appRef.current || !container) return;

        const app = appRef.current;

        app.stage.sortableChildren = true;
        container.eventMode = 'static';
        container
            .on('pointerdown', handleDragStart)
            .on('pointerup', handleDragEnd)
            .on('pointerupoutside', handleDragEnd)
            .on('pointermove', handleDragMove);

        return () => {
            container.off('pointerdown', handleDragStart);
            container.off('pointerup', handleDragEnd);
            container.off('pointerupoutside', handleDragEnd);
            container.off('pointermove', handleDragMove);
        };
    }, [appRef, container, handleDragStart, handleDragEnd, handleDragMove]);

    return container;
};

export default useDraggable;
