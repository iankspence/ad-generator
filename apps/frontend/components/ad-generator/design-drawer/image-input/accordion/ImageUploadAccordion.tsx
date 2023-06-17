import React, {useContext, useState, useCallback} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageSelectionDialog from '../ImageSelectionDialog';
import {PixiContext} from "../../../../../contexts/PixiContext";
import { useDropzone } from 'react-dropzone';
import UserContext from '../../../../../contexts/UserContext';
import { uploadBackgroundImage } from '../../../../../utils/api/mongo/background-image/uploadBackgroundImageApi';

const ImageUploadAccordion = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { updateBackgroundImageLocation } = useContext(PixiContext);
    const { account } = useContext(UserContext);
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleImageSelect = (image) => {
        updateBackgroundImageLocation(`${image.backgroundImageLocation}`);
        handleCloseDialog();
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        uploadBackgroundImage({
            accountId: account._id.toString(),
            backgroundImage: file,
        });

    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
            'image/svg+xml': ['.svg'],
        },
    });

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Image Select</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="contained" color="inherit" onClick={handleOpenDialog}>
                    Select Image
                </Button>
                <div {...getRootProps()} style={{marginLeft: '20px', padding: '19px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', height: '60px', border: '2px dashed gray', borderRadius: '4px' }}>
                    <input {...getInputProps()} />
                    Drag & drop or click to upload
                </div>
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
