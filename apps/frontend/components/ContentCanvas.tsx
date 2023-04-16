import ClaimCanvas from './Content/Canvas/ClaimCanvas';
import CloseCanvas from './Content/Canvas/CloseCanvas';
import HookCanvas from './Content/Canvas/HookCanvas';
import ReviewCanvas from './Content/Canvas/ReviewCanvas';
import { Button } from '@material-ui/core';
import React from 'react';

function ContentCanvas({ hooks, claims, reviews, closes }) {
    const squareStyle = {
        width: '100%',
        position: 'relative',
        background: 'white',
        border: '1px solid gray',
        aspectRatio: '1/1',
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* Toolbar */}
            <div className="w-full flex justify-center bg-gray-500 py-2 mb-4">
                <Button variant="contained" color="primary">
                    Button 1
                </Button>
                <Button variant="contained" color="primary" className="mx-2">
                    Button 2
                </Button>
                <Button variant="contained" color="primary">
                    Button 3
                </Button>
            </div>

            {/* 4-image canvas */}
            <div
                className="canvas-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 300px))', // Change the 300px to your preferred size
                    gap: '4px',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="relative" style={squareStyle as any}>
                    <HookCanvas hook={hooks[0]} />
                </div>
                <div className="relative" style={squareStyle as any}>
                    <ClaimCanvas claim={claims[0]} />
                </div>
                <div className="relative" style={squareStyle as any}>
                    <ReviewCanvas review={reviews[0]} />
                </div>
                <div className="relative" style={squareStyle as any}>
                    <CloseCanvas close={closes[0]} />
                </div>
            </div>
        </div>
    );
}

export default ContentCanvas;
