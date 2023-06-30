import React from 'react';
import { Grid } from '@mui/material';
import { generateColorPalettes } from '../../../../../../utils/color/generateColorPalettes';
import PaletteColorSelectionButton from '../../button/colour-selection/palette/PaletteColorSelectionButton';
import ColorSelectionButton from '../../button/colour-selection/ColorSelectionButton';

const ColorSelectionButtonGroup = ({
                                       account,
                                       textName,
                                       fill,
                                       setFill,
                                   }) => {

    if (!account || !account?.primaryColor || !account?.secondaryColor) {
        return null;
    }

    const primaryColorPalettes = generateColorPalettes(account?.primaryColor);
    const secondaryColorPalettes = generateColorPalettes(account?.secondaryColor);
    const grayscaleColorPalettes = generateColorPalettes('#808080');

    return (
        <Grid container direction="column" spacing={0}>

            <Grid item container direction="row" >
                <ColorSelectionButton
                    fill={fill}
                    setFill={setFill}
                    textName={textName}
                />
                <div className="w-2"></div>
                <PaletteColorSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colorPalettes={grayscaleColorPalettes}
                />
            </Grid>

            <div className="h-1"></div>

            <Grid item container direction="row">
                <PaletteColorSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colorPalettes={primaryColorPalettes}
                />
                <div className="w-2"></div>
                <PaletteColorSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colorPalettes={secondaryColorPalettes}
                />
            </Grid>
        </Grid>
    );
};

export default ColorSelectionButtonGroup;
