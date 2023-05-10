import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { handleFontWeightChange } from './handleFontWeightChange';

const BoldButton = ({ textName, fontWeight, setFontWeight, activeCanvases, canvasApps }) => {
    const handleClick = (event, newFontWeight) => {
        handleFontWeightChange(event, newFontWeight, setFontWeight, textName, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={fontWeight}
            exclusive
            onChange={handleClick}
            aria-label="text weight"
        >
            <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default BoldButton;
