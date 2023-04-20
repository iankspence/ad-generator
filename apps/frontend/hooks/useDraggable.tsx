import * as PIXI from 'pixi.js';
import { useEffect, useCallback } from 'react';

const useDraggable = (appRef, imageUrl) => {
    const onDragStart = useCallback(
        (event) => {
            const app = appRef.current;
            if (!app) return;

            const dragTarget = event.currentTarget;
            dragTarget.alpha = 0.5;
            dragTarget.dragging = true;
            dragTarget.dragData = event.data;
        },
        [appRef],
    );

    const onDragEnd = useCallback((event) => {
        const dragTarget = event.currentTarget;
        dragTarget.alpha = 1;
        dragTarget.dragging = false;
        dragTarget.dragData = null;
    }, []);

    const onDragMove = useCallback((event) => {
        const dragTarget = event.currentTarget;
        if (dragTarget && dragTarget.dragging) {
            const newPosition = dragTarget.dragData.getLocalPosition(dragTarget.parent);
            dragTarget.x = newPosition.x;
            dragTarget.y = newPosition.y;
        }
    }, []);

    useEffect(() => {
        const app = appRef.current;
        if (app && imageUrl) {
            const image = PIXI.Sprite.from(imageUrl);
            image.anchor.set(0.5);
            image.x = app.screen.width / 2;
            image.y = app.screen.height / 2;
            image.interactive = true;
            image.cursor = 'pointer';

            image.on('pointerdown', onDragStart);
            image.on('pointerup', onDragEnd);
            image.on('pointerupoutside', onDragEnd);
            image.on('pointermove', onDragMove);

            app.stage.addChild(image);
        }
    }, [appRef, imageUrl, onDragStart, onDragEnd, onDragMove]);
};

export default useDraggable;
