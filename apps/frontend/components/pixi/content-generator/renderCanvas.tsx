import Button from "@mui/material/Button";
import {handleActiveButtonClick} from "./handleActiveButtonClick";
import React from "react";

const renderCanvas = (index, canvasSize, rightDrawerOpen, canvases, singleCanvasView, currentCanvasIndex,  activeCanvases, updateActiveCanvases) => {
    const halfGridSize = canvasSize + 10;
    const fullGridSize = 2 * canvasSize + 10;
    const leftOffset = rightDrawerOpen
        ? `calc(50% - ${fullGridSize / 2 + 200}px)`
        : `calc(50% - ${fullGridSize / 2}px)`;
    const leftPositions = [leftOffset, `calc(${leftOffset} + ${halfGridSize}px)`];
    const topPositions = [`calc(55% - ${halfGridSize}px)`, `calc(55% + 35px)`];

    const canvas = canvases[index];
    const isActive = activeCanvases[canvas.canvasName];

    return (
        <div
            key={index}
            className={singleCanvasView ? 'fixed p-4' : 'fixed p-2 grid-canvas'}
            style={
                singleCanvasView
                    ? index === currentCanvasIndex
                        ? { left: rightDrawerOpen ? `calc(50% - 200px)` : '50%', top: '50%', transform: 'translate(-50%, -50%)' }
                        : { display: 'none' }
                    : { left: leftPositions[index % 2], top: topPositions[Math.floor(index / 2)], }
            }
        >
            <Button
                onClick={() => handleActiveButtonClick(canvas.canvasName, activeCanvases, updateActiveCanvases)}
                sx={{
                    borderColor: isActive ? 'grey.100' : 'grey.800',
                    color: isActive ? 'grey.100' : 'grey.800',
                    width: '100%',
                    marginBottom: '4px',
                }}
            >
                {canvas.title}
            </Button>
            <div className={`w-${canvasSize} h-${canvasSize}`}>{canvas.component}</div>
        </div>
    );
};

export default renderCanvas;
