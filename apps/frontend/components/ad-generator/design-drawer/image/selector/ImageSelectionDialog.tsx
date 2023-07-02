import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Card, CardMedia, CardActionArea, IconButton } from '@mui/material';
import { getBackgroundImages } from '../../../../../utils/api/mongo/background-image/getBackgroundImagesApi';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { deleteBackgroundImage } from '../../../../../utils/api/mongo/background-image/deleteBackgroundImageApi';

const ImageSelectionDialog = ({ open, onClose, onSelect }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (open) {
            getBackgroundImages().then(setImages).catch(console.error);
        }
    }, [open]);

    const handleDelete = async (imageId) => {
        try {
            await deleteBackgroundImage({ backgroundImageId: imageId });
            setImages(images.filter((image) => image._id !== imageId));
        } catch (error) {
            console.error('Failed to delete the image:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select an Image</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item xs={4} key={image._id}>
                            <Card>
                                <div style={{position: 'relative'}}>
                                    <CardActionArea onClick={() => onSelect(image)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`${process.env.NEXT_PUBLIC_CF_DOMAIN}/${image.backgroundImagePreviewLocation}`}
                                            alt={image.backgroundImageName}
                                        />
                                    </CardActionArea>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            if (window.confirm('Are you sure you want to delete this image?')) {
                                                handleDelete(image._id.toString());
                                            }
                                        }}
                                        style={{ padding: '0', position: 'absolute', top: '2%', right: '2%', opacity: '30%' }}
                                    >
                                        <HighlightOffOutlinedIcon />
                                    </IconButton>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ImageSelectionDialog;
