import React, { useContext, useState } from 'react';
import { PixiContext } from '../../../contexts/PixiContext';
import {Accordion, AccordionSummary, AccordionDetails, Slider} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainTextAccordion from "./MainTextAccordion";
import {ActiveCanvasButtonGroup} from './ActiveCanvasButtonGroup';
import * as PIXI from "pixi.js";
import { mode } from '../utils/mode';
import {DualButtonSlider} from "./DualButtonSlider";

const TextStyleAccordion = () => {

    const { activeCanvases, canvasApps, xRanges, yRanges, updateRange, updateLineHeightMultipliers } = useContext(PixiContext);
    const [lineHeightMultiplier, setLineHeightMultiplier] = useState(133);

    const handleTextStyleChange = (textName, newTextStyle) => {
        Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
            if (isActive) {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textName}`) as PIXI.Text;
                    if (textObject) {
                        Object.assign(textObject.style, newTextStyle);
                    }
                }
            }
        });
    };

    const handleFontChange = (event) => {
        const updatedTextStyle = { fontFamily: event.target.value };
        const textName = event.target.name;
        handleTextStyleChange(textName, updatedTextStyle);
    };

    const handleColorChange = (event) => {
        const hexColor = event.target.value.startsWith('#')
            ? event.target.value
            : `#${event.target.value}`;
        const updatedTextStyle = { fill: hexColor };
        const textName = event.target.name;
        handleTextStyleChange(textName, updatedTextStyle);
    };

    const handleFontWeightChange = (textName, newFontWeight) => {
        const updatedTextStyle = { fontWeight: newFontWeight };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    const handleFontStyleChange = (textName, newFontStyle) => {
        const updatedTextStyle = { fontStyle: newFontStyle };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    const handleFontVariantChange = (textName, newFontVariant) => {
        const updatedTextStyle = { fontVariant: newFontVariant };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    const handleLetterSpacingChange = (textName, newLetterSpacing) => {
        const updatedTextStyle = { letterSpacing: newLetterSpacing };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    const activeCanvasNames = Object.entries(activeCanvases).filter(([canvasName, isActive]) => isActive).map(([canvasName, isActive]) => canvasName);
    const xMinMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][0]));
    const xMaxMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][1]));
    const yMinMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][0]));
    const yMaxMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][1]));

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
        const textName = event.target.name;
        handleTextRangeChange(textName, updatedRange);
    };

    const handleYRangeChange = (event, newValue) => {
        const updatedRange = { y: newValue };
        const textName = event.target.name;
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

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup visible={true} />

                <DualButtonSlider
                    label="X Range"
                    name="main"
                    min={0}
                    max={320}
                    value1={xMinMode}
                    value2={xMaxMode}
                    onChange={handleXRangeChange}
                />
                <DualButtonSlider
                    label="Y Range"
                    name="main"
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
                    name={'main'}
                />
                <div className="py-2"></div>

                <MainTextAccordion
                    handleFontChange={handleFontChange}
                    handleColorChange={handleColorChange}
                    handleFontWeightChange={handleFontWeightChange}
                    handleFontStyleChange={handleFontStyleChange}
                    handleFontVariantChange={handleFontVariantChange}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextStyleAccordion;
