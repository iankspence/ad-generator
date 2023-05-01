import { PixiContext } from '../../../contexts/PixiContext';
import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';

export const ActiveCanvasButtonGroup = ({ visible }) => {
    const { activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    const handleButtonClick = (canvas) => {
        const newSelectedCanvases = { ...activeCanvases, [canvas]: !activeCanvases[canvas] };

        updateActiveCanvases(newSelectedCanvases);
    };

    return (
        <div className={`${visible ? 'grid grid-cols-2 gap-1' : 'hidden'} text-lg z-10 pb-4`}>
            <Button
                onClick={() => handleButtonClick('hook')}
                sx={{
                    borderColor: activeCanvases['hook'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['hook'] ? 'grey.800' : 'grey.200',
                }}
            >
                Hook
            </Button>
            <Button
                onClick={() => handleButtonClick('claim')}
                sx={{
                    borderColor: activeCanvases['claim'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['claim'] ? 'grey.800' : 'grey.200',
                }}
            >
                Claim
            </Button>
            <Button
                onClick={() => handleButtonClick('review')}
                sx={{
                    borderColor: activeCanvases['review'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['review'] ? 'grey.800' : 'grey.200',
                }}
            >
                Review
            </Button>
            <Button
                onClick={() => handleButtonClick('close')}
                sx={{
                    borderColor: activeCanvases['close'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['close'] ? 'grey.800' : 'grey.200',
                }}
            >
                Close
            </Button>
        </div>
    );
};

export default ActiveCanvasButtonGroup;
