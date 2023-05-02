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

const MainTextAccordion = ({ handleFontChange, handleFontSizeChange, handleColorChange,  }) => {

    const {activeCanvases, canvasApps} = useContext(PixiContext);

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(24);
    const [fill, setFill] = useState('#000000');

    useEffect(() => {
        const activeTextStyles = Object.entries(activeCanvases)
            .filter(([canvasName, isActive]) => isActive)
            .map(([canvasName]) => {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const textObject = canvasApp.stage.getChildByName(`${canvasName}-main-text`) as PIXI.Text;
                    if (textObject) {
                        return textObject.style;
                    }
                }
                return null;
            })
            .filter((style) => style !== null);

        if (activeTextStyles.length > 0) {
            const mostCommonFontFamily = mode(activeTextStyles.map((style) => style.fontFamily));
            const mostCommonFontSize = mode(activeTextStyles.map((style) => style.fontSize));
            const mostCommonFill = mode(activeTextStyles.map((style) => style.fill));

            setFontFamily(mostCommonFontFamily || 'Arial');
            setFontSize(mostCommonFontSize || 24);
            setFill(mostCommonFill || '#000000');
        }
    }, [activeCanvases, canvasApps]);

    const mode = (arr) => {
        return arr.sort((a, b) =>
            arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
        ).pop();
    };

    const handleLocalFontChange = (event) => {
        setFontFamily(event.target.value);
        handleFontChange(event);
    };

    const handleLocalFontSizeChange = (event, newValue) => {
        setFontSize(newValue);
        handleFontSizeChange(event, newValue);
    };

    const handleLocalColorChange = (event) => {
        setFill(event.target.value);
        handleColorChange(event);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Main Text</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                <Typography gutterBottom>Font Size</Typography>
                <Slider
                    value={fontSize}
                    onChange={handleLocalFontSizeChange}
                    min={10}
                    max={60}
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
