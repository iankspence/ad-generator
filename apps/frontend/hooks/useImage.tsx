import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

export const useImage = (appRef, imageUrl, canvasName) => {
    useEffect(() => {
        if (!appRef?.current || !imageUrl) return;

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
        container.name = canvasName;

        return () => {
            if (container) container.removeChild(image);
            if (app.stage) app.stage.removeChild(container);
        };
    }, [imageUrl, appRef]);
};
