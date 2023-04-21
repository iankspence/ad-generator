import { PixiContext } from '../contexts/PixiContext';
import HookCanvasClient from './Pixi/Canvas/HookCanvasClient';
import ZoomableCanvas from './Pixi/ZoomableCanvas';
import React, { useContext, useState } from 'react';

const ContentGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const canvasWidth = 300;
    const canvasHeight = 300;

    const { localPosition, globalPosition, dragOffset, imagePositionRefCurrent, clickPosition, imageX, imageY } =
        useContext(PixiContext);

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
            <div></div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <ZoomableCanvas imageUrl={imageUrl} width={canvasWidth} height={canvasHeight} />
            <React.Fragment>
                <br />
                Local Position: {JSON.stringify(localPosition)}
                <br />
                Global Position: {JSON.stringify(globalPosition)}
                <br />
                Drag Offset: {JSON.stringify(dragOffset)}
                <br />
                Image Position: {JSON.stringify(imagePositionRefCurrent)}
                <br />
                Click Position: {JSON.stringify(clickPosition)}
                <br />
                Image X: {imageX}
                <br />
                Image Y: {imageY}
                <br />
            </React.Fragment>
        </div>
    );
};

export default ContentGenerator;
