import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';

export const useText = (app, canvasName) => {
    const { hooks, hookPosition, claims, claimPosition, reviews, reviewPosition, closes, closePosition } =
        useContext(CampaignContext);

    const { textStyles, updateTextStyles, hookApp, claimApp, closeApp, reviewApp } = useContext(PixiContext);

    const [textContainer, setTextContainer] = useState(null);

    const setTextForCanvas = (canvasApp, textArray, position, style) => {
        if (!canvasApp || !textContainer) return;

        console.log('textArray', textArray);

        const text = textArray[position - 1];
        const textObject = new PIXI.Text(text, style);

        textContainer.removeChildren(); // Remove any existing text objects
        textContainer.addChild(textObject); // Add the new text object to the text container
        canvasApp.render();
    };

    useEffect(() => {
        if (!app || !app.stage) return;

        const container = new PIXI.Container();
        app.stage.addChild(container);
        setTextContainer(container);

        return () => {
            app.stage.removeChild(container);
        };
    }, [app]);

    useEffect(() => {
        if (!textStyles.defaultStyle) {
            // Create a default style for text objects
            const defaultStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 'white',
            });
            updateTextStyles({ ...textStyles, defaultStyle });
        }

        switch (canvasName) {
            case 'hook':
                setTextForCanvas(hookApp, hooks, hookPosition, textStyles.defaultStyle);
                break;
            case 'claim':
                setTextForCanvas(claimApp, claims, claimPosition, textStyles.defaultStyle);
                break;
            case 'close':
                setTextForCanvas(closeApp, closes, closePosition, textStyles.defaultStyle);
                break;
            case 'review':
                setTextForCanvas(reviewApp, reviews, reviewPosition, textStyles.defaultStyle);
                break;
            default:
                break;
        }
    }, [
        hookApp,
        hooks,
        hookPosition,
        claimApp,
        claims,
        claimPosition,
        closeApp,
        closes,
        closePosition,
        reviewApp,
        reviews,
        reviewPosition,
        textStyles,
        updateTextStyles,
        canvasName,
        textContainer,
    ]);
};

export default useText;
