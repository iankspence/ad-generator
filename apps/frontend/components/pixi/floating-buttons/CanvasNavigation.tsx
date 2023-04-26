import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import React from 'react';

const CanvasNavigation = ({ onPrevious, onNext, visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4">
            <button
                onClick={onPrevious}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
                style={{ width: '48px', height: '48px' }}
            >
                <ArrowBackOutlinedIcon style={{ fontSize: '24px' }} />
            </button>
            <button
                onClick={onNext}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
                style={{ width: '48px', height: '48px' }}
            >
                <ArrowForwardOutlinedIcon style={{ fontSize: '24px' }} />
            </button>
        </div>
    );
};

export default CanvasNavigation;
