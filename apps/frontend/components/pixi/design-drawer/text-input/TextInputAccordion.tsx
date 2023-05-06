import React, { useContext, useEffect, useState } from 'react';
import { CampaignContext } from '../../../../contexts/CampaignContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFilteredTextArrays } from '../../utils/text/getFilteredTextArrays';
import ReviewHookAccordion from './ReviewHookAccordion';
import ClaimCloseAccordion from './ClaimCloseAccordion';
import UserContext from "../../../../contexts/UserContext";
import {
    updateClaimTextEdit,
    updateCloseTextEdit,
    updateHookTextEdit,
    updateReviewTextEdit
} from "../../../../utils/api";

const TextInputAccordion = () => {
    const {
        hooks,
        updateHooks,
        hookPosition,
        updateHookPosition,
        claims,
        updateClaims,
        claimPosition,
        updateClaimPosition,
        closes,
        updateCloses,
        closePosition,
        updateClosePosition,
        reviews,
        updateReviews,
        reviewPosition,
        updateReviewPosition,
    } = useContext(CampaignContext);

    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentHookId, setCurrentHookId] = useState(null);
    const [currentClaimId, setCurrentClaimId] = useState(null);
    const [currentCloseId, setCurrentCloseId] = useState(null);

    const onEditStart = () => {
        console.log('onEditStart');
    };

    const onEditSubmit = async (text, canvasName) => {
        try {
            const currentReview = reviews.find((review) => review._id === currentReviewId);
            const currentHook = hooks.find((hook) => hook._id === currentHookId);
            const currentClaim = claims.find((claim) => claim._id === currentClaimId);
            const currentClose = closes.find((close) => close._id === currentCloseId);

            let updatedData;
            switch (canvasName) {
                case 'review':
                    updatedData = await updateReviewTextEdit({ ...currentReview, reviewTextEdited: text });
                    updateReviews(reviews.map((review) =>
                        review._id === currentReviewId ? updatedData : review
                    ));
                    break;
                case 'hook':
                    updatedData = await updateHookTextEdit({ ...currentHook, hookTextEdited: text });
                    updateHooks(hooks.map((hook) =>
                        hook._id === currentHookId ? updatedData : hook
                    ));
                    break;
                case 'claim':
                    updatedData = await updateClaimTextEdit({ ...currentClaim, claimTextEdited: text });
                    updateClaims(claims.map((claim) =>
                        claim._id === currentClaimId ? updatedData : claim
                    ));
                    break;
                case 'close':
                    updatedData = await updateCloseTextEdit({ ...currentClose, closeTextEdited: text});
                    updateCloses(closes.map((close) =>
                        close._id === currentCloseId ? updatedData : close
                    ));
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error updating text edit:', error);
        }
    };

    const onEditRestore = () => {
        console.log('onEditRestore');
    };

    const { filteredHooks, filteredClaims, filteredCloses } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes);

    useEffect(() => {
        setCurrentReviewId(reviews[reviewPosition - 1]?._id?.toString() || null);
        setCurrentHookId(null);
    }, [reviewPosition, reviews, filteredHooks]);

    useEffect(() => {
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id?.toString() || null);
        setCurrentClaimId(null);
        setCurrentCloseId(null);

    }, [hookPosition, filteredHooks, filteredClaims, filteredCloses]);

    useEffect(() => {
        setCurrentClaimId(filteredClaims[claimPosition - 1]?._id?.toString() || null);
    }, [claimPosition, filteredClaims]);

    useEffect(() => {
        setCurrentCloseId(filteredCloses[closePosition - 1]?._id?.toString() || null);
    }, [closePosition, filteredCloses]);


    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Inputs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ReviewHookAccordion
                    reviewPosition={reviewPosition}
                    updateReviewPosition={updateReviewPosition}
                    reviews={reviews}
                    hookPosition={hookPosition}
                    updateHookPosition={updateHookPosition}
                    filteredHooks={filteredHooks}
                    onEditStart={onEditStart}
                    onEditSubmit={onEditSubmit}
                    onEditRestore={onEditRestore}
                />
                <ClaimCloseAccordion
                    claimPosition={claimPosition}
                    updateClaimPosition={updateClaimPosition}
                    filteredClaims={filteredClaims}
                    closePosition={closePosition}
                    updateClosePosition={updateClosePosition}
                    filteredCloses={filteredCloses}
                    onEditStart={onEditStart}
                    onEditSubmit={onEditSubmit}
                    onEditRestore={onEditRestore}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextInputAccordion;
