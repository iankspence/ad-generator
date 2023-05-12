import React from 'react';
import { Grid } from '@mui/material';
import { generateColorPalettes } from './palette/generateColorPalettes';
import PaletteColorSelectionButton from '../../button/color-selection/palette/PaletteColorSelectionButton';
import ColorSelectionButton from '../../button/color-selection/ColorSelectionButton';

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

    return (
        <Grid container direction="column" spacing={0}>
            <ColorSelectionButton
                fill={fill}
                setFill={setFill}
                textName={textName}
            />

            <Grid item container direction="row">
                <PaletteColorSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colorPalettes={primaryColorPalettes}
                />
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
