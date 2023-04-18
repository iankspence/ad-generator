import { CampaignContext } from '../../../contexts/CampaignContext';
import { GradientBackground } from '../Groups/GradientBackground';
import { ManyCircles } from '../Groups/ManyCircles';
import { TextRect } from '../Groups/TextRect';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

function SkyBubblesCenterText({ text, currentTheme }) {
    const { skyBubblesTheme } = useContext(CampaignContext);

    if (currentTheme !== 'skyBubblesCenterText') {
        return null;
    }

    return (
        <>
            <GradientBackground
                gradient={`linear-gradient(135deg, ${skyBubblesTheme.gradientColors.color1} 0%, ${skyBubblesTheme.gradientColors.color2} 100%)`}
            />
            <ManyCircles
                count={skyBubblesTheme.bubbleCount}
                minSize={skyBubblesTheme.minSize}
                maxSize={skyBubblesTheme.maxSize}
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
