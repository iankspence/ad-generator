import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect, useState } from 'react';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import {getTextSettings} from "../components/pixi/utils/text/getTextSettings";
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";
import {getFilteredTextArrays} from "../components/pixi/utils/text/getFilteredTextArrays";

export const useText = (appRef, canvasName, size, primaryColor, secondaryColor) => {
    const {
        hooks,
        hookPosition,
        claims,
        claimPosition,
        reviews,
        reviewPosition,
        closes,
        closePosition,
        copies,
        copyPosition,
        selectedAudiencePosition,
    } = useContext(CampaignContext);

    const { selectedThemeId, xRanges, yRanges, lineHeightMultipliers } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);

    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentReviewTexts, setCurrentReviewTexts] = useState(['', '']);
    const [currentHookId, setCurrentHookId] = useState(null);
    const [currentHookTexts, setCurrentHookTexts] = useState(['', '']);
    const [currentClaimTexts, setCurrentClaimTexts] = useState(['', '']);
    const [currentCloseTexts, setCurrentCloseTexts] = useState(['', '']);
    const [currentCopyTexts, setCurrentCopyTexts] = useState(['', '']);

    const { filteredReviews, filteredHooks, filteredClaims, filteredCloses, filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

    useEffect(() => {
        if (!filteredReviews) return;
        setCurrentReviewId(filteredReviews[reviewPosition - 1]?._id?.toString() || null);
        setCurrentReviewTexts([filteredReviews[reviewPosition - 1]?.reviewText, filteredReviews[reviewPosition - 1]?.reviewTextEdited])
        setCurrentHookId(null);
    }, [ selectedAudiencePosition, reviewPosition, reviews ]);

    useEffect(() => {
        if (!filteredHooks) return;
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id?.toString() || null);
        setCurrentHookTexts([filteredHooks[hookPosition - 1]?.hookText, filteredHooks[hookPosition - 1]?.hookTextEdited ])
    }, [ selectedAudiencePosition, hookPosition, hooks ]);

    useEffect(() => {
        if (!filteredClaims) return;
        setCurrentClaimTexts([filteredClaims[claimPosition - 1]?.claimText, filteredClaims[claimPosition - 1]?.claimTextEdited ])
    }, [ selectedAudiencePosition, claimPosition, claims ]);

    useEffect(() => {
        if (!filteredCloses) return;
        setCurrentCloseTexts([filteredCloses[closePosition - 1]?.closeText, filteredCloses[closePosition - 1]?.closeTextEdited ])
    }, [ selectedAudiencePosition, closePosition, closes ]);

    useEffect(() => {
        if (!filteredCopies) return;
        setCurrentCopyTexts([filteredCopies[copyPosition - 1]?.copyText, filteredCopies[copyPosition - 1]?.copyTextEdited ])
    }, [ selectedAudiencePosition, copyPosition, copies ]);

    useEffect(() => {
        if (!appRef.current || !primaryColor || !secondaryColor) return;

        if (appRef.current) {

            const app = appRef.current;

            const textData = {
                hook: { array: filteredHooks, position: hookPosition },
                claim: { array: filteredClaims, position: claimPosition },
                close: { array: filteredCloses, position: closePosition },
                review: { array: filteredReviews, position: reviewPosition },
            };

            const { array, position } = textData[canvasName] || {};
            if (array && position) {

                const xRange = xRanges[canvasName];
                const yRange = yRanges[canvasName];

                const mainTextSettings = getTextSettings(canvasName, 'main', selectedTheme, app, xRanges, yRanges, primaryColor, secondaryColor);
                const authorTextSettings = getTextSettings(canvasName, 'author', selectedTheme, app, xRanges, yRanges, primaryColor, secondaryColor);

                setCanvasText(
                    canvasName,
                    appRef,
                    array,
                    position,
                    filteredReviews,
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
        currentHookId,
        currentHookTexts,
        currentReviewId,
        currentReviewTexts,
        currentClaimTexts,
        currentCloseTexts,
        currentCopyTexts,
        xRanges,
        yRanges,
        lineHeightMultipliers,
        selectedThemeId
    ]);
};

export default useText;
