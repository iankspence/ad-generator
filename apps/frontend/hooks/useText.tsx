import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect } from 'react';
import { themes } from '../utils/constants/themes';
import setCanvasText from "../components/pixi/utils/setCanvasText";

export const useText = (appRef, canvasName, size) => {
    // const { updateCanvasApp, canvasApps, selectedThemeId } = useContext(PixiContext);
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

    const { updateCanvasApp, canvasApps, selectedThemeId } = useContext(PixiContext);
    const getSelectedTheme = (selectedThemeId) => {
        return themes.find((theme) => theme.id === selectedThemeId);
    };
    const selectedTheme = getSelectedTheme(selectedThemeId); // Get the selected theme object
    const getDefaultTextSettings = (canvasName, textName, selectedTheme) => {
        const textDefaults = Object.values(selectedTheme.settings)
            .flatMap(setting => Object.values(setting))
            .find(text => text.canvasName === canvasName && text.textName === textName);
        return textDefaults ? { style: textDefaults.style, x: textDefaults.x, y: textDefaults.y } : null;
    };

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

                const getTextNames = (canvasName) => {
                    if (canvasName === 'hook' || canvasName === 'review') {
                        return ['main', 'author', 'date', 'source'];
                    } else if (canvasName === 'claim' || canvasName === 'close') {
                        return ['main'];
                    }
                    return [];
                };
                const textNames = getTextNames(canvasName);
                textNames.forEach(textName => {
                    const defaultTextSettings = getDefaultTextSettings(canvasName, textName, selectedTheme);

                    if (defaultTextSettings) {
                        setCanvasText(
                            canvasName,
                            canvasApps,
                            textName,
                            array,
                            position,
                            reviews,
                            reviewPosition,
                            defaultTextSettings.style,
                            size,
                            defaultTextSettings.x,
                            defaultTextSettings.y
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
    ]);
};

export default useText;
