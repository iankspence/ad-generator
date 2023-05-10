import React, {useContext, useState} from 'react';
import { PixiContext } from '../../../../../contexts/PixiContext';
import { RangeSlider } from "../slider/text-range/RangeSlider";
import { mode } from '../../../utils/mode';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';
import LineHeightSlider from "../slider/line-height/LineHeightSlider";

const TextPositionAccordion = ({ textName }) => {
    const { activeCanvases, canvasApps, xRanges, yRanges, updateLineHeightMultipliers, updateDisplayTextBox } = useContext(PixiContext);
    const [lineHeightMultiplier, setLineHeightMultiplier] = useState(133);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{'Text Position'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <RangeSlider
                    rangeLabel="X Range"
                    textName={textName}
                    min={0}
                    max={320}
                />
                <RangeSlider
                    rangeLabel="Y Range"
                    textName={textName}
                    min={0}
                    max={320}
                />
                <LineHeightSlider
                    lineHeightMultiplier={lineHeightMultiplier}
                    setLineHeightMultiplier={setLineHeightMultiplier}
                    activeCanvases={activeCanvases}
                    canvasApps={canvasApps}
                    updateLineHeightMultipliers={updateLineHeightMultipliers}
                />

            </AccordionDetails>

        </Accordion>
    );
};

export default TextPositionAccordion;
