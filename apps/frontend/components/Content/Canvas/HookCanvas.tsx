import FullImageBackground from '../Themes/FullImageBackground';
import SkyBubblesCenterText from '../Themes/SkyBubblesCenterText';
import React, { useContext } from 'react';

type HookCanvasProps = {
    hook: any;
    currentTheme: string;
    imageFile: any;
    setActiveCanvas: () => void;
};
const HookCanvas: React.FC<HookCanvasProps> = ({ hook, currentTheme, imageFile, setActiveCanvas }) => {
    return (
        <div className="hook-canvas w-full h-full">
            <SkyBubblesCenterText text={'This is a hook'} currentTheme={currentTheme} />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default HookCanvas;
