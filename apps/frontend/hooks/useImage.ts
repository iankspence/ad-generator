import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

export const useImage = (appRef, backgroundImageLocation, canvasName) => {
    useEffect(() => {
        if (!appRef?.current || !backgroundImageLocation) return;

        const app = appRef.current;

        const container = new PIXI.Container();
        container.name = canvasName;
        app.stage.addChild(container);

        const image = PIXI.Sprite.from(backgroundImageLocation);

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

    }, [backgroundImageLocation, appRef]);
};
