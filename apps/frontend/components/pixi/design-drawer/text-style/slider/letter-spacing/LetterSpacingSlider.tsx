import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { handleLetterSpacingChange } from './handleLetterSpacingChange';

const LetterSpacingSlider = ({ textName, letterSpacing, setLetterSpacing, activeCanvases, canvasApps }) => {

    const onSlide = (event, newLetterSpacing) => {
        handleLetterSpacingChange(event, newLetterSpacing, setLetterSpacing, textName, activeCanvases, canvasApps);
    };

    return (
        <>
            <Typography id="letter-spacing-slider" gutterBottom>
                Letter Spacing
            </Typography>
            <Slider
                value={letterSpacing}
                onChange={onSlide}
                aria-labelledby="letter-spacing-slider"
                valueLabelDisplay="auto"
                min={0}
                max={1}
                step={0.01}
            />
        </>
    );
};

export default LetterSpacingSlider;
