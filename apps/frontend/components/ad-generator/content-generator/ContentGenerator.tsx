import { PixiContext } from '../../../contexts/PixiContext';
import CanvasClient from '../canvas/CanvasClient';
import DesignDrawer from '../design-drawer/DesignDrawer';
import CanvasNavigation from '../floating-buttons/CanvasNavigation';
import CanvasViewToggle from '../floating-buttons/CanvasViewToggle';
import SaveButton from '../floating-buttons/SaveButton';
import ThemeSelector from '../floating-buttons/ThemeSelector';
import React, { useContext, useState } from 'react';
import {handleThemeChange} from "./utils/handleThemeChange";
import {handleToggleView} from "./utils/handleToggleView";
import {handlePreviousCanvas} from "./utils/handlePreviousCanvas";
import {handleNextCanvas} from "./utils/handleNextCanvas";
import renderCanvas from "./RenderCanvas";
import FreezeEditAttributesButton from '../floating-buttons/FreezeEditAttributesButton';
import AdCopyDisplay from '../ad-copy-display/AdCopyDisplay';

const ContentGenerator = ({ primaryColor, secondaryColor }) => {
    const { selectedThemeId, updateSelectedThemeId, activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [singleCanvasView, setSingleCanvasView] = useState(false);
    const [canvasSize] = useState(320);

    const canvases = [
        {
            title: 'Hook',
            canvasName: 'hook',
            component: (
                <CanvasClient
                    size={canvasSize}
                    canvasName={'hook'}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            ),
        },
        {
            title: 'Claim',
            canvasName: 'claim',
            component: (
                <CanvasClient
                    size={canvasSize}
                    canvasName={'claim'}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            ),
        },
        {
            title: 'Review',
            canvasName: 'review',
            component: (
                <CanvasClient
                    size={canvasSize}
                    canvasName={'review'}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            ),
        },
        {
            title: 'Close',
            canvasName: 'close',
            component: (
                <CanvasClient
                    size={canvasSize}
                    canvasName={'close'}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            ),
        },
    ];

    return (
        <>
            <div className="w-full">
                <AdCopyDisplay
                    rightDrawerOpen={rightDrawerOpen}
                    singleCanvasView={singleCanvasView}
                />

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
                <SaveButton singleCanvasView={singleCanvasView} />
                <FreezeEditAttributesButton singleCanvasView={singleCanvasView} />
                <DesignDrawer
                    rightDrawerOpen={rightDrawerOpen}
                    setRightDrawerOpen={setRightDrawerOpen}
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
