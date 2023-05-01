import React, { useContext, useState } from 'react';
import { PixiContext } from '../../../contexts/PixiContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainTextAccordion from "./MainTextAccordion";
import {ActiveCanvasButtonGroup} from './ActiveCanvasButtonGroup';

const TextStyleAccordion = () => {
    // const { textStyles } = useContext(PixiContext);

    const [textStyle, setTextStyle] = useState({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: 200,
    });

    const handleFontChange = (event) => {
        setTextStyle({ ...textStyle, fontFamily: event.target.value });
    };

    const handleFontSizeChange = (event, newValue) => {
        setTextStyle({ ...textStyle, fontSize: newValue });
    };

    const handleColorChange = (event) => {
        const hexColor = event.target.value.startsWith('#')
            ? event.target.value
            : `#${event.target.value}`;
        setTextStyle({ ...textStyle, fill: hexColor });
    };


    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup visible={true} />
                <MainTextAccordion textStyle={textStyle} handleFontChange={handleFontChange} handleFontSizeChange={handleFontSizeChange} handleColorChange={handleColorChange} />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextStyleAccordion;
