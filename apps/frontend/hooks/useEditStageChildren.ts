import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixiContext } from "../contexts/PixiContext";
import {getAdsByAccountId, getCardsByAccountId} from "../utils/api";
import UserContext from "../contexts/UserContext";
import { UserControlledAttribute} from "@monorepo/type";
import {CampaignContext} from "../contexts/CampaignContext";

const useEditStageChildren = (appRef, canvasName) => {
    const { editAdId, updateBackgroundImageLocation, updateUserControlledAttributes,  } = useContext(PixiContext);
    const {updateSelectedAudiencePosition, updateReviewPosition, updateHookPosition, updateClaimPosition, updateClosePosition } = useContext(CampaignContext)
    const { account } = useContext(UserContext);
    const router = useRouter();
    const [ads, setAds] = useState([]);
    const [cards, setCards] = useState([]);

    const getUserControlledAttributes = (ads, editAdId, canvasName): null | UserControlledAttribute => {
        const ad = ads.find(ad => ad._id.toString() === editAdId);
        if (!ad) return null;

        return ad.userControlledAttributes.find(attribute => attribute.canvasName === canvasName);
    };

    const getBestFitAudience = (ads, editAdId) => {
        if (!editAdId || !ads) return null;
        const ad = ads.find(ad => ad._id.toString() === editAdId);
        if (!ad) return null;

        return ad.bestFitAudience
    };

    const updateTextPositions = (ads, editAdId) => {
        const ad = ads.find(ad => ad._id.toString() === editAdId);
        if (!ad) return null;

        const hookPosition = ad.filteredTextPositions.find(position => position.canvasName === 'hook').position;
        updateHookPosition(hookPosition);

        const claimPosition = ad.filteredTextPositions.find(position => position.canvasName === 'claim').position;
        updateClaimPosition(claimPosition);

        const reviewPosition = ad.filteredTextPositions.find(position => position.canvasName === 'review').position;
        updateReviewPosition(reviewPosition);

        const closePosition = ad.filteredTextPositions.find(position => position.canvasName === 'close').position;
        updateClosePosition(closePosition);
    }

    useEffect(() => {
        if (!account?._id) return;
        const fetchAds = async () => {
            const ads = await getAdsByAccountId(account._id);
            setAds(ads);
        };
        fetchAds();
    }, [router.pathname, account?._id]);

    useEffect(() => {
        if (!account?._id) return;
        const fetchCards = async () => {
            const cards = await getCardsByAccountId(account._id);
            setCards(cards);
        }
        fetchCards();
    }, [router.pathname, account?._id]);

    useEffect(() => {
        if (!appRef.current || !editAdId || !ads) return;

        const canvasUserControlledAttributes = getUserControlledAttributes(ads, editAdId, canvasName);
        if (!canvasUserControlledAttributes) return;

        updateUserControlledAttributes(prevUserControlledAttributes => {
            let updatedAttributes: UserControlledAttribute[];

            const existingIndex = prevUserControlledAttributes.findIndex(attribute => attribute.canvasName === canvasName);
            if (existingIndex > -1) {
                // Replace existing attributes for this canvas
                updatedAttributes = [...prevUserControlledAttributes];
                updatedAttributes[existingIndex] = canvasUserControlledAttributes;
            } else {
                // Append new attributes for this canvas
                updatedAttributes = [...prevUserControlledAttributes, canvasUserControlledAttributes];
            }

            // Only update the background image location if there are 4 userControlledAttributes
            if (updatedAttributes.length === 4) {
                updateBackgroundImageLocation(canvasUserControlledAttributes.imageControls.location); // trigger useImage
            }

            return updatedAttributes;
        });

        updateTextPositions(ads, editAdId)
        updateSelectedAudiencePosition(Number(getBestFitAudience(ads, editAdId)));

    }, [router.pathname, editAdId, ads, ]);
};

export default useEditStageChildren;
