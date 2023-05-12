import React, {useContext, useState} from "react";
import { Grid } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ColourPaletteButtonGroup from "../../../button-group/colour-selection/palette/ColourPaletteButtonGroup";
import {PixiContext} from "../../../../../../../contexts/PixiContext";

const PaletteColourSelectionButton = ({
                                         setFill,
                                         textName,
                                         colourPalettes,
                                     }) => {

    const [showPaletteViewer, setShowPaletteViewer] = useState(false);
    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const onClick = () => {
        setShowPaletteViewer(!showPaletteViewer);
    };

    return (
        <Grid item xs={6}>
            <ToggleButtonGroup
                value={showPaletteViewer}
                exclusive
                onChange={onClick}
                aria-label="palette icon"
            >
                <ToggleButton value={true} aria-label="show palette" style={{width: '31px', height: '31px', }}>
                    <PaletteIcon style={{ fontSize: "1.5rem", width: '25px', height: '25px'}} />
                </ToggleButton>
            </ToggleButtonGroup>
            {showPaletteViewer && (
                <ColourPaletteButtonGroup
                    setFill={setFill}
                    textName={textName}
                    palettes={colourPalettes}
                    setShowPaletteViewer={setShowPaletteViewer}
                    activeCanvases={activeCanvases}
                    canvasApps={canvasApps}
                />
            )}
        </Grid>
    );
};

export default PaletteColourSelectionButton;
