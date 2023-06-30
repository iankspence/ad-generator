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

const MaskColorPaletteButtonGroup = ({ handleChange, palettes, setShowPaletteViewer }) => {
    const classes = useStyles();

    const handleClick = (event, color) => {
        if (!event.target.value) {
            const customEvent = {
                ...event,
                target: { ...event.target, value: color },
            };
            handleChange(customEvent);
        } else {
            handleChange(event);
        }
        setShowPaletteViewer(false);
    };

    return (
        <Paper className={classes.paletteContainer}>
            <Grid container spacing={0.05} padding={0} >
                {palettes.map((palette, index) => (
                    <Grid key={index} item xs={12}  >
                        <Grid container justifyContent="center" alignItems="center" padding={0.4}>
                            {palette.map((color, colorIndex) => (
                                <Grid key={colorIndex} item padding={0}>
                                    <Button
                                        className={classes.colorSquare}
                                        onClick={(event) => handleClick(event, color)}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: color,
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

export default MaskColorPaletteButtonGroup;
