import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { handleLocalFontWeightChange } from '../../utils/textStyleHandlers';

const BoldButton = ({ textName, fontWeight, handleFontWeightChange, setFontWeight }) => {
    const handleClick = (event, newFontWeight) => {
        handleLocalFontWeightChange(event, newFontWeight, setFontWeight, textName, handleFontWeightChange);
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
