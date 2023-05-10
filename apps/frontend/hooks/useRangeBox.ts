import { useContext, useEffect, useState } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';

export const useRangeBox = (appRef, canvasName) => {
    const { activeCanvases, xRanges, yRanges, displayTextBox } = useContext(PixiContext);
    const [previewRect, setPreviewRect] = useState(null);

    const xRange = xRanges[canvasName];
    const yRange = yRanges[canvasName];

    useEffect(() => {
        if (!appRef?.current || !activeCanvases[canvasName] || !displayTextBox) return;

        const app = appRef.current;

        if (previewRect) {
            app.stage.removeChild(previewRect);
        }

        const rect = new PIXI.Graphics();
        rect.lineStyle(1, 0x000000, 1);
        rect.drawRect(xRange[0], yRange[0], xRange[1] - xRange[0], yRange[1] - yRange[0]);
        rect.zIndex = 1000;

        app.stage.addChild(rect);
        setPreviewRect(rect);

        return () => {
            if (app.stage) app.stage.removeChild(rect);
        };
    }, [displayTextBox, xRange, yRange]);
};
