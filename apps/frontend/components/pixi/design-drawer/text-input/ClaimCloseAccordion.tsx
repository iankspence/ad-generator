import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Viewer from './Viewer';
import SidebarTextArea from './SidebarTextArea';

const ClaimCloseAccordion = ({ claimPosition, updateClaimPosition, filteredClaims, closePosition, updateClosePosition, filteredCloses }) => {
    return (
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
    );
};

export default ClaimCloseAccordion;
