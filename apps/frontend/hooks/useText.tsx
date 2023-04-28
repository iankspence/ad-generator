import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';

export const useText = (app, canvasName, textLayerRef) => {
    const { hooks, hookPosition, claims, claimPosition, reviews, reviewPosition, closes, closePosition } =
        useContext(CampaignContext);

    const { textStyles, updateTextStyles, hookApp, claimApp, closeApp, reviewApp } = useContext(PixiContext);

    const setTextForCanvas = (canvasApp, textArray, position, style) => {
        if (!canvasApp || !canvasApp.stage) return;

        console.log('canvasApp', canvasApp);
        console.log('textArray', textArray);
        console.log('position', position);
        console.log('style', style);

        let text = '';

        switch (canvasName) {
            case 'hook':
                if (textArray.length > 0) {
                    text = textArray[0].hookText;
                }
                break;
            case 'claim':
                if (textArray.length > 0) {
                    text = textArray[0].claimText;
                }
                break;
            case 'close':
                if (textArray.length > 0) {
                    text = textArray[0].closeText;
                }
                break;
            case 'review':
                if (textArray.length > 0) {
                    text = textArray[0].reviewText;
                }
                break;
        }

        // const text = textArray[position - 1]?.content;
        if (!text) return;
        const textObject = new PIXI.Text(text, style);
        textObject.x = canvasApp.view.width / 2 - textObject.width / 2;
        textObject.y = canvasApp.view.height / 2 - textObject.height / 2;

        canvasApp.stage.addChild(textObject);
        canvasApp.render();

        if (textLayerRef) {
            textLayerRef.current = textObject;
        }
    };

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
    ]);
};

export default useText;
