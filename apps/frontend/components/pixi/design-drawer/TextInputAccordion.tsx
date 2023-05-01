import React, { useContext } from 'react';
import { CampaignContext } from '../../../contexts/CampaignContext';
import Viewer from './Viewer';
import SidebarTextArea from './SidebarTextArea';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TextInputAccordion = () => {
    const {
        copies,
        copyPosition,
        updateCopyPosition,
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

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Inputs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Viewer
                    label="Copy"
                    position={copyPosition}
                    setPosition={updateCopyPosition}
                    totalCount={copies.length}
                />
                <SidebarTextArea
                    textArray={copies.map((copy) => copy.copyText)}
                    position={copyPosition}
                    rows={6}
                />

                <Viewer
                    label="Hook"
                    position={hookPosition}
                    setPosition={updateHookPosition}
                    totalCount={hooks.length}
                />
                <SidebarTextArea
                    textArray={hooks.map((hook) => hook.hookText)}
                    position={hookPosition}
                    rows={2}
                />

                <Viewer
                    label="Claim"
                    position={claimPosition}
                    setPosition={updateClaimPosition}
                    totalCount={claims.length}
                />
                <SidebarTextArea
                    textArray={claims.map((claim) => claim.claimText)}
                    position={claimPosition}
                    rows={2}
                />

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
                    label="Close"
                    position={closePosition}
                    setPosition={updateClosePosition}
                    totalCount={closes.length}
                />
                <SidebarTextArea
                    textArray={closes.map((close) => close.closeText)}
                    position={closePosition}
                    rows={2}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextInputAccordion;
