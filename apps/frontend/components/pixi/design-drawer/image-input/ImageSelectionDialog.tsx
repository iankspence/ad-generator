import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Card, CardMedia, CardActionArea } from '@mui/material';
import { getBackgroundImages} from '../../../../utils/api'; // Assuming the getAllImages function is in the same file

const ImageSelectionDialog = ({ open, onClose, onSelect }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (open) {
            getBackgroundImages().then(setImages).catch(console.error);
        }
    }, [open]);

    console.log(images);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select an Image</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item xs={4} key={image._id}>
                            <Card>
                                <CardActionArea onClick={() => onSelect(image)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={image.backgroundImagePreviewLocation}
                                        alt={image.backgroundImageName}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ImageSelectionDialog;
