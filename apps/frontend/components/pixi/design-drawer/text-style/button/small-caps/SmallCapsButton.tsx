import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import { handleLocalFontVariantChange } from '../../utils/textStyleHandlers';

const SmallCapsButton = ({ textName, fontVariant, handleFontVariantChange, setFontVariant }) => {
    const handleClick = (event, newFontVariant) => {
        handleLocalFontVariantChange(event, newFontVariant, setFontVariant, textName, handleFontVariantChange);
    };

    return (
        <ToggleButtonGroup
            value={fontVariant}
            exclusive
            onChange={handleClick}
            aria-label="text variant"
        >
            <ToggleButton value="small-caps" aria-label="small-caps">
                <KeyboardCapslockIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default SmallCapsButton;
