import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect } from 'react';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import {getTextSettings} from "../components/pixi/utils/text/getTextSettings";
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";

export const useText = (appRef, canvasName, size) => {
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

    const { selectedThemeId, xRanges, yRanges, lineHeightMultipliers } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);

    useEffect(() => {
        if (appRef.current) {
            const app = appRef.current;

            const textData = {
                hook: { array: hooks, position: hookPosition },
                claim: { array: claims, position: claimPosition },
                close: { array: closes, position: closePosition },
                review: { array: reviews, position: reviewPosition },
            };

            const { array, position } = textData[canvasName] || {};
            if (array && position) {

                const xRange = xRanges[canvasName];
                const yRange = yRanges[canvasName];

                const mainTextSettings = getTextSettings(canvasName, 'main', selectedTheme, app, xRanges, yRanges);
                const authorTextSettings = getTextSettings(canvasName, 'author', selectedTheme, app, xRanges, yRanges);

                setCanvasText(
                    canvasName,
                    appRef,
                    array,
                    position,
                    reviews,
                    reviewPosition,
                    mainTextSettings,
                    authorTextSettings,
                    size,
                    xRange,
                    yRange,
                    lineHeightMultipliers,
                );
            } else {
                console.warn(`No default text settings found for canvasName=${canvasName}`);
            }
        }
    }, [
        hooks,
        hookPosition,
        claims,
        claimPosition,
        closes,
        closePosition,
        reviews,
        reviewPosition,
        canvasName,
        appRef,
        selectedTheme,
        xRanges,
        yRanges,
        lineHeightMultipliers,
    ]);
};

export default useText;
