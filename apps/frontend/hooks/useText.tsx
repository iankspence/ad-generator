import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect } from 'react';
import { themes } from '../utils/constants/themes';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import {getDefaultTextSettings} from "../components/pixi/utils/text/getDefaultTextSettings";
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";
import {getTextNamesForCanvas} from "../components/pixi/utils/text/getTextNames";

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

    const { updateCanvasApp, canvasApps, selectedThemeId, xRanges, yRanges, lineHeightMultipliers } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);

    useEffect(() => {
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

                const textNames = getTextNamesForCanvas(canvasName);
                const xRange = xRanges[canvasName];
                const yRange = yRanges[canvasName];

                textNames.forEach(textName => {
                    const defaultTextSettings = getDefaultTextSettings(canvasName, textName, selectedTheme, canvasApps[canvasName], xRanges, yRanges);
                    const mainTextSettings = getDefaultTextSettings(canvasName, 'main', selectedTheme, canvasApps[canvasName], xRanges, yRanges);

                    if (defaultTextSettings) {
                        setCanvasText(
                            canvasName,
                            canvasApps,
                            array,
                            position,
                            reviews,
                            reviewPosition,
                            mainTextSettings.style,
                            defaultTextSettings.style,
                            size,
                            xRange,
                            yRange,
                            lineHeightMultipliers,
                        );
                    } else {
                        console.warn(`No default text settings found for canvasName=${canvasName}, textName=${textName}`);
                    }
                });
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
        canvasName,
        appRef,
        selectedTheme,
        xRanges,
        yRanges,
        lineHeightMultipliers,
    ]);
};

export default useText;
