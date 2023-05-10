import { PixiContext } from '../../../../../../contexts/PixiContext';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import {handleActiveCanvasChange} from "./handleActiveCanvasChange";

export const ActiveCanvasButtonGroup = () => {
    const { activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    return (
        <div className={'grid grid-cols-2 gap-1 text-lg z-10 pb-4'}>
            <Button
                onClick={() => handleActiveCanvasChange('hook', activeCanvases, updateActiveCanvases)}
                sx={{
                    borderColor: activeCanvases['hook'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['hook'] ? 'grey.800' : 'grey.200',
                }}
            >
                Hook
            </Button>
            <Button
                onClick={() => handleActiveCanvasChange('claim', activeCanvases, updateActiveCanvases)}
                sx={{
                    borderColor: activeCanvases['claim'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['claim'] ? 'grey.800' : 'grey.200',
                }}
            >
                Claim
            </Button>
            <Button
                onClick={() => handleActiveCanvasChange('review', activeCanvases, updateActiveCanvases)}
                sx={{
                    borderColor: activeCanvases['review'] ? 'grey.800' : 'grey.200',
                    color: activeCanvases['review'] ? 'grey.800' : 'grey.200',
                }}
            >
                Review
            </Button>
            <Button
                onClick={() => handleActiveCanvasChange('close', activeCanvases, updateActiveCanvases)}
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
