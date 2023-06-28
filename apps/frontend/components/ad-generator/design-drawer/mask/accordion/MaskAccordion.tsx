import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PixiContext} from "../../../../../contexts/PixiContext";
import UserContext from '../../../../../contexts/UserContext';
import { HtmlThemeText } from '../../../../../type/HtmlThemeText';
import { mode } from '../../../utils/mode';
import { findMaskChildren } from '../../../utils/mask/findMaskChildren';
import { getActiveCanvasNames } from '../../text-style/utils/getActiveCanvasNames';
import ActiveCanvasButtonGroup from '../../text-style/button-group/active-canvas/ActiveCanvasButtonGroup';

const MaskAccordion = (app) => {
    const { account } = useContext(UserContext);
    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const [activeMaskNames, setActiveMaskNames] = useState([]); // Create state variable

    useEffect(() => {
        const activeCanvasNames = getActiveCanvasNames(activeCanvases);
        const activeCanvasApps = activeCanvasNames.map((canvasName) => canvasApps[canvasName]);

        let maskNames = activeCanvasApps.flatMap((canvasApp) => {
            if (canvasApp) {
                const maskChildren = findMaskChildren(canvasApp);
                return maskChildren ? maskChildren.map((maskChild) => maskChild.name) : [];
            }
            return [];
        })

        // Transform mask names and remove duplicates
        maskNames = Array.from(new Set(
            maskNames
                .map(maskName => maskName.split('-').slice(2).join('-')) // split, remove first two words, and rejoin
        ));

        setActiveMaskNames(maskNames); // Set state variable

    }, [activeCanvases, canvasApps]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Mask</Typography>
            </AccordionSummary>

            <ActiveCanvasButtonGroup />

            <AccordionDetails> {/* flexDirection set to column for vertical alignment of nested accordions */}
                {activeMaskNames.map(maskName => ( // Map through the activeMaskNames
                    <Accordion key={maskName}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">{maskName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>



                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default MaskAccordion;
