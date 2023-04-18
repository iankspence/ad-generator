import EarthySquaresTopText from '../Themes/EarthySquaresTopText';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React from 'react';

function ClaimCanvas({ claim, currentTheme }) {
    return (
        <div className="claim-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a claim'} currentTheme={currentTheme} />
            <EarthySquaresTopText
                text={'This is a claim'}
                companyName={'Redefined Health'}
                currentTheme={currentTheme}
            />
        </div>
    );
}

export default ClaimCanvas;
