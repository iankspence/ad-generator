import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixiContext } from "../contexts/PixiContext";
import {getAdsByAccountId, getCardsByAccountId} from "../utils/api";
import UserContext from "../contexts/UserContext";
import { UserControlledAttribute} from "@monorepo/type";
import {CampaignContext} from "../contexts/CampaignContext";
import * as PIXI from "pixi.js";

const useEditStageChildren = (appRef, canvasName) => {
    const { editAd, updateBackgroundImageLocation, updateUserControlledAttributes, updateRange, updateLineHeightMultipliers, lineHeightMultipliers, updateCanvasApp, canvasApps, selectedThemeId, updateSelectedThemeId, xRanges, yRanges, userControlledAttributes } = useContext(PixiContext);
    const {updateSelectedAudiencePosition, updateReviewPosition, updateHookPosition, updateClaimPosition, updateClosePosition } = useContext(CampaignContext)
    const { account } = useContext(UserContext);
    const router = useRouter();
    // const [ads, setAds] = useState([]);
    const [cards, setCards] = useState([]);

    const getUserControlledAttributes = (editAd, canvasName): null | UserControlledAttribute => {
        if (!editAd) return null;

        return editAd.userControlledAttributes.find(attribute => attribute.canvasName === canvasName);
    };


    const updateTextPositionsFromAd = (editAd) => {
        if (!editAd) return null;

        const hookPosition = editAd.filteredTextPositions.find(position => position.canvasName === 'hook').position;
        updateHookPosition(hookPosition);

        const claimPosition = editAd.filteredTextPositions.find(position => position.canvasName === 'claim').position;
        updateClaimPosition(claimPosition);

        const reviewPosition = editAd.filteredTextPositions.find(position => position.canvasName === 'review').position;
        updateReviewPosition(reviewPosition);

        const closePosition = editAd.filteredTextPositions.find(position => position.canvasName === 'close').position;
        updateClosePosition(closePosition);
    }

    const updateRangesFromAd = (editAd) => {
        if (!editAd) return null;

        editAd.xRanges.forEach((xRangeObj) => {
            const { canvasName, xRange } = xRangeObj;
            const yRangeObj = editAd.yRanges.find(yRangeObj => yRangeObj.canvasName === canvasName);
            if (!yRangeObj) return;
            const { yRange } = yRangeObj;

            updateRange(canvasName, xRange, yRange);
        });
    };

    const updateLineHeightMultipliersFromAd = (editAd) => {
        if (!editAd) return null;

        editAd.lineHeightMultipliers.forEach((lineHeightMultiplierObj) => {
            const { canvasName, lineHeightMultiplier } = lineHeightMultiplierObj;
            updateLineHeightMultipliers(canvasName, lineHeightMultiplier);
        });
    };

    const updateThemeSelectionFromAd = (editAd) => {
        if (!editAd) return null;
        updateSelectedThemeId(editAd.themeId);
    }

    const updateTextStylesFromAd = (editAd) => {
        if (!editAd) return null;

        if (!appRef.current) return;

        const app = appRef.current;

        editAd.userControlledAttributes.forEach((attribute) => {
            const { canvasName, textControls } = attribute;

            // Update each textControl in the canvas app
            textControls.forEach((textControl) => {
                const { name, text, style } = textControl;

                // Find the child with the corresponding name
                const child = app?.stage?.children.find(child => child.name === name);
                if (child instanceof PIXI.HTMLText || child instanceof PIXI.Text) {
                    // Update the child's text and style
                    child.text = text;
                    child.style = style;

                    // Update the canvas app in the context
                    updateCanvasApp(canvasName, app);
                }
            });
        });
    };

    useEffect(() => {
        if (!account?._id) return;
        const fetchCards = async () => {
            const cards = await getCardsByAccountId(account._id);
            setCards(cards);
        }
        fetchCards();
    }, [router.pathname, account?._id]);

    useEffect(() => {
        if (!editAd) return;
        updateThemeSelectionFromAd(editAd);
    }, [editAd]);

    useEffect(() => {
        if (!editAd) return;
        // Check if the necessary fields exist and have values
        if (!xRanges || !yRanges || !lineHeightMultipliers || !userControlledAttributes) return;

        if (!appRef.current) return;

        const app = appRef.current;

        // Check if there are 4 userControlledAttributes (prevents early triggering of useImage on a canvas without imageControl attributes)
        if (userControlledAttributes.length !== 4) return;

        const canvasUserControlledAttributes = getUserControlledAttributes(editAd, canvasName);
        if (!canvasUserControlledAttributes) return;

        // Trigger useImage
        setTimeout(() => {
            updateBackgroundImageLocation(canvasUserControlledAttributes.imageControls.location);
            app.renderer.render(app.stage);
        }, 400);
    }, [xRanges, yRanges, lineHeightMultipliers, userControlledAttributes, selectedThemeId, editAd]);

    useEffect(() => {
        if (!appRef.current || !editAd) return;

        const canvasUserControlledAttributes = getUserControlledAttributes(editAd, canvasName);
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

            if (updatedAttributes.length === 4) {
                updateRangesFromAd(editAd);
                updateLineHeightMultipliersFromAd(editAd);
                updateTextPositionsFromAd(editAd)
                updateSelectedAudiencePosition(Number(editAd.bestFitAudience));
            }

            return updatedAttributes;
        });

    }, [router.pathname, editAd, cards, selectedThemeId]);

    useEffect(() => {
        if (!appRef.current || !editAd) return;
        updateTextStylesFromAd(editAd);
    }, [router.pathname, editAd, cards, selectedThemeId, xRanges, yRanges]
    );

};



export default useEditStageChildren;
