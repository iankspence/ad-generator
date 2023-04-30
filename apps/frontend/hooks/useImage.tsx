import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

export const useImage = (app, imageUrl) => {
    useEffect(() => {
        if (!app || !app?.stage || !imageUrl) return;

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

        return () => {
            if (container) container.removeChild(image);
            if (app.stage) app.stage.removeChild(container);
        };
    }, [imageUrl, app]);
};
