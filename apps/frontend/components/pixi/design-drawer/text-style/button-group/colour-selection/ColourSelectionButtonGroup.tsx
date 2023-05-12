import React from 'react';
import { Grid } from '@mui/material';
import { generateColourPalettes } from './palette/generateColourPalettes';
import PaletteColourSelectionButton from '../../button/colour-selection/palette/PaletteColourSelectionButton';
import ColourSelectionButton from '../../button/colour-selection/ColourSelectionButton';

const ColourSelectionButtonGroup = ({
                                       account,
                                       textName,
                                       fill,
                                       setFill,
                                   }) => {

    if (!account || !account?.primaryColour || !account?.secondaryColour) {
        return null;
    }

    const primaryColourPalettes = generateColourPalettes(account?.primaryColour);
    const secondaryColourPalettes = generateColourPalettes(account?.secondaryColour);

    return (
        <Grid container direction="column" spacing={0}>
            <ColourSelectionButton
                fill={fill}
                setFill={setFill}
                textName={textName}
            />

            <Grid item container direction="row">
                <PaletteColourSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colourPalettes={primaryColourPalettes}
                />
                <PaletteColourSelectionButton
                    setFill={setFill}
                    textName={textName}
                    colourPalettes={secondaryColourPalettes}
                />
            </Grid>
        </Grid>
    );
};

export default ColourSelectionButtonGroup;
