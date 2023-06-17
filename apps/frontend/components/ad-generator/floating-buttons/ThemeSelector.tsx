import { themes } from '../../../utils/constants/themes';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import React from 'react';

const ThemeSelector = ({ selectedThemeId, onThemeChange }) => {
    return (
        <FormControl variant="outlined" size="small" className="mr-2">
            <InputLabel></InputLabel>
            <Select
                value={selectedThemeId}
                onChange={onThemeChange}
                style={{ color: '#000', backgroundColor: '#fff', border: '1px solid #000' }}
            >
                {themes.map((theme) => (
                    <MenuItem key={theme.id} value={theme.id}>
                        {theme.id}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ThemeSelector;
