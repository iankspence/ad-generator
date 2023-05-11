import React from 'react';
import { Typography, Slider } from '@mui/material';
import { handlePaddingChange } from './handlePaddingChange';

const PaddingSlider = ({ textName, padding, setPadding, activeCanvases, canvasApps }) => {
    const onSlide = (event, newValue) => {
        handlePaddingChange(event, newValue, setPadding, textName, activeCanvases, canvasApps);
    };

    return (
        <>
            <Typography gutterBottom>Padding</Typography>
            <Slider
                value={padding}
                onChange={onSlide}
                min={0}
                max={20}
                valueLabelDisplay="auto"
            />
        </>
    );
};

export default PaddingSlider;
