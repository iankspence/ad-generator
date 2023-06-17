import React, {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import { handleFontVariantChange } from './handleFontVariantChange';
import {PixiContext} from "../../../../../../contexts/PixiContext";

const SmallCapsButton = ({ textName, fontVariant, setFontVariant }) => {

    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const onClick = (event, newFontVariant) => {
        handleFontVariantChange(event, newFontVariant, setFontVariant, textName, activeCanvases, canvasApps);
    };

    return (
        <ToggleButtonGroup
            value={fontVariant}
            exclusive
            onChange={onClick}
            aria-label="text variant"
        >
            <ToggleButton value="small-caps" aria-label="small-caps">
                <KeyboardCapslockIcon style={{ fontSize: 36 }} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default SmallCapsButton;
