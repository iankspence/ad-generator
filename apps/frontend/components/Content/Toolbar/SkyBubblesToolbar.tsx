import SkyBubblesThemeContext from '../../../contexts/SkyBubblesThemeContext';
import { TextField, Button, Box, Slider } from '@material-ui/core';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import React, { useContext, useState } from 'react';
import { ChromePicker } from 'react-color';

function SkyBubblesToolbar({ applyToAll, activeCanvas }) {
    const { gradientColors, bubbleCount, minSize, maxSize, updateTheme } = useContext(SkyBubblesThemeContext);

    const [gradientColorsState, setGradientColorsState] = useState(gradientColors);
    const [bubbleCountState, setBubbleCountState] = useState(bubbleCount);
    const [minSizeState, setMinSizeState] = useState(minSize);
    const [maxSizeState, setMaxSizeState] = useState(maxSize);
    const [showColorPicker, setShowColorPicker] = useState([false, false]);

    const handleColorChange = (color, index) => {
        const newGradientColors = { ...gradientColorsState };
        newGradientColors[`color${index}`] = color.hex;
        setGradientColorsState(newGradientColors);
    };
    //
    // const toggleColorPicker = (index) => {
    //     const newShowColorPicker = [...showColorPicker];
    //     newShowColorPicker[index] = !newShowColorPicker[index];
    //     setShowColorPicker(newShowColorPicker);
    // };
    const handleClickAway = () => {
        setShowColorPicker([false, false]);
    };

    return (
        <div className="w-full flex justify-center bg-gray-500 py-2 mb-4">
            {['color1', 'color2'].map((colorKey, index) => (
                <div key={colorKey} className="mx-2">
                    <div>{`Color ${index + 1}`}</div>
                    <button
                        onClick={() => {
                            const newShowColorPicker = [...showColorPicker];
                            newShowColorPicker[index] = !newShowColorPicker[index];
                            setShowColorPicker(newShowColorPicker);
                        }}
                    >
                        Select color
                    </button>
                    {showColorPicker[index] && (
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <Box sx={{ position: 'relative' }}>
                                <ChromePicker
                                    color={gradientColorsState[colorKey]}
                                    onChangeComplete={(color) => handleColorChange(color, index + 1)}
                                />
                            </Box>
                        </ClickAwayListener>
                    )}
                </div>
            ))}
            {/* Update the TextField components to Slider components */}
            <div className="mx-2">
                <span>Bubble Count</span>
                <Slider
                    value={bubbleCountState}
                    onChange={(e, newValue) => setBubbleCountState(newValue as number)}
                    min={0}
                    max={250}
                />
            </div>
            <div className="mx-2">
                <span>Min Size</span>
                <Slider
                    value={minSizeState}
                    onChange={(e, newValue) => {
                        if ((newValue as number) <= maxSizeState) {
                            setMinSizeState(newValue as number);
                        }
                    }}
                    min={0}
                    max={100}
                />
            </div>
            <div className="mx-2">
                <span>Max Size</span>
                <Slider
                    value={maxSizeState}
                    onChange={(e, newValue) => {
                        if ((newValue as number) >= minSizeState) {
                            setMaxSizeState(newValue as number);
                        }
                    }}
                    min={0}
                    max={100}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    updateTheme({
                        gradientColors: gradientColorsState,
                        bubbleCount: bubbleCountState,
                        minSize: minSizeState,
                        maxSize: maxSizeState,
                    });
                }}
            >
                Apply Changes
            </Button>
        </div>
    );
}

export default SkyBubblesToolbar;
