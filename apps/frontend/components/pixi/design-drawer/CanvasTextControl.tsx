import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useState } from 'react';

const CanvasTextControl = ({ onCanvasSelection }) => {
    const [selectedCanvases, setSelectedCanvases] = useState({
        hook: true,
        claim: true,
        review: true,
        close: true,
    });
    const handleButtonClick = (canvas) => {
        const newSelectedCanvases = { ...selectedCanvases, [canvas]: !selectedCanvases[canvas] };

        setSelectedCanvases(newSelectedCanvases);

        if (onCanvasSelection) {
            onCanvasSelection(newSelectedCanvases);
        }
    };

    return (
        <ButtonGroup disableElevation>
            <Button
                onClick={() => handleButtonClick('hook')}
                sx={{
                    borderColor: selectedCanvases['hook'] ? 'blue' : 'grey.500',
                    color: selectedCanvases['hook'] ? 'blue' : 'grey.500',
                }}
            >
                Hook
            </Button>
            <Button
                onClick={() => handleButtonClick('claim')}
                sx={{
                    borderColor: selectedCanvases['claim'] ? 'blue' : 'grey.500',
                    color: selectedCanvases['claim'] ? 'blue' : 'grey.500',
                }}
            >
                Claim
            </Button>
            <Button
                onClick={() => handleButtonClick('review')}
                sx={{
                    borderColor: selectedCanvases['review'] ? 'blue' : 'grey.500',
                    color: selectedCanvases['review'] ? 'blue' : 'grey.500',
                }}
            >
                Review
            </Button>
            <Button
                onClick={() => handleButtonClick('close')}
                sx={{
                    borderColor: selectedCanvases['close'] ? 'blue' : 'grey.500',
                    color: selectedCanvases['close'] ? 'blue' : 'grey.500',
                }}
            >
                Close
            </Button>
        </ButtonGroup>
    );
};

export default CanvasTextControl;
