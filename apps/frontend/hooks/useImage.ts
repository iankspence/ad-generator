import * as PIXI from 'pixi.js';
import {useContext, useEffect } from 'react';
import { PixiContext } from '../contexts/PixiContext';

export const useImage = (appRef, canvasName) => {
    const { backgroundImageLocation, userControlledAttributes } = useContext(PixiContext);


    useEffect(() => {

        if (!appRef?.current || !backgroundImageLocation) return;

        console.log("useImage ", backgroundImageLocation);

        let localUserControlledAttributes;

        const app = appRef.current;

        const container = new PIXI.Container();
        container.name = `image-${canvasName}`;
        app.stage.addChild(container);

        const image = PIXI.Sprite.from(backgroundImageLocation);

        image.anchor.set(0.5);
        image.x = app.screen.width / 2;
        image.y = app.screen.height / 2;
        image.eventMode = 'static';
        image.cursor = 'pointer';
        image.zIndex = 0;
        container.addChild(image);

        console.log("useImage ", userControlledAttributes, canvasName)

        if (userControlledAttributes.length) {
            localUserControlledAttributes = userControlledAttributes.find(attribute => attribute.canvasName === canvasName);
            console.log('localUserControlledAttributes', localUserControlledAttributes)

            container.x = localUserControlledAttributes?.imageControls?.x || 0;
            container.y = localUserControlledAttributes?.imageControls?.y || 0;
            container.scale.x = localUserControlledAttributes?.imageControls?.scaleX || 1;
            container.scale.y = localUserControlledAttributes?.imageControls?.scaleY || 1;
        }

        return () => {
            if (container) container.removeChild(image);
            if (app.stage) app.stage.removeChild(container);
        };

    }, [backgroundImageLocation, appRef]);
};
