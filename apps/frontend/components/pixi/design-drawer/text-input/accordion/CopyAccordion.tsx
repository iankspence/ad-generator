import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextSelector from '../selector/TextSelector';
import TextAreaWithEdit from '../text-area/TextAreaWithEdit';

const CopyAccordion = ({ copyPosition, updateCopyPosition, filteredCopies, onEditStart, onEditSubmit, onEditRestore }) => {
    console.log('copy position: ', copyPosition)
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Ad Copy</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextSelector
                    label="Copy"
                    position={copyPosition}
                    setPosition={updateCopyPosition}
                    totalCount={filteredCopies.length}
                />
                <TextAreaWithEdit
                    textArray={filteredCopies.map((copy) => copy.copyTextEdited ? copy.copyTextEdited : copy.copyText)}
                    position={copyPosition}
                    rows={3}
                    onEditStart={onEditStart}
                    onEditSubmit={onEditSubmit}
                    onEditRestore={onEditRestore}
                    canvasName={'copy'}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default CopyAccordion;
