import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextStyleAccordion from "./TextStyleAccordion";
import {ActiveCanvasButtonGroup} from '../button-group/active-canvas/ActiveCanvasButtonGroup';
import {RangeSlider} from "../slider/text-range/RangeSlider";

const MasterTextStyleAccordion = () => {

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Text Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ActiveCanvasButtonGroup/>

                <TextStyleAccordion
                    textName={'main'}
                />
                <TextStyleAccordion
                    textName={'author'}
                />

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">XY Range</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RangeSlider
                            rangeLabel="X Range"
                        />
                        <RangeSlider
                            rangeLabel="Y Range"
                        />
                    </AccordionDetails>
                </Accordion>

            </AccordionDetails>
        </Accordion>
    );
};

export default MasterTextStyleAccordion;
