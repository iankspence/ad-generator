import React, {useContext} from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import {handleFontFamilyChange} from "./handleFontFamilyChange";
import {PixiContext} from "../../../../../../contexts/PixiContext";

const FontFamilySelector = ({ fontFamily, setFontFamily, textName }) => {

    const { activeCanvases, canvasApps } = useContext(PixiContext);

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
                <MenuItem value="sans-serif">sans-serif</MenuItem>
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="Verdana">Verdana</MenuItem>
                <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
                <MenuItem value="Tahoma">Tahoma</MenuItem>
                <MenuItem value="serif">serif</MenuItem>
                <MenuItem value="Georgia">Georgia</MenuItem>
                <MenuItem value="Hoefler Text">Hoefler Text</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FontFamilySelector;
