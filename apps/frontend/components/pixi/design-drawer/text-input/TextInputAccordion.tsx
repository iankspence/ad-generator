import React, { useContext, useEffect, useState } from 'react';
import { CampaignContext } from '../../../../contexts/CampaignContext';
import Viewer from './Viewer';
import SidebarTextArea from './SidebarTextArea';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {getFilteredTextArrays} from "../../utils/text/getFilteredTextArrays";

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
