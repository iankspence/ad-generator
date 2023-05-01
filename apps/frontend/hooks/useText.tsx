import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import * as PIXI from 'pixi.js';
import { useContext, useEffect} from 'react';
import setCanvasMainText from '../components/pixi/utils/set-canvas-main-text';

export const useText = (appRef, canvasName) => {
    const {
        hooks,
        hookPosition,
        claims,
        claimPosition,
        reviews,
        reviewPosition,
        closes,
        closePosition,
    } = useContext(CampaignContext);

    const { updateCanvasApp, textStyles, updateTextStyles, canvasApps } = useContext(PixiContext);

    useEffect(() => {

        if (!textStyles.defaultStyle) {
            const defaultStyle = new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 24,
                fill: "white",
                wordWrap: true,
                wordWrapWidth: 200,
                align: "center",
                lineHeight: 30,
            });
            updateTextStyles({ ...textStyles, defaultStyle });
        }

        if (appRef.current) {
            const currentApp = appRef.current;

            if (!canvasApps[canvasName]) {
                updateCanvasApp(canvasName, currentApp);
            }

            const textData = {
                hook: { array: hooks, position: hookPosition },
                claim: { array: claims, position: claimPosition },
                close: { array: closes, position: closePosition },
                review: { array: reviews, position: reviewPosition },
            };

            const { array, position } = textData[canvasName] || {};

            if (array && position) {
                setCanvasMainText(
                    canvasName,
                    canvasApps,
                    array,
                    position,
                    textStyles.defaultStyle
                );
            }
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
        appRef,
        updateCanvasApp,
    ]);
};

export default useText;
