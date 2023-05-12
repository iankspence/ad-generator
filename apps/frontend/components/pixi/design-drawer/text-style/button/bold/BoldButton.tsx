import React, {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { handleFontWeightChange } from './handleFontWeightChange';
import {PixiContext} from "../../../../../../contexts/PixiContext";

const BoldButton = ({ textName, fontWeight, setFontWeight }) => {

    const { activeCanvases, canvasApps, lineHeightMultipliers, updateLineHeightMultipliers } = useContext(PixiContext);

    const onClick = (event, newFontWeight) => {
        handleFontWeightChange(event, newFontWeight, setFontWeight, textName, activeCanvases, canvasApps);

        updateLineHeightMultipliers('hook',  lineHeightMultipliers['hook']);
    };

    return (
        <ToggleButtonGroup
            value={fontWeight}
            exclusive
            onChange={onClick}
            aria-label="text weight"
        >
            <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default BoldButton;
