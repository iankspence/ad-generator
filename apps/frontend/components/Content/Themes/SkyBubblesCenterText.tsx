import SkyBubblesThemeContext from '../../../contexts/SkyBubblesThemeContext';
import { GradientBackground } from '../Groups/GradientBackground';
import { ManyCircles } from '../Groups/ManyCircles';
import { TextRect } from '../Groups/TextRect';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

function SkyBubblesCenterText({ text, currentTheme }) {
    const { gradientColors, bubbleCount, minSize, maxSize } = useContext(SkyBubblesThemeContext);
    console.log(
        'gradientColors',
        gradientColors,
        'bubbleCount',
        bubbleCount,
        'minSize',
        minSize,
        'maxSize',
        maxSize,
        'currentTheme',
        currentTheme,
        'text',
        text,
        'SkyBubblesCenterText',
    );
    if (currentTheme !== 'skyBubblesCenterText') {
        return null;
    }

    return (
        <>
            <GradientBackground
                gradient={`linear-gradient(135deg, ${gradientColors.color1} 0%, ${gradientColors.color2} 100%)`}
            />
            <ManyCircles
                count={bubbleCount}
                minSize={minSize}
                maxSize={maxSize}
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.6)']}
            />
            <TextRect
                text={text}
                backgroundColor="rgba(255, 255, 255, 0.8)"
                textColor="#000"
                borderRadius="10px"
                styles={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '40px',
                    maxWidth: '80%',
                    textAlign: 'center',
                }}
            />
        </>
    );
}

SkyBubblesCenterText.propTypes = {
    text: PropTypes.any.isRequired,
    currentTheme: PropTypes.string.isRequired,
};

export default SkyBubblesCenterText;
