import EarthySquaresTopText from '../Themes/EarthySquaresTopText';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React from 'react';

function ReviewCanvas({ review, currentTheme }) {
    return (
        <div className="review-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a review'} currentTheme={currentTheme} />
            <EarthySquaresTopText
                text={'This is a review'}
                companyName={'Redefined Health'}
                currentTheme={currentTheme}
            />
        </div>
    );
}

export default ReviewCanvas;
