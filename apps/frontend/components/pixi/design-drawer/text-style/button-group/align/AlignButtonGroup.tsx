import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { handleAlignChange } from './handleAlignChange';

const AlignButtonGroup = ({ textName, align, setAlign, activeCanvases, canvasApps }) => {
    const onClick = (event, newAlign) => {
        handleAlignChange(event, newAlign, setAlign, textName, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={align}
            exclusive
            onChange={onClick}
            aria-label="text alignment"
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <ToggleButton value="left" aria-label="left align" style={{ width: '25%' }}>
                <FormatAlignLeftIcon style={{ fontSize: 30 }} />
            </ToggleButton>
            <ToggleButton value="center" aria-label="center align" style={{ width: '25%' }}>
                <FormatAlignCenterIcon style={{ fontSize: 30 }} />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right align" style={{ width: '25%' }}>
                <FormatAlignRightIcon style={{ fontSize: 30 }} />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justify" style={{ width: '25%' }}>
                <FormatAlignJustifyIcon style={{ fontSize: 30 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default AlignButtonGroup;
