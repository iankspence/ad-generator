import React, { useEffect, useRef, useContext} from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { handleColorChange } from "../../utils/handleColorChange";
import {PixiContext} from "../../../../../../contexts/PixiContext";

export const ColorSelectionButtonInput = styled('input')({
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    height: '23px',
    width: '100%',
    cursor: 'pointer',
});

export const ColorDisplayButton = styled('button')(
    ({ theme, color }) => ({
        height: '23px',
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: color,
    })
);

const ColorSelectionButton = ({ fill, setFill, textName, }) => {
    const pickerRef = useRef(null);

    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const handleChange = (event) => {
        handleColorChange(event, setFill, textName, activeCanvases, canvasApps);
    };

    const handleClick = () => {
        pickerRef.current.click();
    };

    useEffect(() => {
        // Execute the handleChange function when necessary dependencies change
    }, [setFill, fill, activeCanvases, canvasApps]);

    return (
        <Box>
            <ColorDisplayButton color={fill} onClick={handleClick} />
            <ColorSelectionButtonInput
                type="color"
                ref={pickerRef}
                onChange={handleChange}
                value={fill}
            />
        </Box>
    );
};

export default ColorSelectionButton;
