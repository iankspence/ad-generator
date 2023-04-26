import { PixiContext } from '../contexts/PixiContext';
import useDownload from '../hooks/useDownload';
import { themes } from '../utils/constants/themes';
import ClaimCanvasClient from './pixi/canvas/ClaimCanvasClient';
import CloseCanvasClient from './pixi/canvas/CloseCanvasClient';
import HookCanvasClient from './pixi/canvas/HookCanvasClient';
import ReviewCanvasClient from './pixi/canvas/ReviewCanvasClient';
import React, { useCallback, useContext, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { selectedThemeId, updateSelectedThemeId } = useContext(PixiContext);

    const { hookApp, claimApp, reviewApp, closeApp } = useContext(PixiContext);
    console.log(hookApp, claimApp, reviewApp, closeApp);

    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [singleCanvasView, setSingleCanvasView] = useState(false);

    const { downloadHookApp, downloadClaimApp, downloadReviewApp, downloadCloseApp } = useDownload(1080, 1080);

    const handleDownloadButtonClick = useCallback(() => {
        downloadHookApp();
        downloadClaimApp();
        downloadReviewApp();
        downloadCloseApp();
    }, [downloadHookApp, downloadClaimApp]);

    const handleThemeChange = (event) => {
        console.log(event.target.value);
        updateSelectedThemeId(event.target.value);
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

    const handleToggleView = () => {
        setSingleCanvasView((prevSingleCanvasView) => !prevSingleCanvasView);
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

    const renderCanvas = (index, isVisible) => {
        return (
            <div
                key={index}
                className={`${singleCanvasView ? 'absolute' : 'w-1/2'} p-4 ${isVisible ? 'visible' : 'invisible'}`}
                style={
                    singleCanvasView
                        ? isVisible
                            ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
                            : { left: '-9999px' }
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
                <select
                    value={selectedThemeId}
                    onChange={handleThemeChange}
                    style={{ color: '#000', backgroundColor: '#fff' }}
                >
                    {themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                            {theme.id}
                        </option>
                    ))}
                </select>
                {singleCanvasView ? (
                    <div
                        className={`relative flex flex-wrap ${singleCanvasView ? 'justify-center' : ''} w-full h-full`}
                        style={{ minHeight: 'calc(100vh - 100px)' }} // Adjust this value to position the canvases
                    >
                        {canvases.map((_, index) => {
                            const isVisible = !singleCanvasView || index === currentCanvasIndex;
                            return renderCanvas(index, isVisible);
                        })}
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {renderCanvas(0, true)}
                        {renderCanvas(1, true)}
                        {renderCanvas(2, true)}
                        {renderCanvas(3, true)}
                    </div>
                )}
                {singleCanvasView && (
                    <>
                        <button onClick={handlePreviousCanvas}>Previous</button>
                        <button onClick={handleNextCanvas}>Next</button>
                    </>
                )}
                <button onClick={handleToggleView}>
                    {singleCanvasView ? 'Show 4 Canvas View' : 'Show Single Canvas View'}
                </button>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={handleDownloadButtonClick}>Download</button>
            </div>
        </>
    );
};
export default ContentGenerator;
