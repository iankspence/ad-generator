import React, { useContext, useState } from 'react';
import { CampaignContext } from '../../../contexts/CampaignContext';
import { PixiContext } from '../../../contexts/PixiContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import ImageUploadAccordion from './image-input/accordion/ImageUploadAccordion';
import TextInputAccordion from './text-input/accordion/TextInputAccordion';
import MasterTextStyleAccordion from './text-style/accordion/MasterTextStyleAccordion';

const DesignDrawer = ({ onImageUpload, onDrawerStateChange}) => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        if (onDrawerStateChange) {
            onDrawerStateChange(true);
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
        if (onDrawerStateChange) {
            onDrawerStateChange(false);
        }
    };

    return (
        <Box>
            <div className="fixed top-8 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full">
                <IconButton
                    onClick={handleDrawerOpen}
                    style={{ zIndex: 20, color: 'black' }}
                    className=""
                >
                    <TextureOutlinedIcon />
                </IconButton>
            </div>
            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: '400px',
                        padding: 2,
                    },
                }}
                componentsProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'transparent',
                        },
                    },
                }}
            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Design Elements
                    </Typography>

                    <ImageUploadAccordion onImageUpload={onImageUpload} />
                    <TextInputAccordion />
                    <MasterTextStyleAccordion />
                </Box>
            </Drawer>
        </Box>
    );
};

export default DesignDrawer;
