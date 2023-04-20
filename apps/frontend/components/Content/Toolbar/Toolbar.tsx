import { THEME_NAMES } from '../../../utils/constants/themes';
import BasicSwooshToolbar from './BasicSwooshToolbar';
import SkyBubblesToolbar from './SkyBubblesToolbar';
import React from 'react';

function Toolbar({ theme, setTheme, applyToAll, activeCanvas }) {
    const themes = THEME_NAMES;
    const currentThemeIndex = themes.findIndex((t) => t === theme);

    const handleThemeSwitch = (direction) => {
        const newIndex = (currentThemeIndex + direction + themes.length) % themes.length;
        setTheme(themes[newIndex]);
    };

    const renderThemeControls = () => {
        if (theme === 'skyBubblesCenterText') {
            return <SkyBubblesToolbar applyToAll={applyToAll} activeCanvas={activeCanvas} />;
        }
        if (theme === 'basicSwoosh') {
            return <BasicSwooshToolbar />;
        }

        // Add more interface-specific controls here
    };

    return (
        <div className="w-full flex justify-between bg-gray-500 py-2 mb-4 px-4">
            <div className="flex items-center space-x-2">
                <button onClick={() => handleThemeSwitch(-1)}>&lt;</button>
                <span>{theme}</span>
                <button onClick={() => handleThemeSwitch(1)}>&gt;</button>
            </div>
            <div className="flex items-center space-x-2">{renderThemeControls()}</div>
        </div>
    );
}

export default Toolbar;
