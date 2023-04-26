import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';

export const useImage = (appRef, imageUrl) => {
    const [container, setContainer] = useState(null);

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

        return () => {
            container.removeChild(image);
            app.stage.removeChild(container);
        };
    }, [imageUrl, appRef]);

    return container;
};
