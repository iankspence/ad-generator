import { PixiContext } from '../../../contexts/PixiContext';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import React, { useContext } from 'react';

export const CanvasNavigation = ({ onPrevious, onNext, visible, canNavigateLeft, canNavigateRight }) => {
    const { activeCanvases, updateActiveCanvases } = useContext(PixiContext);

    const handleButtonClick = (canvas) => {
        const newSelectedCanvases = { ...activeCanvases, [canvas]: !activeCanvases[canvas] };

        updateActiveCanvases(newSelectedCanvases);
    };

    return (
        <div className={`${visible ? 'flex' : 'hidden'} fixed inset-x-0 bottom-8 z-10 justify-center`}>
            <div className="space-x-4">
                <button
                    onClick={onPrevious}
                    className={`bg-white hover:bg-gray-300 text-black p-2 rounded-full ${
                        canNavigateLeft ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!canNavigateLeft}
                >
                    <ArrowBackOutlinedIcon />
                </button>
                <button
                    onClick={onNext}
                    className={`bg-white hover:bg-gray-300 text-black p-2 rounded-full ${
                        canNavigateRight ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!canNavigateRight}
                >
                    <ArrowForwardOutlinedIcon />
                </button>
            </div>
        </div>
    );
};
export default CanvasNavigation;
