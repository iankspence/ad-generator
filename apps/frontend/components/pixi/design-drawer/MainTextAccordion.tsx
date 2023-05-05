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
import {mode} from "../utils/mode";

const MainTextAccordion = ({ handleFontChange, handleColorChange  }) => {
    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const [fontFamily, setFontFamily] = useState('Arial');
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
                        <MenuItem value="Arial Narrow">Arial Narrow</MenuItem>
                        <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Arial Black">Arial Black</MenuItem>
                        <MenuItem value="Helvetica">Helvetica</MenuItem>
                        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        <MenuItem value="Verdana">Verdana</MenuItem>
                        <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
                        <MenuItem value="Tahoma">Tahoma</MenuItem>
                        <MenuItem value="sans-serif">sans-serif</MenuItem>
                        <MenuItem value="serif">serif</MenuItem>
                        <MenuItem value="Rockwell">Rockwell</MenuItem>
                        <MenuItem value="Hoefler Text">Hoefler Text</MenuItem>
                    </Select>
                </FormControl>
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
