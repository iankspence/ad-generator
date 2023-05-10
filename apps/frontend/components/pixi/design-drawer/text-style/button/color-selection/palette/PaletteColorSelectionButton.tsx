import React, { useState } from "react";
import { Grid } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ColorPaletteButtonGroup from "../../../button-group/color-selection/palette/ColorPaletteButtonGroup";

const PaletteColorSelectionButton = ({
                                         setFill,
                                         textName,
                                         colorPalettes,
                                         activeCanvases,
                                         canvasApps,
                                     }) => {
    const [showPaletteViewer, setShowPaletteViewer] = useState(false);

    const onClick = () => {
        setShowPaletteViewer(!showPaletteViewer);
    };

    return (
        <Grid item xs={6}>
            <ToggleButtonGroup
                // width: {minWidth: '100%'}
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
                <ColorPaletteButtonGroup
                    setFill={setFill}
                    textName={textName}
                    palettes={colorPalettes}
                    setShowPaletteViewer={setShowPaletteViewer}
                    activeCanvases={activeCanvases}
                    canvasApps={canvasApps}
                />
            )}
        </Grid>
    );
};

export default PaletteColorSelectionButton;
