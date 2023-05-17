import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LibraryCard = ({ ad, cardLocation }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const copyText = ad?.copyTextEdited || ad?.copyText;
    const reviewDate = ad?.reviewDate || null;
    const source = ad?.source || null;
    const bestFitReasoning = ad?.bestFitReasoning || null;
    const adNameDateTime = ad?.adNameDateTime || null;

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card
            style={{maxWidth: "280px", maxHeight: "700px", objectFit: "contain"}}
        >
            <CardMedia
                component="img"
                image={cardLocation}
                alt={copyText}
            />
            <IconButton
                onClick={handleExpandClick}
                aria-expanded={isExpanded}
                aria-label="show more"
                style={{padding: '0', margin: '0 auto'}}
            >
                <ExpandMoreIcon />
            </IconButton>
            {isExpanded && (
                <CardContent>
                    <Typography variant="body1" component="p" style={{fontSize: "14px"}}>
                        <strong>Review Source:</strong> {source}
                    </Typography>
                    <Typography variant="body1" component="p" style={{fontSize: "14px"}}>
                        <strong>Review Date:</strong> {reviewDate}
                    </Typography>
                    <Typography variant="body1" component="p" style={{fontSize: "14px"}}>
                        <strong>Ad Created:</strong> {adNameDateTime.split('__')[0]}
                    </Typography>
                    <Typography variant="body1" component="p" style={{fontSize: "14px"}}>
                        <strong>Ad Copy:</strong> {copyText}
                    </Typography>
                    <Typography variant="body1" component="p" style={{fontSize: "14px"}}>
                        <strong>Audience Selection:</strong> {bestFitReasoning}
                    </Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default LibraryCard;
