import PropTypes from 'prop-types';
import React from 'react';

function FullImageBackground({ imageFile, currentTheme }) {
    if (currentTheme !== 'fullImageBackground' || !imageFile) {
        return null;
    }

    const imageSrc = URL.createObjectURL(imageFile);

    return (
        <div
            className="full-image-background w-full h-full"
            style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></div>
    );
}

FullImageBackground.propTypes = {
    imageFile: PropTypes.object,
    currentTheme: PropTypes.string.isRequired,
};

export default FullImageBackground;
