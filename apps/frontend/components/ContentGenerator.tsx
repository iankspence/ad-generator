import HookCanvasClient from './Pixi/Canvas/HookCanvasClient';
import ZoomableCanvas from './Pixi/ZoomableCanvas';
import React, { useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const canvasWidth = 300;
    const canvasHeight = 300;

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
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <ZoomableCanvas imageUrl={imageUrl} width={canvasWidth} height={canvasHeight} />
        </div>
    );
};

export default ContentGenerator;
