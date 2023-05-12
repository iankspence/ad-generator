import React, {useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { handleLetterSpacingChange } from './handleLetterSpacingChange';
import * as PIXI from "pixi.js";
import {mode} from "../../../../utils/mode";
import {PixiContext} from "../../../../../../contexts/PixiContext";

const LetterSpacingSlider = ({ textName, letterSpacing, setLetterSpacing }) => {

    const { activeCanvases, canvasApps, lineHeightMultipliers, updateLineHeightMultipliers } = useContext(PixiContext);

    const onSlide = (event, newLetterSpacing) => {
        handleLetterSpacingChange(event, newLetterSpacing, setLetterSpacing, textName, activeCanvases, canvasApps);
        // to update the useText hook, we also need to update the lineHeightMultipliers
        updateLineHeightMultipliers('hook',  lineHeightMultipliers['hook']);
    };

    return (
        <>
            <Typography id="letter-spacing-slider" gutterBottom>
                Letter Spacing
            </Typography>
            <Slider
                value={letterSpacing ? letterSpacing : 0}
                onChange={onSlide}
                aria-labelledby="letter-spacing-slider"
                valueLabelDisplay="auto"
                min={0}
                max={2}
                step={0.01}
            />
        </>
    );
};

export default LetterSpacingSlider;
