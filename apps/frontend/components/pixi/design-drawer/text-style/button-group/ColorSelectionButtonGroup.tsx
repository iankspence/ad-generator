import React from 'react';
import { Grid, Button } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import ColorPaletteButtonGroup from './ColorPaletteButtonGroup';
import chroma from "chroma-js";

const ColorSelectionButtonGroup = ({
                                       account,
                                       fill,
                                       handleColorChange,
                                       textName,
                                       showPrimaryPaletteViewer,
                                       setShowPrimaryPaletteViewer,
                                       showSecondaryPaletteViewer,
                                       setShowSecondaryPaletteViewer,
                       }) => {

    const generateColorPalettes = (inputColor) => {
        const generateShades = (color, count) => {
            const scale = chroma.scale([chroma(color).darken(2.5), chroma(color).brighten(2.5)]).mode('lch');
            return scale.colors(count);
        };

        const splitComplementaryColors = (color) => {
            const hclColor = chroma(color).hcl();
            const splitComplementaryHue1 = (hclColor[0] + 150) % 360;
            const splitComplementaryHue2 = (hclColor[0] + 210) % 360;
            return [
                chroma.hcl(splitComplementaryHue1, hclColor[1], hclColor[2]),
                chroma.hcl(splitComplementaryHue2, hclColor[1], hclColor[2]),
            ];
        };

        const inputShades = generateShades(inputColor, 8);

        const [inputSplit1, inputSplit2] = splitComplementaryColors(inputColor);

        const inputSplit1Shades = generateShades(inputSplit1, 8);
        const inputSplit2Shades = generateShades(inputSplit2, 8);

        return [
            inputSplit1Shades,
            inputSplit2Shades,
            inputShades,
        ];
    };

    if (!account || !account?.primaryColor  || !account?.secondaryColor ) {
        return null;
    }

    const primaryColorPalettes = generateColorPalettes(account?.primaryColor);
    const secondaryColorPalettes = generateColorPalettes(account?.secondaryColor);

    return (
        <Grid container direction="column" spacing={0}>
            <Grid item>
                <input
                    style={{ height: '28px', width: '100%' }}
                    type="color"
                    value={fill}
                    onChange={(event) => handleColorChange(event, textName)}
                    name={textName}
                />
            </Grid>
            <Grid item>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            style={{
                                minWidth: '100%',
                                height: '28px',
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() => setShowPrimaryPaletteViewer(!showPrimaryPaletteViewer)}
                        >
                            <PaletteIcon style={{ fontSize: '1.5rem' }} />
                        </Button>
                        {showPrimaryPaletteViewer && (
                            <ColorPaletteButtonGroup
                                palettes={primaryColorPalettes}
                                handleClose={() => setShowPrimaryPaletteViewer(false)}
                                handleColorChange={(event) => handleColorChange(event, textName)}
                                name={textName}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            style={{
                                minWidth: '100%',
                                height: '28px',
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() => setShowSecondaryPaletteViewer(!showSecondaryPaletteViewer)}
                        >
                            <PaletteIcon style={{ fontSize: '1.5rem'  }} />
                        </Button>
                        {showSecondaryPaletteViewer && (
                            <ColorPaletteButtonGroup
                                palettes={secondaryColorPalettes}
                                handleClose={() => setShowSecondaryPaletteViewer(false)}
                                handleColorChange={(event) => handleColorChange(event, textName)}
                                name={textName}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ColorSelectionButtonGroup;
