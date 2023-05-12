import React from 'react';
import { Paper, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { handleColorChange } from '../../../utils/handleColorChange'

const useStyles = makeStyles({
    paletteContainer: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
    colourSquare: {
        padding: 'calc(100% / 3)',
        position: 'relative',
        borderRadius: '4px',
    },
});

const ColourPaletteButtonGroup = ({ setFill, textName, palettes, setShowPaletteViewer, activeCanvases, canvasApps }) => {
    const classes = useStyles();

    const handleClick = (event, colour) => {
        if (!event.target.value) {
            const customEvent = {
                ...event,
                target: { ...event.target, value: colour },
            };
            handleColorChange(customEvent, setFill, textName, activeCanvases, canvasApps);
        } else {
            handleColorChange(event, setFill, textName, activeCanvases, canvasApps);
        }
        setShowPaletteViewer(false);
    };

    return (
        <Paper className={classes.paletteContainer}>
            <Grid container spacing={0.05} padding={0} >
                {palettes.map((palette, index) => (
                    <Grid key={index} item xs={12}  >
                        <Grid container justifyContent="center" alignItems="center" padding={0.4}>
                            {palette.map((colour, colourIndex) => (
                                <Grid key={colourIndex} item padding={0}>
                                    <Button
                                        className={classes.colourSquare}
                                        onClick={(event) => handleClick(event, colour)}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: colour,
                                                position: "absolute",
                                                height: 40,
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                borderRadius: "inherit",
                                            }}
                                        ></div>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>

        </Paper>
    );
};

export default ColourPaletteButtonGroup;
