import useDownload from '../../../hooks/useDownload';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconButton from '@mui/material/IconButton';

const DownloadButton = ({singleCanvasView}) => {
    const { saveHookApp, saveClaimApp, saveReviewApp, saveCloseApp } = useDownload();
    const handleDownloadButtonClick = () => {
        saveHookApp();
        saveClaimApp();
        saveReviewApp();
        saveCloseApp();
    };

    return (
        <div
            className="fixed bottom-8 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full "
            style={{
                zIndex: singleCanvasView ? 10 : 20,
            }}
        >
            <IconButton
                onClick={handleDownloadButtonClick}
                className="bg-white hover:bg-gray-300 text-black p-2 rounded-full"
                style={{
                    color: 'black',
                }}
            >
                <FileDownloadOutlinedIcon fontSize="medium" color="inherit" />
            </IconButton>
        </div>
    );
};

export default DownloadButton;
