import { useState, useContext } from 'react';
import { PixiContext } from '../../contexts/PixiContext';
import UserContext from "../../contexts/UserContext";
import { CampaignContext } from "../../contexts/CampaignContext";
import { getFilteredTextArrays } from "../../components/ad-generator/utils/text/getFilteredTextArrays";
import { saveAllApps } from './utils/saveAllApps';

const useSave = (width = 1080, height = 1080) => {
    const [isLoading, setIsLoading] = useState(false);
    const { canvasApps, selectedThemeId, maskLocations, backgroundImageLocation, xRanges, yRanges, lineHeightMultipliers, editAd, updateShowFreezeEditAttributeButton, updateEditAd, maskThemeOverrides } = useContext(PixiContext);
    const { user, account } = useContext(UserContext);
    const { claims, claimPosition, hooks, hookPosition, reviews, reviewPosition, closes, closePosition, copies, copyPosition, selectedAudiencePosition } = useContext(CampaignContext);

    const { filteredReviews, filteredHooks, filteredClaims, filteredCloses, filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

    const save = async () => {
        await saveAllApps(
            width,
            height,
            isLoading,
            setIsLoading,
            canvasApps,
            account,
            backgroundImageLocation,
            xRanges,
            yRanges,
            lineHeightMultipliers,
            filteredHooks,
            filteredClaims,
            filteredReviews,
            filteredCloses,
            hookPosition,
            claimPosition,
            reviewPosition,
            closePosition,
            user,
            filteredCopies,
            copyPosition,
            selectedThemeId,
            maskLocations,
            editAd,
            updateShowFreezeEditAttributeButton,
            updateEditAd,
            maskThemeOverrides
        );
    };

    return { save, isLoading };
};

export default useSave;
