import { CampaignContext } from '../../../contexts/CampaignContext';
import FullImageBackground from '../Themes/FullImageBackground';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React, { useContext } from 'react';

type ReviewCanvasProps = {
    imageFile: any;
    setActiveCanvas: () => void;
};
const ReviewCanvas: React.FC<ReviewCanvasProps> = ({ imageFile, setActiveCanvas }) => {
    const { reviewPosition, reviews, currentTheme } = useContext(CampaignContext);
    const reviewText = reviews[reviewPosition - 1].reviewText;

    return (
        <div className="review-canvas w-full h-full">
            <SkyBubblesCenterText text={reviewText} currentTheme={currentTheme} />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default ReviewCanvas;
