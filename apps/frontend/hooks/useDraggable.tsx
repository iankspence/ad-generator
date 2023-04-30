import { onDragEnd } from '../callbacks/onDragEnd';
import { onDragMove } from '../callbacks/onDragMove';
import { onDragStart } from '../callbacks/onDragStart';
import * as PIXI from 'pixi.js';
import {useEffect, useCallback, MutableRefObject, useContext} from 'react';
import {PixiContext} from "../contexts/PixiContext";
import {findImageContainer} from "../components/pixi/utils/findImageContainer";


export interface DraggableContainer extends PIXI.Container {
    dragging: boolean;
    dragData: PIXI.FederatedPointerEvent | null;
    dragOffset: PIXI.Point | null;
}
const useDraggable = (app, canvasName: string) => {
    const { canvasApps, eventEmitter } = useContext(PixiContext);

    const container = findImageContainer(canvasApps, canvasName) as DraggableContainer;

    const handleDragStart = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragStart(container, eventEmitter)(event),
        [container, eventEmitter],
    );
    const handleDragMove = useCallback(
        (event: PIXI.FederatedPointerEvent) => onDragMove(container, eventEmitter)(event),
        [container, eventEmitter],
    );
    const handleDragEnd = useCallback((event: PIXI.FederatedPointerEvent) => onDragEnd(container, eventEmitter)(event), [container, eventEmitter]);

    useEffect(() => {
        if (!app || !container) return;

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
    }, [app, container, handleDragStart, handleDragEnd, handleDragMove]);

    return container;
};

export default useDraggable;
