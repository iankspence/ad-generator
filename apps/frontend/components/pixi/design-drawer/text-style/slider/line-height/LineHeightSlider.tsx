import React, {useContext} from 'react';
import { Typography, Slider } from '@mui/material';
import { handleLineHeightChange } from './handleLineHeightChange';
import {getActiveCanvasNames} from "../../utils/getActiveCanvasNames";
import {mode} from "../../../../utils/mode";
import {PixiContext} from "../../../../../../contexts/PixiContext";

const LineHeightSlider = () => {

    const { activeCanvases, canvasApps, lineHeightMultipliers, updateLineHeightMultipliers } = useContext(PixiContext);
    const activeCanvasNames = getActiveCanvasNames(activeCanvases);
    const lineHeightMode = mode(activeCanvasNames.map((canvas) => lineHeightMultipliers[canvas]));

    const onSlide = (event, newValue) => {
        handleLineHeightChange(event, newValue, updateLineHeightMultipliers, activeCanvases, canvasApps);
    };

    return (
        <>
            <Typography gutterBottom>Line Height</Typography>
            <Slider
                value={lineHeightMode ? lineHeightMode : 1}
                onChange={onSlide}
                min={1}
                max={2}
                step={0.01}
                valueLabelDisplay="auto"
            />
        </>
    );
};

export default LineHeightSlider;
