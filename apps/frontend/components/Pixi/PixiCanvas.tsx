import * as PIXI from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const PixiCanvas = ({ width, height, id }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const app = new PIXI.Application({
            view: canvasRef.current,
            width: width,
            height: height,
            backgroundColor: 0xffffff, // Set the color to a transparent one if you need transparency, e.g., 0x00000000
        });

        // Add your PixiJS code here to customize each canvas

        return () => {
            app.destroy(true, { children: true });
        };
    }, [width, height]);

    return <canvas ref={canvasRef} id={id} />;
};

export default PixiCanvas;
