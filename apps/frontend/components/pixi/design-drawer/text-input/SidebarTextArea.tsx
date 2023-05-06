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

    const handleEditHide = () => {
        setEditMode(false);
    };

    const handleEditStart = () => {
        onEditStart();
        setEditMode(true);
        setEditedText(text);
    };

    const handleEditSubmit = () => {
        onEditSubmit(editedText, canvasName);
        setEditMode(false);
    };

    const handleEditRestore = () => {
        onEditRestore();
        onEditSubmit('', canvasName);
        setEditMode(false);
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
                    style: {
                        fontSize: '0.8rem',
                        backgroundColor: editMode ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    },
                }}
                variant="outlined"
                value={editMode ? editedText : text}
                onChange={(e) => setEditedText(e.target.value)}
            />
            {!editMode && (
                <IconButton onClick={handleEditStart}>
                    <EditIcon color={editMode ? 'primary' : 'inherit'} />
                </IconButton>
            )}
            {editMode && (
                <>
                    <IconButton onClick={handleEditHide}>
                        <EditIcon color={editMode ? 'primary' : 'inherit'} />
                    </IconButton>
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
