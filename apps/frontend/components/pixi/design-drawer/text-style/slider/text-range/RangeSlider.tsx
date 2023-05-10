import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PixiContext } from '../../../../../../contexts/PixiContext';
import { useContext } from 'react';
import {handleRangeChange} from "./handleRangeChange";
import {getActiveCanvasNames} from "../../utils/getActiveCanvasNames";
import { getRangeModes } from "./getRangeModes";

export const RangeSlider = ({ rangeLabel, textName, min, max }) => {
    const {
        activeCanvases,
        canvasApps,
        xRanges,
        yRanges,
        updateRange,
        updateDisplayTextBox
    } = useContext(PixiContext);

    const activeCanvasNames = getActiveCanvasNames(activeCanvases);
    const { xMinValueMode, xMaxValueMode, yMinValueMode, yMaxValueMode } = getRangeModes(activeCanvasNames, xRanges, yRanges);

    const onSlide = (event, newValue) => {
        handleRangeChange(rangeLabel, newValue, activeCanvases, canvasApps, xRanges, yRanges, updateRange);
    };

    return (
        <Box>
            <Typography gutterBottom>{rangeLabel}</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={ rangeLabel === 'X Range' ? [xMinValueMode, xMaxValueMode] : [yMinValueMode, yMaxValueMode]}
                        onChange={onSlide}
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        onMouseDown={() => updateDisplayTextBox(true)}
                        onMouseUp={() => updateDisplayTextBox(false)}
                        onTouchStart={() => updateDisplayTextBox(true)}
                        onTouchEnd={() => updateDisplayTextBox(false)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
