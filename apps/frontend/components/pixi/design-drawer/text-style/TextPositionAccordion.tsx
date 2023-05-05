import React, {useContext, useState} from 'react';
import { PixiContext } from '../../../../contexts/PixiContext';
import {DualButtonSlider} from "./DualButtonSlider";
import { mode } from '../../utils/mode';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Slider,
    Typography
} from '@mui/material';

const TextPositionAccordion = ({ textName }) => {
    const { activeCanvases, canvasApps, xRanges, yRanges, updateRange, updateLineHeightMultipliers } = useContext(PixiContext);
    const [lineHeightMultiplier, setLineHeightMultiplier] = useState(133);

    const handleTextRangeChange = (textName, newRange) => {
        Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
            if (isActive) {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const updatedXRange = Object.prototype.hasOwnProperty.call(newRange, "x") ? newRange.x as [number, number] : xRanges[canvasName];
                    const updatedYRange = Object.prototype.hasOwnProperty.call(newRange, "y") ? newRange.y as [number, number] : yRanges[canvasName];
                    updateRange(canvasName, updatedXRange, updatedYRange);
                }
            }
        });
    };

    const handleXRangeChange = (event, newValue) => {
        const updatedRange = { x: newValue };
        handleTextRangeChange(textName, updatedRange);
    };

    const handleYRangeChange = (event, newValue) => {
        const updatedRange = { y: newValue };
        handleTextRangeChange(textName, updatedRange);
    };

    const handleLineHeightChange = (event, newValue) => {
        const lineHeightMultiplier = newValue;
        setLineHeightMultiplier(lineHeightMultiplier);

        Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
            if (isActive) {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    updateLineHeightMultipliers(canvasName, lineHeightMultiplier/100);
                }
            }
        });
    };

    const activeCanvasNames = Object.entries(activeCanvases).filter(([canvasName, isActive]) => isActive).map(([canvasName, isActive]) => canvasName);
    const xMinMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][0]));
    const xMaxMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][1]));
    const yMinMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][0]));
    const yMaxMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][1]));

    return (

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{'Text Position'}</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <DualButtonSlider
                    label="X Range"
                    name={textName}
                    min={0}
                    max={320}
                    value1={xMinMode}
                    value2={xMaxMode}
                    onChange={handleXRangeChange}
                />
                <DualButtonSlider
                    label="Y Range"
                    name={textName}
                    min={0}
                    max={320}
                    value1={yMinMode}
                    value2={yMaxMode}
                    onChange={handleYRangeChange}
                />
                <Typography gutterBottom>Line Height</Typography>
                <Slider
                    value={lineHeightMultiplier}
                    onChange={handleLineHeightChange}
                    min={100}
                    max={200}
                    valueLabelDisplay="auto"
                    name={textName}
                />
            </AccordionDetails>

        </Accordion>
    );
};

export default TextPositionAccordion;
