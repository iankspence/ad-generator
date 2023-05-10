import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { handleLetterSpacingChange } from './handleLetterSpacingChange';

const LetterSpacingSlider = ({ textName, letterSpacing, setLetterSpacing, activeCanvases, canvasApps }) => {

    const handleSlide = (event, newLetterSpacing) => {
        handleLetterSpacingChange(event, newLetterSpacing, setLetterSpacing, textName, activeCanvases, canvasApps);
    };

    return (
        <>
            <Typography id="letter-spacing-slider" gutterBottom>
                Letter Spacing
            </Typography>
            <Slider
                value={letterSpacing}
                onChange={handleSlide}
                aria-labelledby="letter-spacing-slider"
                valueLabelDisplay="auto"
            />
        </>
    );
};

export default LetterSpacingSlider;
