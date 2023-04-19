import { CampaignContext } from '../../../contexts/CampaignContext';
import FullImageBackground from '../Themes/FullImageBackground';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React, { useContext } from 'react';

type CloseCanvasProps = {
    imageFile: any;
    setActiveCanvas: () => void;
};
const CloseCanvas: React.FC<CloseCanvasProps> = ({ imageFile, setActiveCanvas }) => {
    const { closePosition, closes, currentTheme } = useContext(CampaignContext);
    const closeText = closes[closePosition - 1].closeText;

    return (
        <div className="close-canvas w-full h-full">
            <SkyBubblesCenterText text={closeText} currentTheme={currentTheme} />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default CloseCanvas;
