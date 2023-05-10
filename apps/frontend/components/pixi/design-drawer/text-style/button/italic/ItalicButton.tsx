import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import {handleFontStyleChange} from "./handleFontStyleChange";

const ItalicButton = ({ textName, fontStyle, setFontStyle, activeCanvases, canvasApps }) => {
    const onClick = (event, newFontStyle) => {
        handleFontStyleChange(event, newFontStyle, setFontStyle, textName, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={fontStyle}
            exclusive
            onChange={onClick}
            aria-label="text style"
        >
            <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ItalicButton;
