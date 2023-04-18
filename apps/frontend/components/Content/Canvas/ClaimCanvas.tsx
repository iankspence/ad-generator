import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React from 'react';

function ClaimCanvas({ claim, currentTheme }) {
    return (
        <div className="claim-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a claim'} currentTheme={currentTheme} />
        </div>
    );
}

export default ClaimCanvas;
