import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { handleAlignChange } from './handleAlignChange';

const AlignButton = ({ textName, align, setAlign, activeCanvases, canvasApps }) => {
    const onClick = (event, newAlign) => {
        handleAlignChange(event, newAlign, setAlign, textName, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={align}
            exclusive
            onChange={onClick}
            aria-label="text alignment"
        >
            <ToggleButton value="left" aria-label="left align">
                <FormatAlignLeftIcon style={{ fontSize: 36 }} />
            </ToggleButton>
            <ToggleButton value="center" aria-label="center align">
                <FormatAlignCenterIcon style={{ fontSize: 36 }} />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right align">
                <FormatAlignRightIcon style={{ fontSize: 36 }} />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justify">
                <FormatAlignJustifyIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default AlignButton;
