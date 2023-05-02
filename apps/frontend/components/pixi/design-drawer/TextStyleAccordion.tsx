import React, { useContext, useState } from 'react';
import { PixiContext } from '../../../contexts/PixiContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainTextAccordion from "./MainTextAccordion";
import {ActiveCanvasButtonGroup} from './ActiveCanvasButtonGroup';
import * as PIXI from "pixi.js";

const TextStyleAccordion = () => {

    const {activeCanvases, canvasApps} = useContext(PixiContext);

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

    const handleFontSizeChange = (event, newValue) => {
        const updatedTextStyle = { fontSize: newValue };
        const textName = event.target.name;

        console.log('handleFontSizeChange (TextStyleAccordion): ', textName, updatedTextStyle)

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
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup visible={true} />
                <MainTextAccordion
                    handleFontChange={handleFontChange}
                    handleFontSizeChange={handleFontSizeChange}
                    handleColorChange={handleColorChange}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextStyleAccordion;
