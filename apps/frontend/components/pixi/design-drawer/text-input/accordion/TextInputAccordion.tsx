import React, { useContext, useEffect, useState } from 'react';
import { CampaignContext } from '../../../../../contexts/CampaignContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFilteredTextArrays } from '../../../utils/text/getFilteredTextArrays';
import ReviewHookAccordion from './ReviewHookAccordion';
import ClaimCloseAccordion from './ClaimCloseAccordion';
import {
    updateClaimTextEdit,
    updateCloseTextEdit,
    updateHookTextEdit,
    updateReviewTextEdit,
    updateCopyTextEdit,
} from "../../../../../utils/api";
import AudienceSelector from "../selector/AudienceSelector";
import { audiences } from "../../../../../utils/constants/audiences";
import CopyAccordion from "./CopyAccordion";

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
        copies,
        updateCopies,
        copyPosition,
        updateCopyPosition,
        selectedAudiencePosition,
        updateSelectedAudiencePosition,
    } = useContext(CampaignContext);

    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentHookId, setCurrentHookId] = useState(null);
    const [currentClaimId, setCurrentClaimId] = useState(null);
    const [currentCloseId, setCurrentCloseId] = useState(null);
    const [currentCopyId, setCurrentCopyId] = useState(null);

    const onEditStart = () => {};
    const onEditRestore = () => {};

    const onEditSubmit = async (text, canvasName) => {
        try {
            const currentReview = reviews.find((review) => review._id === currentReviewId);
            const currentHook = hooks.find((hook) => hook._id === currentHookId);
            const currentClaim = claims.find((claim) => claim._id === currentClaimId);
            const currentClose = closes.find((close) => close._id === currentCloseId);
            const currentCopy = copies.find((copy) => copy._id === currentCopyId);

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
                case 'copy':
                    updatedData = await updateCopyTextEdit({ ...currentCopy, copyTextEdited: text });
                    updateCopies(copies.map((copy) =>
                        copy._id === currentCopyId ? updatedData : copy
                    ));
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error updating text edit:', error);
        }
    };

    const { filteredReviews, filteredHooks, filteredClaims, filteredCloses, filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

    useEffect(() => {
        setCurrentReviewId(filteredReviews[reviewPosition - 1]?._id?.toString() || null);
        setCurrentHookId(null);
    }, [reviewPosition, filteredReviews, filteredHooks]);

    useEffect(() => {
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id?.toString() || null);
        setCurrentClaimId(null);
        setCurrentCloseId(null);
        setCurrentCopyId(null);

    }, [hookPosition, filteredHooks, filteredClaims, filteredCloses, filteredCopies]);

    useEffect(() => {
        setCurrentClaimId(filteredClaims[claimPosition - 1]?._id?.toString() || null);
    }, [claimPosition, filteredClaims]);

    useEffect(() => {
        setCurrentCloseId(filteredCloses[closePosition - 1]?._id?.toString() || null);
    }, [closePosition, filteredCloses]);

    useEffect(() => {
        setCurrentCopyId(filteredCopies[copyPosition - 1]?._id?.toString() || null);
    }, [copyPosition, filteredCopies]);


    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Inputs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AudienceSelector countTarget={'reviews'}/>
                <ReviewHookAccordion
                    reviewPosition={reviewPosition}
                    updateReviewPosition={updateReviewPosition}
                    reviews={filteredReviews}
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
                <CopyAccordion
                    copyPosition={copyPosition}
                    updateCopyPosition={updateCopyPosition}
                    filteredCopies={filteredCopies}
                    onEditStart={onEditStart}
                    onEditSubmit={onEditSubmit}
                    onEditRestore={onEditRestore}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextInputAccordion;
