import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export const DualButtonSlider = ({ label, name, min, max, value1, value2, onChange, onStart, onEnd }) => {

    const handleSliderChange = (event, newValue) => {
        const syntheticEvent = {
            target: {
                name: name,
                value: newValue,
            },
        };
        onChange(syntheticEvent, newValue);
    };

    const handleSliderStart = () => {
        if (onStart) onStart();
    };

    const handleSliderEnd = () => {
        if (onEnd) onEnd();
    };

    return (
        <Box>
            <Typography gutterBottom>{label}</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={[value1, value2]}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        onMouseDown={handleSliderStart}
                        onMouseUp={handleSliderEnd}
                        onTouchStart={handleSliderStart}
                        onTouchEnd={handleSliderEnd}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
