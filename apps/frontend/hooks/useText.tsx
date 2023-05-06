import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect, useState } from 'react';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import {getTextSettings} from "../components/pixi/utils/text/getTextSettings";
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";
import {getFilteredTextArrays} from "../components/pixi/utils/text/getFilteredTextArrays";

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

    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentHookId, setCurrentHookId] = useState(null);

    useEffect(() => {
        setCurrentReviewId(reviews[reviewPosition - 1]?._id?.toString() || null);
        setCurrentHookId(null);
    }, [reviewPosition, reviews]);

    useEffect(() => {
        const filteredHooks = hooks.filter(hook => hook.reviewId === currentReviewId);
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id?.toString() || null);
    }, [hookPosition, hooks, currentReviewId]);

    useEffect(() => {
        if (appRef.current) {
            const app = appRef.current;

            const { filteredHooks, filteredClaims, filteredCloses } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes);

            const textData = {
                hook: { array: filteredHooks, position: hookPosition },
                claim: { array: filteredClaims, position: claimPosition },
                close: { array: filteredCloses, position: closePosition },
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
        hookPosition,
        claimPosition,
        closePosition,
        reviews,
        reviewPosition,
        canvasName,
        appRef,
        selectedTheme,
        xRanges,
        yRanges,
        lineHeightMultipliers,
        hooks,
        claims,
        closes,
        currentReviewId,
        currentHookId,
    ]);
};

export default useText;
