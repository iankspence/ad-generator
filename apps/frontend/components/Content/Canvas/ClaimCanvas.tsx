import { CampaignContext } from '../../../contexts/CampaignContext';
import BasicSwoosh from '../Themes/BasicSwoosh';
import FullImageBackground from '../Themes/FullImageBackground';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React, { useContext } from 'react';

type ClaimCanvasProps = {
    imageFile: any;
    setActiveCanvas: () => void;
};
const ClaimCanvas: React.FC<ClaimCanvasProps> = ({ imageFile, setActiveCanvas }) => {
    const { claimPosition, claims, currentTheme } = useContext(CampaignContext);
    const claimText = claims[claimPosition - 1].claimText;

    return (
        <div className="claim-canvas w-full h-full">
            <SkyBubblesCenterText text={claimText} currentTheme={currentTheme} />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
            <BasicSwoosh currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default ClaimCanvas;
