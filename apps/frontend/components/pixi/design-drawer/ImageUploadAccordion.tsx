import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ImageUploadAccordion = ({ onImageUpload }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Image Upload</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <input type="file" accept="image/*" onChange={onImageUpload} />
            </AccordionDetails>
        </Accordion>
    );
};

export default ImageUploadAccordion;
