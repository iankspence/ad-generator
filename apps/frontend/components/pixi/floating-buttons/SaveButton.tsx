import useSave from '../../../hooks/useSave/useSave';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import BuildIcon from '@mui/icons-material/Build';
import { useContext } from 'react';
import { PixiContext } from '../../../contexts/PixiContext';

const SaveButton = ({singleCanvasView}) => {
    const { editAd } = useContext(PixiContext);
    const { save, isLoading } = useSave();
    const handleSaveButtonClick = () => {
        save();
    };

    return (
        <div
            className={`fixed bottom-8 right-8 z-10 text-black rounded-full ${isLoading ? "bg-gray-400" : "bg-white hover:bg-gray-300"}`}
            style={{
                zIndex: singleCanvasView ? 10 : 20,
            }}
        >
            <IconButton
                onClick={handleSaveButtonClick}
                className="p-2 rounded-full"
                style={{
                    color: 'black',
                }}
                disabled={isLoading}
            >
                {editAd ? <BuildIcon fontSize="medium" color="inherit" /> : <SaveIcon fontSize="medium" color="inherit" />}
            </IconButton>
        </div>
    );
};

export default SaveButton;
