import useSave from '../../../hooks/useSave';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

const SaveButton = ({singleCanvasView}) => {
    const { saveAllApps } = useSave();
    const handleSaveButtonClick = () => {
        saveAllApps();
    };

    return (
        <div
            className="fixed bottom-8 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full "
            style={{
                zIndex: singleCanvasView ? 10 : 20,
            }}
        >
            <IconButton
                onClick={handleSaveButtonClick}
                className="bg-white hover:bg-gray-300 text-black p-2 rounded-full"
                style={{
                    color: 'black',
                }}
            >
                <SaveIcon fontSize="medium" color="inherit" />
            </IconButton>
        </div>
    );
};

export default SaveButton;
