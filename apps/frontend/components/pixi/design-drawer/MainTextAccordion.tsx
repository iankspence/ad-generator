import React from 'react';
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

const MainTextAccordion = ({textStyle, handleFontChange, handleFontSizeChange, handleColorChange}) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Main Text</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl fullWidth>
                    <InputLabel>Font</InputLabel>
                    <Select value={textStyle.fontFamily} onChange={handleFontChange}>
                        io               <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        {/* Add more fonts here */}
                    </Select>
                </FormControl>
                <div className="py-2"></div>
                <Typography gutterBottom>Font Size</Typography>
                <Slider
                    value={textStyle.fontSize}
                    onChange={handleFontSizeChange}
                    min={10}
                    max={60}
                    valueLabelDisplay="auto"
                />
                <div className="py-2"></div>

                <Typography gutterBottom>Color</Typography>
                <input
                    type="color"
                    value={textStyle.fill}
                    onChange={handleColorChange}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default MainTextAccordion;
