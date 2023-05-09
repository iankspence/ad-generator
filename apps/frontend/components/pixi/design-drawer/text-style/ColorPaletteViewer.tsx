import React from 'react';
import { Paper, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paletteContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: '1rem',
        marginTop: '1rem',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
    colorSquare: {
        width: '20px',
        height: '20px',
        borderRadius: '4px',
    },
});

const ColorPaletteViewer = ({ palettes, handleClose, handleColorChange, name }) => {
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
            <Grid container spacing={1} wrap="nowrap">
                {palettes.map((palette, index) => (
                    <Grid key={index} item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" spacing={1}>
                            {palette.map((color, colorIndex) => (
                                <Grid key={colorIndex} item>
                                    <Button
                                        className={classes.colorSquare}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorSelect(color)}
                                    ></Button>
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

export default ColorPaletteViewer;
