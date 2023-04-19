import { CampaignContext } from '../contexts/CampaignContext';
import { THEME_NAMES } from '../utils/constants/themes';
import ClaimCanvas from './Content/Canvas/ClaimCanvas';
import CloseCanvas from './Content/Canvas/CloseCanvas';
import HookCanvas from './Content/Canvas/HookCanvas';
import ReviewCanvas from './Content/Canvas/ReviewCanvas';
import Toolbar from './Content/Toolbar/Toolbar';
import { Button } from '@material-ui/core';
import domtoimage from 'dom-to-image';
import React, { useContext, useState } from 'react';

function ContentCanvas() {
    const { copies, hooks, claims, reviews, closes, currentTheme, updateCurrentTheme } = useContext(CampaignContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [applyToAll, setApplyToAll] = useState(true);
    const [activeCanvas, setActiveCanvas] = useState({ type: null, id: null });

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const squareStyle: React.CSSProperties = {
        width: '100%',
        position: 'relative' as const,
        background: 'white',
        border: '0px solid gray',
        aspectRatio: '1/1',
    };

    async function downloadCanvasImages() {
        const canvasIds = ['hookCanvas', 'claimCanvas', 'reviewCanvas', 'closeCanvas'];

        for (const id of canvasIds) {
            const node = document.getElementById(id);

            // Use a higher quality scale value for better image quality
            const scale = 3.6;

            const config = {
                width: node.offsetWidth * scale,
                height: node.offsetHeight * scale,
                style: {
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                },
                quality: 1,
                filter: (node) => {
                    // Exclude external stylesheets from rendering process
                    return !(node.tagName === 'LINK' && node.rel === 'stylesheet' && node.href.startsWith('http'));
                },
            };

            const dataUrl = await domtoimage.toPng(node, config);

            const link = document.createElement('a');
            link.download = `${id}.png`;
            link.href = dataUrl;
            link.click();
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center">
            <Toolbar
                theme={currentTheme}
                setTheme={updateCurrentTheme}
                applyToAll={applyToAll}
                activeCanvas={activeCanvas}
            />

            {/* Image selector */}
            <input type="file" onChange={handleImageChange} />

            {/* 4-image canvas */}
            <div
                className="canvas-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 300px))', // Change the 300px to your preferred size
                    gap: '4px',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div id="hookCanvas" className="relative" style={{ ...squareStyle }}>
                    <HookCanvas
                        imageFile={selectedImage}
                        setActiveCanvas={() => setActiveCanvas({ type: 'hookCanvas', id: hooks[0]._id })}
                    />
                </div>
                <div id="claimCanvas" className="relative" style={{ ...squareStyle }}>
                    <ClaimCanvas
                        imageFile={selectedImage}
                        setActiveCanvas={() => setActiveCanvas({ type: 'claimCanvas', id: claims[0]._id })}
                    />
                </div>
                <div id="reviewCanvas" className="relative" style={{ ...squareStyle }}>
                    <ReviewCanvas
                        imageFile={selectedImage}
                        setActiveCanvas={() => setActiveCanvas({ type: 'reviewCanvas', id: reviews[0]._id })}
                    />
                </div>
                <div id="closeCanvas" className="relative" style={{ ...squareStyle }}>
                    <CloseCanvas
                        imageFile={selectedImage}
                        setActiveCanvas={() => setActiveCanvas({ type: 'closeCanvas', id: closes[0]._id })}
                    />
                </div>
            </div>
            {/* Download button */}
            <Button variant="contained" color="primary" onClick={downloadCanvasImages} className="mt-4">
                Download Images
            </Button>
        </div>
    );
}

export default ContentCanvas;
