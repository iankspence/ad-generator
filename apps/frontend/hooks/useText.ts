import { CampaignContext } from '../contexts/CampaignContext';
import { PixiContext } from '../contexts/PixiContext';
import { useContext, useEffect, useState } from 'react';
import setCanvasText from "../components/pixi/utils/text/setCanvasText";
import {getTextSettings} from "../components/pixi/utils/text/getTextSettings";
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";
import {getFilteredTextArrays} from "../components/pixi/utils/text/getFilteredTextArrays";
import {getAdsByAccountId} from "../utils/api";
import UserContext from '../contexts/UserContext';
import {useRouter} from "next/router";

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

    const router = useRouter();


    const { selectedThemeId, xRanges, yRanges, lineHeightMultipliers, updateLineHeightMultipliers, canvasApps, editAd, backgroundImageLocation } = useContext(PixiContext);

    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentReviewTexts, setCurrentReviewTexts] = useState(['', '']);
    const [currentHookId, setCurrentHookId] = useState(null);
    const [currentHookTexts, setCurrentHookTexts] = useState(['', '']);
    const [currentClaimTexts, setCurrentClaimTexts] = useState(['', '']);
    const [currentCloseTexts, setCurrentCloseTexts] = useState(['', '']);
    const [currentCopyTexts, setCurrentCopyTexts] = useState(['', '']);

    const [ads, setAds] = useState(null);
    const { account } = useContext(UserContext);

    useEffect(() => {
        if ( !appRef.current || !reviews || !reviewPosition || !hooks || !hookPosition || !claims || !closes || !copies || !selectedAudiencePosition ) return;

        const { filteredReviews } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        if (!filteredReviews) return;
        setCurrentReviewId(filteredReviews[reviewPosition - 1]?._id?.toString() || null);
        setCurrentReviewTexts([filteredReviews[reviewPosition - 1]?.reviewText, filteredReviews[reviewPosition - 1]?.reviewTextEdited])
        setCurrentHookId(null);
    }, [ selectedAudiencePosition, reviewPosition, reviews ]);

    useEffect(() => {
        if ( !appRef.current || !reviews || !reviewPosition || !hooks || !hookPosition || !claims || !closes || !copies || !selectedAudiencePosition ) return;

        const {filteredHooks } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        if (!filteredHooks) return;
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id?.toString() || null);
        setCurrentHookTexts([filteredHooks[hookPosition - 1]?.hookText, filteredHooks[hookPosition - 1]?.hookTextEdited ])
    }, [ selectedAudiencePosition, hookPosition, hooks ]);

    useEffect(() => {
        if ( !appRef.current || !reviews || !reviewPosition || !hooks || !hookPosition || !claims || !closes || !copies || !selectedAudiencePosition ) return;

        const { filteredClaims } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        if (!filteredClaims) return;
        setCurrentClaimTexts([filteredClaims[claimPosition - 1]?.claimText, filteredClaims[claimPosition - 1]?.claimTextEdited ])
    }, [ selectedAudiencePosition, claimPosition, claims ]);

    useEffect(() => {
        if ( !appRef.current || !reviews || !reviewPosition || !hooks || !hookPosition || !claims || !closes || !copies || !selectedAudiencePosition ) return;

        const { filteredCloses } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        if (!filteredCloses) return;
        setCurrentCloseTexts([filteredCloses[closePosition - 1]?.closeText, filteredCloses[closePosition - 1]?.closeTextEdited ])
    }, [ selectedAudiencePosition, closePosition, closes ]);

    useEffect(() => {
        if ( !appRef.current || !reviews || !reviewPosition || !hooks || !hookPosition || !claims || !closes || !copies || !selectedAudiencePosition ) return;

        const { filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        if (!filteredCopies) return;
        setCurrentCopyTexts([filteredCopies[copyPosition - 1]?.copyText, filteredCopies[copyPosition - 1]?.copyTextEdited ])
    }, [ selectedAudiencePosition, copyPosition, copies ]);

    useEffect(() => {
        if (!account?._id) return;
        const fetchAds = async () => {
            const ads = await getAdsByAccountId(account._id);
            setAds(ads);
        };
        fetchAds();
    }, [account?._id, editAd, router.pathname]);

    useEffect(() => {
        // console.log('checking use effect before')
        if (!appRef.current || !primaryColor || !secondaryColor || !hooks || !hookPosition || !claims || !claimPosition || !reviews || !reviewPosition || !closes || !closePosition || !copies || !copyPosition || !selectedThemeId  ) return;
        // console.log('checking use effect after')
        const { filteredReviews, filteredHooks, filteredClaims, filteredCloses } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

        console.log('selectedThemeId: ', selectedThemeId)
        // console.log('useText after check', appRef.current)
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

                let mainTextSettings = getTextSettings(canvasName, 'main', selectedThemeId, app, xRanges, yRanges, primaryColor, secondaryColor);
                let authorTextSettings = getTextSettings(canvasName, 'author', selectedThemeId, app, xRanges, yRanges, primaryColor, secondaryColor);

                // If an ad is currently being edited, override the text settings with those stored in the ad
                if (editAd && ads) {
                    const ad = ads.find(ad => ad._id.toString() === editAd);
                    if (ad) {

                        const attribute = ad.userControlledAttributes.find(attribute => attribute.canvasName === canvasName);
                        if (attribute) {
                            attribute.textControls.forEach(tc => {
                                if (tc.name === 'main') {
                                    mainTextSettings = { ...mainTextSettings, style: tc.style };
                                }
                                if (tc.name === 'author') {
                                    authorTextSettings = { ...authorTextSettings, style: tc.style };
                                }
                            });
                        }
                    }
                }

                setCanvasText(
                    canvasName,
                    appRef,
                    array,
                    position,
                    reviewPosition,
                    mainTextSettings,
                    authorTextSettings,
                    size,
                    xRange,
                    yRange,
                    lineHeightMultipliers,
                    filteredReviews,
                );
            } else {
                console.warn(`No default text settings found for canvasName=${canvasName}`);
            }
        }
    }, [
        currentHookId,
        currentHookTexts,
        hookPosition,
        currentReviewId,
        currentReviewTexts,
        reviewPosition,
        currentClaimTexts,
        claimPosition,
        currentCloseTexts,
        closePosition,
        currentCopyTexts,
        copyPosition,
        xRanges,
        yRanges,
        lineHeightMultipliers,
        selectedThemeId,
        backgroundImageLocation,
        editAd,
    ]);
};

export default useText;
