import React, { useContext, useEffect, useState } from 'react';
import { CampaignContext } from '../../../../contexts/CampaignContext';
import Viewer from './Viewer';
import SidebarTextArea from './SidebarTextArea';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TextInputAccordion = () => {
    const {
        hooks,
        activeHooks,
        updateActiveHooks,
        hookPosition,
        updateHookPosition,
        claims,
        activeClaims,
        updateActiveClaims,
        claimPosition,
        updateClaimPosition,
        closes,
        activeCloses,
        updateActiveCloses,
        closePosition,
        updateClosePosition,
        reviews,
        activeReviews,
        updateActiveReviews,
        reviewPosition,
        updateReviewPosition,
    } = useContext(CampaignContext);

    // Add state for the current reviewId and hookId
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [currentHookId, setCurrentHookId] = useState(null);

    // Filter hooks, claims, and closes based on the current review and hook
    // const filteredReviews = reviews.filter(review => review._id.toString() === currentReviewId);
    const filteredHooks = hooks.filter(hook => hook.reviewId === currentReviewId);
    const filteredClaims = claims.filter(claim => claim.reviewId === currentReviewId && claim.hookId === currentHookId);
    const filteredCloses = closes.filter(close => close.reviewId === currentReviewId && close.hookId === currentHookId);

    // When the review position changes, update the current reviewId and reset the hookId
    useEffect(() => {
        setCurrentReviewId(reviews[reviewPosition - 1]?._id.toString() || null);
        updateActiveReviews(reviews);
        setCurrentHookId(null);
        updateActiveHooks(filteredHooks);
    }, [reviewPosition, reviews, filteredHooks]);

    // When the hook position changes, update the current hookId
    useEffect(() => {
        setCurrentHookId(filteredHooks[hookPosition - 1]?._id.toString() || null);
        updateActiveClaims(filteredClaims);
        updateActiveCloses(filteredCloses);
    }, [hookPosition, filteredHooks, filteredClaims, filteredCloses]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Inputs</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Review/Hook (Quotes)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Viewer
                            label="Review"
                            position={reviewPosition}
                            setPosition={updateReviewPosition}
                            totalCount={reviews.length}
                        />
                        <SidebarTextArea
                            textArray={reviews.map((review) => review.reviewText)}
                            position={reviewPosition}
                            rows={6}
                        />

                        <Viewer
                            label="Hook"
                            position={hookPosition}
                            setPosition={updateHookPosition}
                            totalCount={filteredHooks.length}
                        />
                        <SidebarTextArea
                            textArray={filteredHooks.map((hook) => hook.hookText)}
                            position={hookPosition}
                            rows={3}
                        />
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Claim/Close</Typography>
                    </AccordionSummary>
                        <AccordionDetails>
                            <Viewer
                                label="Claim"
                                position={claimPosition}
                                setPosition={updateClaimPosition}
                                totalCount={filteredClaims.length}
                            />
                            <SidebarTextArea
                                textArray={filteredClaims.map((claim) => claim.claimText)}
                                position={claimPosition}
                                rows={3}
                            />
                            <Viewer
                                label="Close"
                                position={closePosition}
                                setPosition={updateClosePosition}
                                totalCount={filteredCloses.length}
                            />
                            <SidebarTextArea
                                textArray={filteredCloses.map((close) => close.closeText)}
                                position={closePosition}
                                rows={3}
                            />
                        </AccordionDetails>
                    </Accordion>
                </AccordionDetails>
        </Accordion>
);
};

export default TextInputAccordion;


