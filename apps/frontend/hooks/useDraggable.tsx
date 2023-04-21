import * as PIXI from 'pixi.js';
import { useEffect, useCallback, useRef, useState } from 'react';

const useDraggable = (appRef, imageUrl) => {
    const imageRef = useRef(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const imagePositionRef = useRef(imagePosition);

    const onDragStart = useCallback(
        (event) => {
            const app = appRef.current;
            if (!app) return;

            const image = imageRef.current;
            if (!image) return;

            image.alpha = 0.5;
            image.dragging = true;
            image.dragData = event.data;
            image.dragOffset = event.data.getLocalPosition(image);
            image.dragOffset.x *= -1;
            image.dragOffset.y *= -1;

            imagePositionRef.current = { x: image.x, y: image.y };
        },
        [appRef],
    );

    const onDragMove = useCallback((event) => {
        const image = imageRef.current;
        if (!image) return;

        if (image.dragging) {
            const newPosition = event.data.getLocalPosition(image.parent);

            newPosition.x += image.dragOffset.x;
            newPosition.y += image.dragOffset.y;

            image.x = newPosition.x;
            image.y = newPosition.y;

            imagePositionRef.current = { x: newPosition.x, y: newPosition.y };
        } else {
            return;
        }
    }, []);

    const onDragEnd = useCallback((event) => {
        const image = imageRef.current;
        if (!image || !image.dragging) return;

        image.alpha = 1;
        image.dragging = false;
    }, []);

    useEffect(() => {
        const app = appRef.current;
        if (app && imageUrl) {
            if (!imageRef.current) {
                const image = PIXI.Sprite.from(imageUrl);
                image.anchor.set(0.5);

                image.x = app.screen.width / 2 + imagePosition.x;
                image.y = app.screen.height / 2 + imagePosition.y;
                image.interactive = true;
                image.cursor = 'pointer';

                image.on('pointerdown', onDragStart);
                image.on('pointerup', onDragEnd);
                image.on('pointerupoutside', onDragEnd);
                image.on('pointermove', onDragMove);
                app.stage.addChild(image);
                imageRef.current = image;
            }
        }

        return () => {
            const app = appRef.current;
            const image = imageRef.current;

            if (app && image) {
                image.off('pointerdown', onDragStart);
                image.off('pointerup', onDragEnd);
                image.off('pointerupoutside', onDragEnd);
                image.off('pointermove', onDragMove);

                app.stage.removeChild(image);
                imageRef.current = null;
            }
        };
    }, [appRef, imageUrl, imagePosition, onDragStart, onDragEnd, onDragMove]);

    return imagePosition;
};

export default useDraggable;
