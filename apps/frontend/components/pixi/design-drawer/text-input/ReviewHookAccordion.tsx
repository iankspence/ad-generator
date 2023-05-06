import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Viewer from './Viewer';
import SidebarTextArea from './SidebarTextArea';

const ReviewHookAccordion = ({ reviewPosition, updateReviewPosition, reviews, hookPosition, updateHookPosition, filteredHooks }) => {
    return (
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
    );
};

export default ReviewHookAccordion;
