import React, { useContext } from 'react';
import { PixiContext } from '../../../../../contexts/PixiContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextStyleAccordion from "./TextStyleAccordion";
import {ActiveCanvasButtonGroup} from '../button-group/active-canvas/ActiveCanvasButtonGroup';
import TextPositionAccordion from "./TextPositionAccordion";

const MasterTextStyleAccordion = () => {

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup/>

                <TextPositionAccordion
                    textName={'main'}
                />
                <TextStyleAccordion
                    textName={'main'}
                />
                <TextStyleAccordion
                    textName={'author'}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default MasterTextStyleAccordion;
