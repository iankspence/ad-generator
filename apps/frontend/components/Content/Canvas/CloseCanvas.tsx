import EarthySquaresTopText from '../Themes/EarthySquaresTopText';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React from 'react';

function CloseCanvas({ close, currentTheme }) {
    return (
        <div className="close-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a close'} currentTheme={currentTheme} />
            <EarthySquaresTopText
                text={'This is a close'}
                companyName={'Redefined Health'}
                currentTheme={currentTheme}
            />
        </div>
    );
}

export default CloseCanvas;
