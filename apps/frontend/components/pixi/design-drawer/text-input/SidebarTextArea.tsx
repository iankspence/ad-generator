import { TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';

const SidebarTextArea = ({
                             textArray,
                             position,
                             rows,
                             onEditStart,
                             onEditSubmit,
                             onEditRestore,
                             canvasName,
                         }) => {
    const text = textArray?.[position - 1] || '';

    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');

    const handleEditStart = () => {
        onEditStart();
        setEditMode(true);
        setEditedText(text);
    };

    const handleEditSubmit = () => {
        console.log('handleEditSubmit: ', editedText, canvasName);
        onEditSubmit(editedText, canvasName);
        setEditMode(false);
    };

    const handleEditRestore = () => {
        onEditRestore();
        setEditedText('');
    };

    return (
        <div className="w-full px-4 pb-4">
            <TextField
                fullWidth
                multiline
                rows={rows}
                InputProps={{
                    readOnly: !editMode,
                    style: { fontSize: '0.8rem' },
                }}
                variant="outlined"
                value={editMode ? editedText : text}
                onChange={(e) => setEditedText(e.target.value)}
            />
            {!editMode && (
                <IconButton onClick={handleEditStart}>
                    <EditIcon />
                </IconButton>
            )}
            {editMode && (
                <>
                    <IconButton onClick={handleEditSubmit}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleEditRestore}>
                        <RestoreIcon />
                    </IconButton>
                </>
            )}
        </div>
    );
};

export default SidebarTextArea;
