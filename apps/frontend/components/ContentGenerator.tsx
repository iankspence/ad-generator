import { useLayerContext } from '../contexts/LayerContext';
import PixiProvider, { PixiContext } from '../contexts/PixiContext';
import useDownload from '../hooks/useDownload';
import { themes } from '../utils/constants/themes';
import HookCanvasClient from './pixi/canvas/HookCanvasClient';
import React, { useCallback, useContext, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { selectedThemeId, updateSelectedThemeId } = useContext(PixiContext);
    const { layers, setLayers } = useLayerContext();
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

    const { hookApp } = useContext(PixiContext);
    const downloadCanvas = useDownload(hookApp, 'canvas.png', 1080, 1080);

    const handleDownloadButtonClick = useCallback(() => {
        downloadCanvas();
    }, [downloadCanvas]);

    const handleThemeChange = (event) => {
        console.log(event.target.value);
        updateSelectedThemeId(event.target.value);

        // if there are layers in the layer context, remove the mask layers
        if (layers.length > 0) {
            setLayers((prevLayers) => prevLayers.filter((layer) => layer.type === 'image'));
        }
    };

    return (
        <>
            <div>
                <select
                    value={selectedThemeId}
                    onChange={handleThemeChange}
                    size={1}
                    style={{ color: '#000', backgroundColor: '#fff' }} // Add inline style to set text color and background color
                >
                    {themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                            {theme.id}
                        </option>
                    ))}
                </select>
                <HookCanvasClient imageUrl={imageUrl} size={400} selectedThemeId={selectedThemeId} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={handleDownloadButtonClick}>Download</button>
            </div>
        </>
    );
};

export default ContentGenerator;
