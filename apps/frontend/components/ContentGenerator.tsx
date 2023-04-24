import { useLayerContext } from '../contexts/LayerContext';
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
    const { layers, setLayers } = useLayerContext();

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

        // if there are layers in the layer context, remove the mask layers
        if (layers.length > 0) {
            setLayers((prevLayers) => prevLayers.filter((layer) => layer.type === 'image'));
        }
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
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 p-4">
                        <h1>Hook Canvas</h1>
                        <div className="w-400 h-400">
                            <HookCanvasClient
                                imageUrl={imageUrl}
                                size={400}
                                selectedThemeId={selectedThemeId}
                                canvasName={'hook'}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1>Claim Canvas</h1>
                        <div className="w-400 h-400">
                            <ClaimCanvasClient
                                imageUrl={imageUrl}
                                size={400}
                                selectedThemeId={selectedThemeId}
                                canvasName={'claim'}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1>Review Canvas</h1>
                        <div className="w-400 h-400">
                            <ReviewCanvasClient
                                imageUrl={imageUrl}
                                size={400}
                                selectedThemeId={selectedThemeId}
                                canvasName={'review'}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1>Close Canvas</h1>
                        <div className="w-400 h-400">
                            <CloseCanvasClient
                                imageUrl={imageUrl}
                                size={400}
                                selectedThemeId={selectedThemeId}
                                canvasName={'close'}
                            />
                        </div>
                    </div>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={handleDownloadButtonClick}>Download</button>
            </div>
        </>
    );
};

export default ContentGenerator;
