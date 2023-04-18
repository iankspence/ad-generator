import { SkyBubblesThemeProvider } from '../contexts/SkyBubblesThemeContext';
import ClaimCanvas from './Content/Canvas/ClaimCanvas';
import CloseCanvas from './Content/Canvas/CloseCanvas';
import HookCanvas from './Content/Canvas/HookCanvas';
import ReviewCanvas from './Content/Canvas/ReviewCanvas';
import SkyBubblesToolbar from './Content/Toolbar/SkyBubblesToolbar';
import Toolbar from './Content/Toolbar/Toolbar';
import { Button } from '@material-ui/core';
import domtoimage from 'dom-to-image';
import React, { useState, useEffect } from 'react';

function ContentCanvas({ hooks, claims, reviews, closes }) {
    const [currentTheme, setCurrentTheme] = useState('skyBubblesCenterText');
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

    const [skyBubblesTheme, setSkyBubblesTheme] = useState({
        gradientColors: {
            color1: 'rgba(95, 195, 228, 1)',
            color2: 'rgba(88, 147, 233, 1)',
        },
        bubbleCount: 30,
        minSize: 15,
        maxSize: 50,
        updateTheme: (newTheme) => {
            setSkyBubblesTheme((prevState) => ({
                ...prevState,
                ...newTheme,
            }));
        },
    });

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
                    if (node.tagName === 'LINK' && node.rel === 'stylesheet' && node.href.startsWith('http')) {
                        return false;
                    }
                    return true;
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
        <SkyBubblesThemeProvider>
            <div className="w-full h-full flex flex-col items-center">
                <Toolbar
                    theme={currentTheme}
                    setTheme={setCurrentTheme}
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
                            hook={hooks[0]}
                            currentTheme={currentTheme}
                            key={`${hooks[0].id}-${currentTheme}`}
                            imageFile={selectedImage}
                            setActiveCanvas={() => setActiveCanvas({ type: 'hookCanvas', id: hooks[0] })}
                        />
                    </div>
                    <div id="claimCanvas" className="relative" style={{ ...squareStyle }}>
                        <ClaimCanvas claim={claims[0]} currentTheme={currentTheme} />
                    </div>
                    <div id="reviewCanvas" className="relative" style={{ ...squareStyle }}>
                        <ReviewCanvas review={reviews[0]} currentTheme={currentTheme} />
                    </div>
                    <div id="closeCanvas" className="relative" style={{ ...squareStyle }}>
                        <CloseCanvas close={closes[0]} currentTheme={currentTheme} />
                    </div>
                </div>
                {/* Download button */}
                <Button variant="contained" color="primary" onClick={downloadCanvasImages} className="mt-4">
                    Download Images
                </Button>
            </div>
        </SkyBubblesThemeProvider>
    );
}

export default ContentCanvas;
