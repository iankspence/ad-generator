import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { handleLocalFontStyleChange, handlePaddingChange } from '../../utils/textStyleHandlers';

const ItalicButton = ({ textName, fontStyle, handleFontStyleChange, setFontStyle, activeCanvases, canvasApps }) => {
    const handleClick = (event, newFontStyle) => {
        handleLocalFontStyleChange(event, newFontStyle, setFontStyle, textName, handleFontStyleChange, handlePaddingChange, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={fontStyle}
            exclusive
            onChange={handleClick}
            aria-label="text style"
        >
            <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ItalicButton;
