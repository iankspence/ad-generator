import { PixiContext } from '../contexts/PixiContext';
// import ClaimCanvasClient from './pixi/canvas/ClaimCanvasClient';
// import CloseCanvasClient from './pixi/canvas/CloseCanvasClient';
import CanvasClient from './pixi/canvas/CanvasClient';
// import ReviewCanvasClient from './pixi/canvas/ReviewCanvasClient';
import DesignDrawer from './pixi/design-drawer/DesignDrawer';
import CanvasNavigation from './pixi/floating-buttons/CanvasNavigation';
import CanvasViewToggle from './pixi/floating-buttons/CanvasViewToggle';
import DownloadButton from './pixi/floating-buttons/DownloadButton';
import ThemeSelector from './pixi/floating-buttons/ThemeSelector';
import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import * as PIXI from 'pixi.js';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { selectedThemeId, updateSelectedThemeId, activeCanvases, updateActiveCanvases, canvasApps } = useContext(PixiContext);

    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [singleCanvasView, setSingleCanvasView] = useState(true);
    const [canvasSize] = useState(320);

    const handleThemeChange = (event) => {
        updateSelectedThemeId(event.target.value);
    };

    const handleToggleView = (event, newView) => {
        if (newView === 'single') {
            const updatedActiveCanvases = { ...activeCanvases };
            Object.keys(updatedActiveCanvases).forEach((key) => {
                updatedActiveCanvases[key] = key === canvases[currentCanvasIndex].canvasName;
            });
            updateActiveCanvases(updatedActiveCanvases);
        }
        setSingleCanvasView(newView === 'single');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePreviousCanvas = () => {
        if (currentCanvasIndex > 0) {
            const previousCanvasName = canvases[currentCanvasIndex].canvasName;
            setCurrentCanvasIndex((prevIndex) => prevIndex - 1);
            const currentCanvasName = canvases[currentCanvasIndex - 1].canvasName;
            updateActiveCanvases({ ...activeCanvases, [previousCanvasName]: false, [currentCanvasName]: true });
        }
    };

    const handleNextCanvas = () => {
        if (currentCanvasIndex < canvases.length - 1) {
            const previousCanvasName = canvases[currentCanvasIndex].canvasName;
            setCurrentCanvasIndex((prevIndex) => prevIndex + 1);
            const currentCanvasName = canvases[currentCanvasIndex + 1].canvasName;
            updateActiveCanvases({ ...activeCanvases, [previousCanvasName]: false, [currentCanvasName]: true });
        }
    };


    const handleActiveButtonClick = (canvas) => {
        const newSelectedCanvases = { ...activeCanvases, [canvas]: !activeCanvases[canvas] };

        updateActiveCanvases(newSelectedCanvases);
    };


    const canvases = [
        {
            title: 'Hook',
            canvasName: 'hook',
            component: (
                <CanvasClient
                    imageUrl={imageUrl}
                    size={canvasSize}
                    selectedThemeId={selectedThemeId}
                    canvasName={'hook'}
                />
            ),
        },
        {
            title: 'Claim',
            canvasName: 'claim',
            component: (
                <CanvasClient
                    imageUrl={imageUrl}
                    size={canvasSize}
                    selectedThemeId={selectedThemeId}
                    canvasName={'claim'}
                />
            ),
        },
        {
            title: 'Review',
            canvasName: 'review',
            component: (
                <CanvasClient
                    imageUrl={imageUrl}
                    size={canvasSize}
                    selectedThemeId={selectedThemeId}
                    canvasName={'review'}
                />
            ),
        },
        {
            title: 'Close',
            canvasName: 'close',
            component: (
                <CanvasClient
                    imageUrl={imageUrl}
                    size={canvasSize}
                    selectedThemeId={selectedThemeId}
                    canvasName={'close'}
                />
            ),
        },
    ];

    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

    const handleDrawerStateChange = (isOpen) => {
        setRightDrawerOpen(isOpen);
    };

    const renderCanvas = (index) => {
        const halfGridSize = canvasSize + 10;
        const fullGridSize = 2 * canvasSize + 10;
        const leftOffset = rightDrawerOpen
            ? `calc(50% - ${fullGridSize / 2 + 200}px)`
            : `calc(50% - ${fullGridSize / 2}px)`;
        const leftPositions = [leftOffset, `calc(${leftOffset} + ${halfGridSize}px)`];
        const topPositions = [`calc(50% - ${halfGridSize}px)`, `calc(50% + 35px)`];

        const canvas = canvases[index];
        const isActive = activeCanvases[canvas.canvasName];

        return (
            <div
                key={index}
                className={singleCanvasView ? 'fixed p-4' : 'fixed p-2 grid-canvas'}
                style={
                    singleCanvasView
                        ? index === currentCanvasIndex
                            ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
                            : { display: 'none' }
                        : {
                            left: leftPositions[index % 2],
                            top: topPositions[Math.floor(index / 2)],
                        }
                }
            >
                <Button
                    onClick={() => handleActiveButtonClick(canvas.canvasName)}
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

    return (
        <>
            <div className="w-full">
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4">
                    <ThemeSelector selectedThemeId={selectedThemeId} onThemeChange={handleThemeChange} />
                    <CanvasViewToggle singleCanvasView={singleCanvasView} onToggle={handleToggleView} />
                </div>
                <CanvasNavigation
                    onPrevious={handlePreviousCanvas}
                    onNext={handleNextCanvas}
                    visible={singleCanvasView}
                    canNavigateLeft={currentCanvasIndex > 0}
                    canNavigateRight={currentCanvasIndex < canvases.length - 1}
                />
                <DownloadButton singleCanvasView={singleCanvasView} />
                <DesignDrawer
                    onImageUpload={handleImageUpload}
                    onDrawerStateChange={handleDrawerStateChange}
                />
                <div
                    className="flex flex-col justify-center items-center w-full"
                    style={{ minHeight: 'calc(100vh - 120px)' }}
                >
                    <div className="flex">{canvases.map((_, index) => renderCanvas(index))}</div>
                </div>
            </div>
        </>
    );
};
export default ContentGenerator;
