import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React from 'react';

function CloseCanvas({ close, currentTheme }) {
    return (
        <div className="close-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a close'} currentTheme={currentTheme} />
        </div>
    );
}

export default CloseCanvas;
