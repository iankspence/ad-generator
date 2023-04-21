import useDownload from '../hooks/useDownload';
import HookCanvasClient from './Pixi/Canvas/HookCanvasClient';
import React, { useCallback, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [app, setApp] = useState(null);

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

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <HookCanvasClient imageUrl={imageUrl} app={app} setApp={setApp} size={400} />
            <button onClick={handleDownloadButtonClick}>Download</button>
        </div>
    );
};

export default ContentGenerator;
