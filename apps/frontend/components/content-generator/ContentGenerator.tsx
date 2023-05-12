import { PixiContext } from '../../contexts/PixiContext';
import CanvasClient from '../pixi/canvas/CanvasClient';
import DesignDrawer from '../pixi/design-drawer/DesignDrawer';
import CanvasNavigation from '../pixi/floating-buttons/CanvasNavigation';
import CanvasViewToggle from '../pixi/floating-buttons/CanvasViewToggle';
import DownloadButton from '../pixi/floating-buttons/DownloadButton';
import ThemeSelector from '../pixi/floating-buttons/ThemeSelector';
import React, { useContext, useState } from 'react';
import {handleThemeChange} from "./handleThemeChange";
import {handleToggleView} from "./handleToggleView";
import {handleImageUpload} from "./handleImageUpload";
import {handlePreviousCanvas} from "./handlePreviousCanvas";
import {handleNextCanvas} from "./handleNextCanvas";
import {handleRightDrawerOpen} from "./handleRightDrawerOpen";
import renderCanvas from "./renderCanvas";

const ContentGenerator = () => {
    const { selectedThemeId, updateSelectedThemeId, activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    const [imageUrl, setImageUrl] = useState(null);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [singleCanvasView, setSingleCanvasView] = useState(true);
    const [canvasSize] = useState(320);

    const canvases = [
        {
            title: 'Hook',
            canvasName: 'hook',
            component: (
                <CanvasClient
                    imageUrl={imageUrl}
                    size={canvasSize}
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
                    canvasName={'close'}
                />
            ),
        },
    ];

    return (
        <>
            <div className="w-full">
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4">
                    <ThemeSelector selectedThemeId={selectedThemeId} onThemeChange={(event) => handleThemeChange(event, updateSelectedThemeId)} />
                    <CanvasViewToggle singleCanvasView={singleCanvasView} onToggle={(event) => handleToggleView(event, singleCanvasView, setSingleCanvasView, activeCanvases, canvases, currentCanvasIndex, updateActiveCanvases) } />
                </div>
                <CanvasNavigation
                    onPrevious={() => handlePreviousCanvas(currentCanvasIndex, setCurrentCanvasIndex, canvases, activeCanvases, updateActiveCanvases)}
                    onNext={() => handleNextCanvas(currentCanvasIndex, setCurrentCanvasIndex, canvases, activeCanvases, updateActiveCanvases)}
                    visible={singleCanvasView}
                    canNavigateLeft={currentCanvasIndex > 0}
                    canNavigateRight={currentCanvasIndex < canvases.length - 1}
                />
                <DownloadButton singleCanvasView={singleCanvasView} />
                <DesignDrawer
                    onImageUpload={(event) => handleImageUpload(event, setImageUrl)}
                    onDrawerStateChange={() => handleRightDrawerOpen(rightDrawerOpen, setRightDrawerOpen)}
                />
                <div
                    className="flex flex-col justify-center items-center w-full"
                    style={{ minHeight: 'calc(100vh - 120px)' }}
                >
                    <div className="flex">{canvases.map((_, index) => renderCanvas(index, canvasSize, rightDrawerOpen, canvases, singleCanvasView, currentCanvasIndex, activeCanvases, updateActiveCanvases ))}</div>
                </div>
            </div>
        </>
    );
};
export default ContentGenerator;
