import { TextField } from '@mui/material';
import React from 'react';

interface SidebarTextAreaProps {
    textArray: string[];
    position: number;
    rows: number;
}

const SidebarTextArea: React.FC<SidebarTextAreaProps> = ({ textArray, position, rows }) => {
    const text = textArray?.[position - 1] || '';

    return (
        <div className="w-full px-4 pb-4">
            <TextField
                fullWidth
                multiline
                rows={rows}
                InputProps={{
                    readOnly: true,
                    style: { fontSize: '0.8rem' }, // Adjust the font size here
                }}
                variant="outlined"
                value={text}
            />
        </div>
    );
};

export default SidebarTextArea;
