import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect } from 'react';
import setCanvasMainText from '../components/pixi/utils/set-canvas-main-text';
import { themes } from '../utils/constants/themes';

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

                const defaultTextSettings = getDefaultTextSettings(canvasName, 'main', selectedTheme);

                if (defaultTextSettings) {
                    setCanvasMainText(
                        canvasName,
                        canvasApps,
                        array,
                        position,
                        defaultTextSettings.style,
                        size,
                        defaultTextSettings.x,
                        defaultTextSettings.y
                    );
                }
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
