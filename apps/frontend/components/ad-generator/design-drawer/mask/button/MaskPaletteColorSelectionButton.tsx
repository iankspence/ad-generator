import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import MaskColorPaletteButtonGroup from "../button-group/MaskColorPaletteButtonGroup";


export const MaskPaletteColorSelectionButton = ({ handleChange, colorPalettes }) => {
    const [showPaletteViewer, setShowPaletteViewer] = useState(false);

    const onClick = () => {
        setShowPaletteViewer(!showPaletteViewer);
    };

    return (
        <Grid item>
            <ToggleButtonGroup
                value={showPaletteViewer}
                exclusive
                onChange={onClick}
                aria-label="palette icon"
            >
                <ToggleButton value={true} aria-label="show palette" style={{ width: '25px', height: '25px', }}>
                    <PaletteIcon style={{ fontSize: "1.5rem", width: '20px', height: '20px' }} />
                </ToggleButton>
            </ToggleButtonGroup>
            {showPaletteViewer && (
                <MaskColorPaletteButtonGroup
                    handleChange={handleChange}
                    palettes={colorPalettes}
                    setShowPaletteViewer={setShowPaletteViewer}
                />
            )}
        </Grid>
    );
};
