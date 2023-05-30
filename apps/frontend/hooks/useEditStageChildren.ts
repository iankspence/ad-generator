import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixiContext } from "../contexts/PixiContext";
import {getCardsByAccountId} from "../utils/api/mongo/card/getCardsByAccountIdApi";
import UserContext from "../contexts/UserContext";
import {CampaignContext} from "../contexts/CampaignContext";
import * as PIXI from "pixi.js";

const useEditStageChildren = (appRef, canvasName) => {
    const { editAd, updateBackgroundImageLocation, updateRange, updateLineHeightMultipliers, lineHeightMultipliers, updateCanvasApp, selectedThemeId, updateSelectedThemeId, xRanges, yRanges, userControlledAttributes, freezeEditAdAttributes } = useContext(PixiContext);
    const {updateSelectedAudiencePosition, updateReviewPosition, updateHookPosition, updateClaimPosition, updateClosePosition, updateCopyPosition } = useContext(CampaignContext)
    const { account } = useContext(UserContext);
    const router = useRouter();
    const [cards, setCards] = useState([]);

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

        const copyPosition = editAd.filteredTextPositions.find(position => position.canvasName === 'copy').position;
        updateCopyPosition(copyPosition);
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

        if (!appRef.current) return null;
        const app = appRef.current;

        editAd.userControlledAttributes.forEach((attribute) => {
            const { canvasName, textControls } = attribute;

            textControls.forEach((textControl) => {
                const { name, text, style } = textControl;
                const child = app?.stage?.children.find(child => child.name === name);

                if (child instanceof PIXI.HTMLText || child instanceof PIXI.Text) {
                    child.text = text;
                    child.style = style;
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
        if (!editAd || !freezeEditAdAttributes ) return;
        updateThemeSelectionFromAd(editAd);
    }, [editAd]);


    useEffect(() => {
        if (!editAd || !xRanges || !yRanges || !lineHeightMultipliers || !userControlledAttributes || !appRef.current || !freezeEditAdAttributes ) return;

        const app = appRef.current;
        const canvasUserControlledAttribute = editAd.userControlledAttributes.find(attribute => attribute.canvasName === canvasName)

        setTimeout(() => {
            updateBackgroundImageLocation(canvasUserControlledAttribute.imageControls.location);
            app.renderer.render(app.stage);
        }, 400);

    }, [xRanges, yRanges, lineHeightMultipliers, userControlledAttributes, selectedThemeId, editAd]);


    useEffect(() => {
        if (!appRef.current || !editAd || !freezeEditAdAttributes) return;

        updateRangesFromAd(editAd);
        updateLineHeightMultipliersFromAd(editAd);
        updateTextPositionsFromAd(editAd)
        updateSelectedAudiencePosition(Number(editAd.bestFitAudience));

    }, [router.pathname, editAd, cards, selectedThemeId]);

    useEffect(() => {
        if (!appRef.current || !editAd || !freezeEditAdAttributes) return;
        updateTextStylesFromAd(editAd);

    }, [router.pathname, editAd, cards, selectedThemeId, xRanges, yRanges]);

};

export default useEditStageChildren;
