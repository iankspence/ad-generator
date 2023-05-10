import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import {handleFontFamilyChange} from "./handleFontFamilyChange";

const FontFamilySelector = ({ fontFamily, setFontFamily, textName, activeCanvases, canvasApps }) => {

    const onClick = (event) => {
        const newFontFamily = event.target.value;
        console.log('newFontFamily', newFontFamily)
        handleFontFamilyChange(event, newFontFamily, setFontFamily, textName, activeCanvases, canvasApps);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="font-selector-label"
                id="font-selector"
                value={fontFamily}
                onChange={onClick}
            >
                <MenuItem value="Arial Narrow">Arial Narrow</MenuItem>
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="Arial Black">Arial Black</MenuItem>
                <MenuItem value="Helvetica">Helvetica</MenuItem>
                <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                <MenuItem value="Georgia">Georgia</MenuItem>
                <MenuItem value="Verdana">Verdana</MenuItem>
                <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
                <MenuItem value="Tahoma">Tahoma</MenuItem>
                <MenuItem value="sans-serif">sans-serif</MenuItem>
                <MenuItem value="serif">serif</MenuItem>
                <MenuItem value="Hoefler Text">Hoefler Text</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FontFamilySelector;
