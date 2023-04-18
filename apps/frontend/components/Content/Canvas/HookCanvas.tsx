import SkyBubblesThemeContext from '../../../contexts/SkyBubblesThemeContext';
import EarthySquaresTopText from '../Themes/EarthySquaresTopText';
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
    const { gradientColors } = useContext(SkyBubblesThemeContext);

    return (
        <div className="hook-canvas w-full h-full">
            <SkyBubblesCenterText
                text={'This is a hook'}
                currentTheme={currentTheme}
                key={JSON.stringify(gradientColors)}
            />
            <EarthySquaresTopText
                text={'This is a hook'}
                companyName={'Redefined Health'}
                currentTheme={currentTheme}
            />
            <FullImageBackground currentTheme={currentTheme} imageFile={imageFile} />
        </div>
    );
};

export default HookCanvas;
