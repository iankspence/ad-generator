import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { PixiContext } from '../../../contexts/PixiContext';
import WavesIcon from '@mui/icons-material/Waves';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const FreezeEditAttributesButton = ({singleCanvasView}) => {
    const { freezeEditAdAttributes, updateFreezeEditAdAttributes, showFreezeEditAttributeButton } = useContext(PixiContext);

    const handleFreezeUpdate = () => {
        updateFreezeEditAdAttributes(!freezeEditAdAttributes)
    }

    return (
        <>
            { showFreezeEditAttributeButton && (
                <div
                    className="fixed bottom-24 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full "
                    style={{
                        zIndex: singleCanvasView ? 10 : 20,
                    }}
                >
                    <IconButton
                        onClick={handleFreezeUpdate}
                        className="bg-white hover:bg-gray-300 text-black p-2 rounded-full"
                        style={{
                            color: 'black',
                        }}
                    >
                        {freezeEditAdAttributes ? <AcUnitIcon fontSize="medium" color="inherit" /> : <WavesIcon fontSize="medium" color="inherit" />}
                    </IconButton>
                </div>
            )}
        </>

    );
};

export default FreezeEditAttributesButton;
