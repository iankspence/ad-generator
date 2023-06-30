import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PixiContext} from "../../../../../contexts/PixiContext";
import { findMaskChildren } from '../../../utils/mask/findMaskChildren';
import MaskColorSelectionButtonGroup from '../button-group/MaskColourSelectionButtonGroup';

const MaskAccordion = (app) => {
    const { canvasApps } = useContext(PixiContext);
    const [activeMaskNames, setActiveMaskNames] = useState([]); // Create state variable

    useEffect(() => {
        const canvasNames = ['hook', 'claim', 'review', 'close']

        let maskNames = canvasNames.flatMap((canvasName) => {
            const maskChildren = findMaskChildren(canvasApps[canvasName]);
            return maskChildren ? maskChildren.map((maskChild) => maskChild.name) : [];
        });

        maskNames = Array.from(new Set(
            maskNames.map(maskName => maskName.split('-').slice(2).join('-')) // split, remove first two words, and rejoin (removes mask-canvasName same mask applied to all canvases)
        ));

        setActiveMaskNames(maskNames);

    }, [canvasApps,]);

    return (

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Mask</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {activeMaskNames.map(maskName => (
                    <Accordion key={maskName}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">{maskName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MaskColorSelectionButtonGroup maskName={maskName} />
                            {/*<PaletteColorSelectionButton setFill={(color) => setMaskColor(prevState => ({...prevState, [maskName]: color}))} />*/}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default MaskAccordion;
