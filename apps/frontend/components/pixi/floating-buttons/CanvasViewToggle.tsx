import BorderAllOutlinedIcon from '@mui/icons-material/BorderAllOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

const CanvasViewToggle = ({ singleCanvasView, onToggle }) => {
    return (
        <div className="" style={{ color: '#000', backgroundColor: '#fff' }}>
            <ToggleButtonGroup value={singleCanvasView ? 'single-canvas' : 'four-canvas'} exclusive onChange={onToggle} size="small">
                <ToggleButton value="four-canvas" aria-label="four-canvas">
                    <BorderAllOutlinedIcon />
                </ToggleButton>
                <ToggleButton value="single-canvas" aria-label="single-canvas">
                    <CropSquareOutlinedIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default CanvasViewToggle;
