import BorderAllOutlinedIcon from '@mui/icons-material/BorderAllOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

const CanvasViewToggle = ({ singleCanvasView, onToggle }) => {
    return (
        <div
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10"
            style={{ color: '#000', backgroundColor: '#fff' }}
        >
            <ToggleButtonGroup value={singleCanvasView ? 'single' : 'four'} exclusive onChange={onToggle} size="small">
                <ToggleButton value="four" aria-label="4-canvas view">
                    <BorderAllOutlinedIcon />
                </ToggleButton>
                <ToggleButton value="single" aria-label="1-canvas view">
                    <CropSquareOutlinedIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default CanvasViewToggle;
