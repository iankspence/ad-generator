import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';

export const useText = (appRef, canvasName) => {
    const { hooks, hookPosition, claims, claimPosition, reviews, reviewPosition, closes, closePosition } =
        useContext(CampaignContext);

    const { textStyles, updateTextStyles, canvasApps } = useContext(PixiContext);

    const setMainTextForCanvas = (canvasApp, textArray, position, style) => {
        if (!canvasApp || !canvasApp.stage) return;

        console.log('canvasApp', canvasApp);
        console.log('textArray', textArray);
        console.log('position', position);
        console.log('style', style);

        if (textLayerRef && textLayerRef.current) {
            canvasApp.stage.removeChild(textLayerRef.current);
        }

        let mainText = '';

        switch (canvasName) {
            case 'hook':
                if (textArray.length > 0) {
                    mainText = textArray[hookPosition - 1].hookText;
                }
                break;
            case 'claim':
                if (textArray.length > 0) {
                    mainText = textArray[claimPosition - 1].claimText;
                }
                break;
            case 'review':
                if (textArray.length > 0) {
                    mainText = textArray[reviewPosition - 1].reviewText;
                }
                break;
            case 'close':
                if (textArray.length > 0) {
                    mainText = textArray[closePosition - 1].closeText;
                }
                break;
            default:
                break;
        }

        if (!mainText) return;
        const mainTextObject = new PIXI.Text(mainText, style);
        mainTextObject.x = canvasApp.view.width / 2 - mainTextObject.width / 2;
        mainTextObject.y = canvasApp.view.height / 1.1 - mainTextObject.height / 2;
        mainTextObject.zIndex = 3;

        canvasApp.stage.addChild(mainTextObject);
        canvasApp.render();

        // if (textLayerRef) {
        //     textLayerRef.current = mainTextObject;
        // }
    };

    useEffect(() => {
        if (!textStyles.defaultStyle) {
            // Create a default style for text objects
            const defaultStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 'white',
                wordWrap: true,
                wordWrapWidth: 200,
                align: 'center',
                lineHeight: 30,
            });
            updateTextStyles({ ...textStyles, defaultStyle });
        }

        switch (canvasName) {
            case 'hook':
                setMainTextForCanvas(canvasApps['hook'], hooks, hookPosition, textStyles.defaultStyle);
                break;
            case 'claim':
                setMainTextForCanvas(canvasApps['claim'], claims, claimPosition, textStyles.defaultStyle);
                break;
            case 'close':
                setMainTextForCanvas(canvasApps['close'], closes, closePosition, textStyles.defaultStyle);
                break;
            case 'review':
                setMainTextForCanvas(canvasApps['review'], reviews, reviewPosition, textStyles.defaultStyle);
                break;
            default:
                break;
        }
    }, [
        canvasApps,
        hooks,
        hookPosition,
        claims,
        claimPosition,
        closes,
        closePosition,
        reviews,
        reviewPosition,
        textStyles,
        updateTextStyles,
        canvasName,
    ]);
};

export default useText;
