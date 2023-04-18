import { GradientBackground } from '../Groups/GradientBackground';
import { TextRect } from '../Groups/TextRect';
import PropTypes from 'prop-types';
import React from 'react';

function EarthySquaresTopText({ text, companyName, currentTheme }) {
    if (currentTheme !== 'earthySquaresTopText') {
        return null;
    }

    return (
        <>
            <GradientBackground gradient="linear-gradient(135deg, rgba(161, 131, 97, 1) 0%, rgba(143, 92, 44, 1) 100%)" />

            {/* Branding */}
            <TextRect
                text={companyName}
                backgroundColor="rgba(255, 255, 255, 0.8)"
                textColor="#000"
                borderRadius="10px"
                styles={{
                    position: 'absolute',
                    top: 'calc(33% - 20px)',
                    left: '10%',
                    padding: '10px 20px',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    maxWidth: '80%',
                }}
            />

            {/* Rounded rectangles */}
            <div
                style={{
                    position: 'absolute',
                    top: '66%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                {text.split('\n').map((line, index) => (
                    <TextRect
                        key={index}
                        text={line}
                        backgroundColor="rgba(255, 255, 255, 0.8)"
                        textColor="#000"
                        borderRadius="10px"
                        styles={{
                            padding: '10px 20px',
                            textAlign: 'center',
                            maxWidth: '80%',
                            overflowWrap: 'break-word',
                        }}
                    />
                ))}
            </div>
        </>
    );
}

EarthySquaresTopText.propTypes = {
    text: PropTypes.any.isRequired,
    companyName: PropTypes.string.isRequired,
    currentTheme: PropTypes.string.isRequired,
};

export default EarthySquaresTopText;
