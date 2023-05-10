import React from 'react';
import { Typography, Slider } from '@mui/material';
import { handleLineHeightChange } from './handleLineHeightChange';

const LineHeightSlider = ({ lineHeightMultiplier, setLineHeightMultiplier, activeCanvases, canvasApps, updateLineHeightMultipliers }) => {
    const onSlide = (event, newValue) => {
        handleLineHeightChange(event, newValue, setLineHeightMultiplier, activeCanvases, canvasApps, updateLineHeightMultipliers);
    };

    return (
        <>
            <Typography gutterBottom>Line Height</Typography>
            <Slider
                value={lineHeightMultiplier}
                onChange={onSlide}
                min={100}
                max={200}
                valueLabelDisplay="auto"
            />
        </>
    );
};

export default LineHeightSlider;
