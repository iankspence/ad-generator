import React, {useContext, useState} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageSelectionDialog from '../ImageSelectionDialog';
import {PixiContext} from "../../../../../contexts/PixiContext";

const ImageUploadAccordion = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { updateBackgroundImageLocation } = useContext(PixiContext);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleImageSelect = (image) => {
        updateBackgroundImageLocation(image.backgroundImageLocation);
        handleCloseDialog();
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Image Select</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Select Image
                </Button>
                <ImageSelectionDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onSelect={handleImageSelect}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default ImageUploadAccordion;
