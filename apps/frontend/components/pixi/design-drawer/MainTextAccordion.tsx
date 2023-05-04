import React, {useState, useEffect, useContext} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PIXI from 'pixi.js';
import {PixiContext} from "../../../contexts/PixiContext";
import {DualButtonSlider} from "./DualButtonSlider";
import {mode} from "../utils/mode";

const MainTextAccordion = ({ handleFontChange, handleFontSizeChange, handleColorChange, initialXRange, initialYRange,  }) => {
    const { activeCanvases, canvasApps, xRanges, yRanges, updateRange, lineHeightMultipliers, updateLineHeightMultipliers } = useContext(PixiContext);

    const [fontFamily, setFontFamily] = useState('Arial');
    const [lineHeightMultiplier, setLineHeightMultiplier] = useState(1.33);
    const [fill, setFill] = useState('#000000');

    useEffect(() => {
        const activeTextStyles = Object.entries(activeCanvases)
            .filter(([canvasName, isActive]) => isActive)
            .map(([canvasName]) => {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const textObject = canvasApp.stage.getChildByName(`${canvasName}-main`) as PIXI.Text;
                    if (textObject) {
                        return textObject.style;
                    }
                }
                return null;
            })
            .filter((style) => style !== null);

        if (activeTextStyles.length > 0) {
            const mostCommonFontFamily = mode(activeTextStyles.map((style) => style.fontFamily));
            const mostCommonFill = mode(activeTextStyles.map((style) => style.fill));

            setFontFamily(mostCommonFontFamily || 'Arial');
            setFill(mostCommonFill || '#000000');
        }
    }, [activeCanvases, canvasApps]);

    const handleLocalFontChange = (event) => {
        setFontFamily(event.target.value);
        handleFontChange(event);
    };

    const handleLocalLineHeightChange = (event, newValue) => {
        const lineHeightMultiplier = newValue;
        setLineHeightMultiplier(lineHeightMultiplier);
        Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
            if (isActive) {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    updateLineHeightMultipliers(canvasName, lineHeightMultiplier/100);
                }
            }
        });
    }

    const handleLocalColorChange = (event) => {
        setFill(event.target.value);
        handleColorChange(event);
    };

    const handleTextRangeChange = (textName, newRange) => {
        Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
            if (isActive) {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const updatedXRange = Object.prototype.hasOwnProperty.call(newRange, "x") ? newRange.x as [number, number] : xRanges[canvasName];
                    const updatedYRange = Object.prototype.hasOwnProperty.call(newRange, "y") ? newRange.y as [number, number] : yRanges[canvasName];
                    updateRange(canvasName, updatedXRange, updatedYRange);
                }
            }
        });
    };

    const handleXRangeChange = (event, newValue) => {
        const updatedRange = { x: newValue };
        const textName = event.target.name;
        handleTextRangeChange(textName, updatedRange);
    };

    const handleYRangeChange = (event, newValue) => {
        const updatedRange = { y: newValue };
        const textName = event.target.name;
        handleTextRangeChange(textName, updatedRange);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Main Text</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <DualButtonSlider
                    label="X Range"
                    name="main"
                    min={0}
                    max={320}
                    value1={initialXRange[0]}
                    value2={initialXRange[1]}
                    onChange={handleXRangeChange}
                />
                <DualButtonSlider
                    label="Y Range"
                    name="main"
                    min={0}
                    max={320}
                    value1={initialYRange[0]}
                    value2={initialYRange[1]}
                    onChange={handleYRangeChange}
                />

                <FormControl fullWidth>
                    <InputLabel>Font</InputLabel>
                    <Select value={fontFamily} name={'main'} onChange={handleLocalFontChange}>
                        <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        {/* Add more fonts here */}
                    </Select>
                </FormControl>
                <div className="py-2"></div>
                <Typography gutterBottom>Line Height</Typography>
                <Slider
                    value={lineHeightMultiplier}
                    onChange={handleLocalLineHeightChange}
                    min={100}
                    max={200}
                    valueLabelDisplay="auto"
                    name={'main'}
                />
                <div className="py-2"></div>

                <Typography gutterBottom>Color</Typography>
                <input
                    type="color"
                    value={fill}
                    onChange={handleLocalColorChange}
                    name={'main'}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default MainTextAccordion;
