import { CampaignContext } from '../../../contexts/CampaignContext';
import { PixiContext } from '../../../contexts/PixiContext';
import CanvasTextControl from './CanvasTextControl';
import SidebarTextArea from './SidebarTextArea';
import Viewer from './Viewer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useState } from 'react';

const DesignDrawer = ({ onImageUpload, onDrawerStateChange }) => {
    const [open, setOpen] = useState(false);
    const [selectedCanvases, setSelectedCanvases] = useState({});
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

    const { textStyles } = useContext(PixiContext);

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

    console.log('reviews in design-drawer: ', reviews);

    const [textStyle, setTextStyle] = useState({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: 200,
    });

    const handleFontChange = (event) => {
        setTextStyle({ ...textStyle, fontFamily: event.target.value });
    };

    const handleFontSizeChange = (event, newValue) => {
        setTextStyle({ ...textStyle, fontSize: newValue });
    };

    const handleColorChange = (event) => {
        console.log('colour change ' + 'event.target.value: ', event.target.value);
        const hexColor = event.target.value.startsWith('#') ? event.target.value : `#${event.target.value}`;
        setTextStyle({ ...textStyle, fill: hexColor });
    };

    const handleCanvasSelection = (newSelectedCanvases) => {
        setSelectedCanvases(newSelectedCanvases);
    };

    return (
        <Box>
            <div className="fixed top-8 right-8 z-10">
                <IconButton
                    onClick={handleDrawerOpen}
                    style={{ zIndex: 20 }}
                    className="bg-white hover:bg-gray-300 text-black p-2 rounded-full"
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
                // Add this line to replace the deprecated BackdropProps
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

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Image Upload</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <input type="file" accept="image/*" onChange={onImageUpload} />
                        </AccordionDetails>
                    </Accordion>

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

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Text Inputs</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CanvasTextControl onCanvasSelection={handleCanvasSelection} />
                            <div className="py-2"></div>

                            <FormControl fullWidth>
                                <InputLabel>Font</InputLabel>
                                <Select value={textStyle.fontFamily} onChange={handleFontChange}>
                                    <MenuItem value="Arial">Arial</MenuItem>
                                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                                    <MenuItem value="Georgia">Georgia</MenuItem>
                                    {/* Add more fonts here */}
                                </Select>
                            </FormControl>
                            <div className="py-2"></div>

                            <Typography gutterBottom>Font Size</Typography>
                            <Slider
                                value={textStyle.fontSize}
                                onChange={handleFontSizeChange}
                                min={10}
                                max={60}
                                valueLabelDisplay="auto"
                            />
                            <div className="py-2"></div>

                            <Typography gutterBottom>Color</Typography>
                            <input type="color" value={textStyle.fill} onChange={handleColorChange} />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Drawer>
        </Box>
    );
};

export default DesignDrawer;
