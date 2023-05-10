import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import {handleLocalFontFamilyChange } from '../utils/textStyleHandlers';

const FontSelector = ({ fontFamily, setFontFamily, handleFontFamilyChange, textName }) => {

    const handleClick = (event) => {
        const newFontFamily = event.target.value;
        handleLocalFontFamilyChange(event, newFontFamily, setFontFamily, textName, handleFontFamilyChange);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="font-selector-label"
                id="font-selector"
                value={fontFamily}
                onChange={handleClick}
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

export default FontSelector;
