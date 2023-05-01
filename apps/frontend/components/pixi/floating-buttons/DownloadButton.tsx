import useDownload from '../../../hooks/useDownload';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconButton from '@mui/material/IconButton';
import React, { useContext, useCallback } from 'react';

const DownloadButton = ({singleCanvasView}) => {
    const { downloadHookApp, downloadClaimApp, downloadReviewApp, downloadCloseApp } = useDownload();

    const handleDownloadButtonClick = () => {
        downloadHookApp();
        downloadClaimApp();
        downloadReviewApp();
        downloadCloseApp();
    };

    return (
        <div
            className="fixed bottom-8 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full "
            style={{
                zIndex: singleCanvasView ? 10 : 20, // Set the z-index value based on the singleCanvasView prop
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
