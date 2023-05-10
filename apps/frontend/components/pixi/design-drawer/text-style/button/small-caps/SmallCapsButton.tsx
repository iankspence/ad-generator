import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import { handleFontVariantChange } from './handleFontVariantChange';

const SmallCapsButton = ({ textName, fontVariant, setFontVariant, activeCanvases, canvasApps }) => {
    const handleClick = (event, newFontVariant) => {
        handleFontVariantChange(event, newFontVariant, setFontVariant, textName, activeCanvases, canvasApps);
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
