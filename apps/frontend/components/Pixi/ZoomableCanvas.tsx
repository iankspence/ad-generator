import PixiContext from '../../contexts/PixiContext';
import useDownload from '../../hooks/useDownload';
import useZoom from '../../hooks/useZoom';
import HookCanvas from './Canvas/HookCanvas';
import React, { useCallback, useContext } from 'react';

const ZoomableCanvas = ({ imageUrl, width = 300, height = 300 }) => {
    const app = useContext(PixiContext);

    const downloadCanvas = useDownload(app, 'canvas.png', 1080, 1080);

    const handleDownloadButtonClick = useCallback(() => {
        downloadCanvas();
    }, [downloadCanvas]);

    return (
        <div>
            <HookCanvas imageUrl={imageUrl} />
            <button onClick={handleDownloadButtonClick}>Download</button>
        </div>
    );
};

export default ZoomableCanvas;
