import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { handleLocalLetterSpacingChange } from '../utils/textStyleHandlers';

const LetterSpacingSlider = ({ textName, letterSpacing, handleLetterSpacingChange, setLetterSpacing }) => {
    return (
        <>
            <Typography id="letter-spacing-slider" gutterBottom>
                Letter Spacing
            </Typography>
            <Slider
                value={letterSpacing}
                onChange={(event, newValue) => handleLocalLetterSpacingChange(event, newValue, setLetterSpacing, textName, handleLetterSpacingChange)}
                aria-labelledby="letter-spacing-slider"
                valueLabelDisplay="auto"
            />
        </>
    );
};

export default LetterSpacingSlider;
