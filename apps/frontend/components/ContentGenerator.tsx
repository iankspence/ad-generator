import useDownload from '../hooks/useDownload';
import { themes } from '../utils/constants/themes';
import HookCanvasClient from './pixi/canvas/HookCanvasClient';
import React, { useCallback, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [app, setApp] = useState(null);
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');

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

    const downloadCanvas = useDownload(app, 'canvas.png', 1080, 1080);

    const handleDownloadButtonClick = useCallback(() => {
        downloadCanvas();
    }, [downloadCanvas]);

    const handleThemeChange = (event) => {
        setSelectedThemeId(event.target.value);
    };

    const getSelectedThemeSettings = () => {
        const theme = themes.find((t) => t.id === selectedThemeId);
        return theme.settings.shortCanvas;
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <select value={selectedThemeId} onChange={handleThemeChange}>
                {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                        {theme.name}
                    </option>
                ))}
            </select>
            <HookCanvasClient
                imageUrl={imageUrl}
                app={app}
                setApp={setApp}
                size={400}
                themeSettings={getSelectedThemeSettings()}
            />
            <button onClick={handleDownloadButtonClick}>Download</button>
        </div>
    );
};

export default ContentGenerator;
