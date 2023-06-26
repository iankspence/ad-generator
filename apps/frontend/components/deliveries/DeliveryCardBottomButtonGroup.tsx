import React, { useState } from 'react';
import { IconButton, CardContent, Typography, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { formatDateString } from '../../utils/date/formatDateString';

const DeliveryCardBottomButtonGroup = ({ ad, handleNext, handlePrevious, isNavBtnDisabled }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleNavigationClick = (event, handler) => {
        event.stopPropagation();
        handler();
    }

    const copyText = ad?.copyTextEdited || ad?.copyText;
    const reviewDate = ad?.reviewDate || null;
    const source = ad?.source || null;

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div
                onClick={handleExpandClick}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                {isMobile && (
                    <IconButton onClick={(event) => handleNavigationClick(event, handlePrevious)} disabled={isNavBtnDisabled('left')} style={{ position: 'absolute', left: '5px' }}>
                        <NavigateBeforeIcon />
                    </IconButton>
                )}

                <IconButton
                    aria-expanded={isExpanded}
                    aria-label="show more"
                    style={{ padding: '0' }}
                >
                    <ExpandMoreIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }} />
                </IconButton>

                {isMobile && (
                    <IconButton onClick={(event) => handleNavigationClick(event, handleNext)} disabled={isNavBtnDisabled('right')} style={{ position: 'absolute', right: '5px' }}>
                        <NavigateNextIcon />
                    </IconButton>
                )}
            </div>

            {isExpanded && (
                <CardContent>
                    <Typography variant="body1" component="p" style={{ fontSize: "14px" }}>
                        <strong>Review Source:</strong> {source}
                    </Typography>
                    <Typography variant="body1" component="p" style={{ fontSize: "14px" }}>
                        <strong>Review Date:</strong> {formatDateString(reviewDate)}
                    </Typography>
                    <Typography variant="body1" component="p" style={{ fontSize: "14px" }}>
                        <strong>Ad Copy:</strong> {copyText}
                    </Typography>
                </CardContent>
            )}
        </div>
    );
};

export default DeliveryCardBottomButtonGroup;
