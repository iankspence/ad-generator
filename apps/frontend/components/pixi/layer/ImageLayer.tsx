import useDraggable, { DraggableContainer } from '../../../hooks/useDraggable';
import useZoom from '../../../hooks/useZoom';
import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

interface ImageLayerProps {
    appRef: React.MutableRefObject<any>;
    imageUrl: string;
    children?: React.ReactNode;
}

const ImageLayer: React.FC<ImageLayerProps> = ({ appRef, imageUrl, children = null }) => {
    const containerRef = useRef<DraggableContainer | null>(null);

    useDraggable(appRef, imageUrl, containerRef);
    useZoom(appRef, containerRef);

    useEffect(() => {
        if (!appRef.current) return;
        const app = appRef.current;
        if (app && imageUrl) {
            if (!containerRef.current) {
                const container = new PIXI.Container();
                app.stage.addChild(container);
                containerRef.current = container as DraggableContainer;

                const image = PIXI.Sprite.from(imageUrl);
                image.anchor.set(0.5);

                image.x = app.screen.width / 2;
                image.y = app.screen.height / 2;
                image.eventMode = 'static';
                image.cursor = 'pointer';

                container.addChild(image);
            }
        }

        return () => {
            const app = appRef.current;
            if (app && containerRef.current) {
                app.stage.removeChild(containerRef.current);
                containerRef.current = null;
            }
        };
    }, [appRef, imageUrl]);

    return null;
};

export default ImageLayer;
