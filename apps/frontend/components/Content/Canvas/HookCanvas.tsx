import { CampaignContext } from '../../../contexts/CampaignContext';
import FullImageBackground from '../Themes/FullImageBackground';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React, { useContext } from 'react';

type HookCanvasProps = {
    imageFile: any;
    setActiveCanvas: () => void;
};
const HookCanvas: React.FC<HookCanvasProps> = ({ imageFile, setActiveCanvas }) => {
    const { hookPosition, hooks, currentTheme } = useContext(CampaignContext);
    const hookText = hooks[hookPosition - 1].hookText;

    return (
        <div className="hook-canvas w-full h-full">
            <SkyBubblesCenterText text={hookText} currentTheme={currentTheme} />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default HookCanvas;
