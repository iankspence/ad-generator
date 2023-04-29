import { PixiContext } from '../../../contexts/PixiContext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useContext, useState } from 'react';

const ActiveCanvasButtonGroup = ({ visible }) => {
    const { activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    const handleButtonClick = (canvas) => {
        const newSelectedCanvases = { ...activeCanvases, [canvas]: !activeCanvases[canvas] };

        updateActiveCanvases(newSelectedCanvases);
    };

    return (
        <div className={`${visible ? 'flex' : 'hidden'} text-lg fixed inset-x-0 bottom-8 z-10 justify-center`}>
            <ButtonGroup disableElevation>
                <Button
                    onClick={() => handleButtonClick('hook')}
                    sx={{
                        borderColor: activeCanvases['hook'] ? 'blue' : 'grey.500',
                        color: activeCanvases['hook'] ? 'blue' : 'grey.500',
                    }}
                >
                    Hook
                </Button>
                <Button
                    onClick={() => handleButtonClick('claim')}
                    sx={{
                        borderColor: activeCanvases['claim'] ? 'blue' : 'grey.500',
                        color: activeCanvases['claim'] ? 'blue' : 'grey.500',
                    }}
                >
                    Claim
                </Button>
                <Button
                    onClick={() => handleButtonClick('review')}
                    sx={{
                        borderColor: activeCanvases['review'] ? 'blue' : 'grey.500',
                        color: activeCanvases['review'] ? 'blue' : 'grey.500',
                    }}
                >
                    Review
                </Button>
                <Button
                    onClick={() => handleButtonClick('close')}
                    sx={{
                        borderColor: activeCanvases['close'] ? 'blue' : 'grey.500',
                        color: activeCanvases['close'] ? 'blue' : 'grey.500',
                    }}
                >
                    Close
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default ActiveCanvasButtonGroup;
