import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Typography } from '@mui/material';
import React from 'react';

interface ViewerProps {
    label: string;
    position: number;
    setPosition: (position: number) => void;
    totalCount: number;
}

const TextSelector: React.FC<ViewerProps> = ({ label, position, setPosition, totalCount }) => {
    return (
        <div className="w-full flex justify-between items-center px-4">
            <Typography variant="subtitle1" className="text-reviewDrumMedGray">
                {label} ({position}/{totalCount})
            </Typography>
            <div>
                <IconButton
                    color="inherit"
                    disabled={position <= 1}
                    onClick={() => {
                        if (position > 1) {
                            setPosition(position - 1);
                        }
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    disabled={position >= totalCount}
                    onClick={() => {
                        if (position < totalCount) {
                            setPosition(position + 1);
                        }
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default TextSelector;
