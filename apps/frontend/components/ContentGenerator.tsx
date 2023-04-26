import { PixiContext } from '../contexts/PixiContext';
import useDownload from '../hooks/useDownload';
import { themes } from '../utils/constants/themes';
import ClaimCanvasClient from './pixi/canvas/ClaimCanvasClient';
import CloseCanvasClient from './pixi/canvas/CloseCanvasClient';
import HookCanvasClient from './pixi/canvas/HookCanvasClient';
import ReviewCanvasClient from './pixi/canvas/ReviewCanvasClient';
import CanvasNavigation from './pixi/floating-buttons/CanvasNavigation';
import CanvasViewToggle from './pixi/floating-buttons/CanvasViewToggle';
import DownloadButton from './pixi/floating-buttons/DownloadButton';
import ImageUploadDrawer from './pixi/floating-buttons/ImageUploadDrawer';
import ThemeSelector from './pixi/floating-buttons/ThemeSelector';
import React, { useCallback, useContext, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { selectedThemeId, updateSelectedThemeId } = useContext(PixiContext);

    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [singleCanvasView, setSingleCanvasView] = useState(true);

    const handleThemeChange = (event) => {
        console.log(event.target.value);
        updateSelectedThemeId(event.target.value);
    };

    const handleToggleView = (event, newView) => {
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

    // Navigation and toggle functions
    const handlePreviousCanvas = () => {
        setCurrentCanvasIndex((prevIndex) => (prevIndex - 1 + canvases.length) % canvases.length);
    };

    const handleNextCanvas = () => {
        setCurrentCanvasIndex((prevIndex) => (prevIndex + 1) % canvases.length);
    };

    const canvases = [
        {
            title: 'Hook Canvas',
            component: (
                <HookCanvasClient
                    imageUrl={imageUrl}
                    size={400}
                    selectedThemeId={selectedThemeId}
                    canvasName={'hook'}
                />
            ),
        },
        {
            title: 'Claim Canvas',
            component: (
                <ClaimCanvasClient
                    imageUrl={imageUrl}
                    size={400}
                    selectedThemeId={selectedThemeId}
                    canvasName={'claim'}
                />
            ),
        },
        {
            title: 'Review Canvas',
            component: (
                <ReviewCanvasClient
                    imageUrl={imageUrl}
                    size={400}
                    selectedThemeId={selectedThemeId}
                    canvasName={'review'}
                />
            ),
        },
        {
            title: 'Close Canvas',
            component: (
                <CloseCanvasClient
                    imageUrl={imageUrl}
                    size={400}
                    selectedThemeId={selectedThemeId}
                    canvasName={'close'}
                />
            ),
        },
    ];

    const renderCanvas = (index) => {
        return (
            <div
                key={index}
                className={`${singleCanvasView ? 'absolute' : 'w-1/2'} p-4`}
                style={
                    singleCanvasView
                        ? index === currentCanvasIndex
                            ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
                            : { display: 'none' }
                        : {}
                }
            >
                <h1>{canvases[index].title}</h1>
                <div className="w-400 h-400">{canvases[index].component}</div>
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
                />
                <DownloadButton />
                <ImageUploadDrawer onImageUpload={handleImageUpload} />

                {singleCanvasView ? (
                    <div
                        className={`relative flex flex-wrap ${singleCanvasView ? 'justify-center' : ''} w-full h-full`}
                        style={{ minHeight: 'calc(100vh - 100px)' }} // Adjust this value to position the canvases
                    >
                        {canvases.map((_, index) => renderCanvas(index))}
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {renderCanvas(0)}
                        {renderCanvas(1)}
                        {renderCanvas(2)}
                        {renderCanvas(3)}
                    </div>
                )}
            </div>
        </>
    );
};
export default ContentGenerator;
