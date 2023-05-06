import React, { useContext, useEffect, useState } from 'react';
import { CampaignContext } from '../../../../contexts/CampaignContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFilteredTextArrays } from '../../utils/text/getFilteredTextArrays';
import ReviewHookAccordion from './ReviewHookAccordion';
import ClaimCloseAccordion from './ClaimCloseAccordion';

const TextInputAccordion = () => {
    const {
        hooks,
        hookPosition,
        updateHookPosition,
        claims,
        claimPosition,
        updateClaimPosition,
        closes,
        closePosition,
        updateClosePosition,
        reviews,
        reviewPosition,
        updateReviewPosition,
    } = useContext(CampaignContext);

    // Add state for the current reviewId and hookId
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentHookId, setCurrentHookId] = useState(null);

    const { filteredHooks, filteredClaims, filteredCloses } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes);

    // When the review position changes, update the current reviewId and reset the hookId
    useEffect(() => {
        setCurrentReviewId(reviews[reviewPosition - 1]?._id.toString() || null);
        setCurrentHookId(null);
    }, [reviewPosition, reviews, filteredHooks]);

    // When the hook position changes, update the current hookId
    useEffect(() => {
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id.toString() || null);
    }, [hookPosition, filteredHooks, filteredClaims, filteredCloses]);

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
                />
                <ClaimCloseAccordion
                    claimPosition={claimPosition}
                    updateClaimPosition={updateClaimPosition}
                    filteredClaims={filteredClaims}
                    closePosition={closePosition}
                    updateClosePosition={updateClosePosition}
                    filteredCloses={filteredCloses}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextInputAccordion;
