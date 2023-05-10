import React from 'react';
import { Paper, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paletteContainer: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
    colorSquare: {
        padding: 'calc(100% / 3)',
        position: 'relative',
        borderRadius: '4px',
    },
});

const ColorPaletteButtonGroup = ({ palettes, handleClose, handleColorChange, name }) => {
    const classes = useStyles();

    const handleColorSelect = (color) => {
        const event = {
            target: {
                value: color.toString(),
                name,
            },
        };
        handleColorChange(event);
        handleClose();
    };

    return (
        <Paper className={classes.paletteContainer}>
            <Grid container spacing={0.05} >
                {palettes.map((palette, index) => (
                    <Grid key={index} item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" spacing={0}>
                            {palette.map((color, colorIndex) => (
                                <Grid key={colorIndex} item>
                                    <Button
                                        className={classes.colorSquare}
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        <div style={{ backgroundColor: color, position: 'absolute', height:40, width: 25, paddingLeft: 40, paddingRight: 40, top: 0, left: 0, right: 0, bottom: 0, borderRadius: 'inherit' }}></div>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="flex-end">
                <Button color="primary" onClick={handleClose}>
                    Close
                </Button>
            </Grid>
        </Paper>
    );
};

export default ColorPaletteButtonGroup;
