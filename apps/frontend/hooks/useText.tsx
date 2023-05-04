import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect } from 'react';
import { themes } from '../utils/constants/themes';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import findTextObject from "../components/pixi/utils/text/findTextObject";

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

    const getSelectedTheme = (selectedThemeId) => {
        return themes.find((theme) => theme.id === selectedThemeId);
    };

    const getDefaultTextSettings = (canvasName, textName, selectedTheme, canvasApp) => {
        const existingTextObject = findTextObject(canvasApp, `${canvasName}-${textName}`);
        if (existingTextObject) {
            return {
                style: existingTextObject.style,
                x: existingTextObject.x,
                y: existingTextObject.y,
                xRange: xRanges[canvasName],
                yRange: yRanges[canvasName],
            };
        }

        const textDefaults = Object.values(selectedTheme.settings)
            .flatMap(setting => Object.values(setting))
            .find(text => text.canvasName === canvasName && text.textName === textName);
        return textDefaults ? { style: textDefaults.style, x: textDefaults.x, y: textDefaults.y, xRange: textDefaults.xRange, yRange: textDefaults.yRange  } : null;
    };

    const getTextNames = (canvasName) => {
        if (canvasName === 'hook' || canvasName === 'review') {
            return ['main', 'author'];
        } else if (canvasName === 'claim' || canvasName === 'close') {
            return ['main'];
        }
        return [];
    };

    const selectedTheme = getSelectedTheme(selectedThemeId); // Get the selected theme object

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

                const textNames = getTextNames(canvasName);
                const xRange = xRanges[canvasName];
                const yRange = yRanges[canvasName];

                textNames.forEach(textName => {
                    const defaultTextSettings = getDefaultTextSettings(canvasName, textName, selectedTheme, canvasApps[canvasName]);
                    const mainTextSettings = getDefaultTextSettings(canvasName, 'main', selectedTheme, canvasApps[canvasName]);

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
