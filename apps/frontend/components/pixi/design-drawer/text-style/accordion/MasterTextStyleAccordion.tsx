import React, { useContext } from 'react';
import { PixiContext } from '../../../../../contexts/PixiContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextStyleAccordion from "./TextStyleAccordion";
import {ActiveCanvasButtonGroup} from '../button-group/ActiveCanvasButtonGroup';
import * as PIXI from "pixi.js";
import TextPositionAccordion from "./TextPositionAccordion";

const MasterTextStyleAccordion = () => {

    const { activeCanvases, canvasApps } = useContext(PixiContext);

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

    const handleFontFamilyChange = (textName, newFontFamily) => {
        const updatedTextStyle = { fontFamily: newFontFamily };
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

    const handleFontVariantChange = (textName, newFontVariant) => {
        const updatedTextStyle = { fontVariant: newFontVariant };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    const handleLetterSpacingChange = (textName, newLetterSpacing) => {
        const updatedTextStyle = { letterSpacing: newLetterSpacing };
        handleTextStyleChange(textName, updatedTextStyle);
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup visible={true} />

                <TextPositionAccordion
                    textName={'main'}
                />

                <div className="py-2"></div>

                <TextStyleAccordion
                    textName={'main'}
                    handleFontFamilyChange={handleFontFamilyChange}
                    handleColorChange={handleColorChange}
                    handleFontVariantChange={handleFontVariantChange}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                />
                <TextStyleAccordion
                    textName={'author'}
                    handleFontFamilyChange={handleFontFamilyChange}
                    handleColorChange={handleColorChange}
                    handleFontVariantChange={handleFontVariantChange}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default MasterTextStyleAccordion;
