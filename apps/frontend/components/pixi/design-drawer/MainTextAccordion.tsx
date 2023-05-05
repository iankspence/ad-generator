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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';

const MainTextAccordion = ({ handleFontChange, handleColorChange, handleFontWeightChange, handleFontStyleChange, handleFontVariantChange  }) => {
    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fill, setFill] = useState('#000000');
    const [fontWeight, setFontWeight] = useState('normal');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontVariant, setFontVariant] = useState('normal');

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
            const mostCommonFontWeight = mode(activeTextStyles.map((style) => style.fontWeight));

            setFontFamily(mostCommonFontFamily || 'Arial');
            setFill(mostCommonFill || '#000000');
            setFontWeight(mostCommonFontWeight || 'normal');
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

    const handleLocalFontWeightChange = (event, newFontWeight) => {
        if (newFontWeight !== null) {
            setFontWeight(newFontWeight);
            handleFontWeightChange('main', newFontWeight);
        } else {
            setFontWeight('normal');
            handleFontWeightChange('main', 'normal');
        }
    };

    const handleLocalFontStyleChange = (event, newFontStyle) => {
        if (newFontStyle !== null) {
            setFontStyle(newFontStyle);
            handleFontStyleChange('main', newFontStyle);
            if (newFontStyle === 'italic') {
                handlePaddingChange('main', 5);
            } else {
                handlePaddingChange('main', 0);
            }
        } else {
            setFontStyle('normal');
            handleFontStyleChange('main', 'normal');
            handlePaddingChange('main', 0);
        }
    };

    const handlePaddingChange = (textType, padding) => {
        const activeTextStyles = Object.entries(activeCanvases)
            .filter(([canvasName, isActive]) => isActive)
            .map(([canvasName]) => {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textType}`) as PIXI.Text;
                    if (textObject) {
                        return textObject.style;
                    }
                }
                return null;
            })
            .filter((style) => style !== null);

        activeTextStyles.forEach((style) => {
            style.padding = padding;
        });
    }

    const handleLocalFontVariantChange = (event, newFontVariant) => {
        if (newFontVariant !== null) {
            setFontVariant(newFontVariant);
            handleFontVariantChange('main', newFontVariant);
        } else {
            setFontVariant('normal');
            handleFontVariantChange('main', 'normal');
        }
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


                <ToggleButtonGroup
                    value={fontWeight}
                    exclusive
                    onChange={handleLocalFontWeightChange}
                    aria-label="text weight"
                >
                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    value={fontStyle}
                    exclusive
                    onChange={handleLocalFontStyleChange}
                    aria-label="text style"
                >
                    <ToggleButton value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    value={fontVariant}
                    exclusive
                    onChange={handleLocalFontVariantChange}
                    aria-label="text variant"
                >
                    <ToggleButton value="small-caps" aria-label="small-caps">
                        <KeyboardCapslockIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

            </AccordionDetails>
        </Accordion>
    );
};

export default MainTextAccordion;
