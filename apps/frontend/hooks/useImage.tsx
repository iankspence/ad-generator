import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';

export const useImage = (appRef, imageUrl, canvasName) => {
    const [container, setContainer] = useState(null);
    const {
        updateHookImageContainer,
        updateClaimImageContainer,
        updateCloseImageContainer,
        updateReviewImageContainer,
    } = useContext(PixiContext);

    useEffect(() => {
        if (!appRef || !appRef.current || !imageUrl) return;

        const app = appRef.current;

        const container = new PIXI.Container();
        app.stage.addChild(container);

        const image = PIXI.Sprite.from(imageUrl);
        image.anchor.set(0.5);

        image.x = app.screen.width / 2;
        image.y = app.screen.height / 2;
        image.eventMode = 'static';
        image.cursor = 'pointer';

        image.zIndex = 0;

        container.addChild(image);

        setContainer(container);

        switch (canvasName) {
            case 'hook':
                updateHookImageContainer(container);
                break;
            case 'claim':
                updateClaimImageContainer(container);
                break;
            case 'close':
                updateCloseImageContainer(container);
                break;
            case 'review':
                updateReviewImageContainer(container);
                break;
            default:
                break;
        }

        return () => {
            if (container) container.removeChild(image);
            if (app.stage) app.stage.removeChild(container);
        };
    }, [imageUrl, appRef]);

    return container;
};
