import React, {useContext, useState} from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CampaignContext} from "../../../contexts/CampaignContext";

const LibraryCard = ({ ad, cardLocation }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const copyText = ad?.copyTextEdited || ad?.copyText;
    const reviewDate = ad?.reviewDate || null;
    const source = ad?.source || null;
    const bestFitReasoning = ad?.bestFitReasoning || null;
    const adNameDateTime = ad?.adNameDateTime || null;

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const { selectedAds, updateSelectedAds } = useContext(CampaignContext);

    const handleCardClick = () => {
        if (isSelected(ad)) {
            updateSelectedAds(selectedAds.filter(selectedAd => selectedAd._id !== ad._id));
        } else {
            updateSelectedAds([...selectedAds, ad]);
        }
    };

    const isSelected = (ad) => {
        return selectedAds.some(selectedAd => selectedAd._id === ad._id);
    };

    return (
        <Card
            style={{
                maxWidth: "99%",
                maxHeight: "700px",
                objectFit: "contain",
                outline: isSelected(ad) ? '5px solid green' : 'none'
            }}
        >
            <CardMedia
                onClick={handleCardClick}
                component="img"
                image={cardLocation}
                alt={copyText}
            />
            <div onClick={handleExpandClick} style={{width: '100%', cursor: 'pointer'}}>
                <div style={{textAlign: 'center'}}>
                    <IconButton
                        aria-expanded={isExpanded}
                        aria-label="show more"
                        style={{padding: '0'}}
                    >
                        <ExpandMoreIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}/>
                    </IconButton>
                </div>
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
            </div>
        </Card>
    );
};

export default LibraryCard;
