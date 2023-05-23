import React, { useContext, useState } from 'react';
import { IconButton, CardContent, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { CampaignContext } from '../../../contexts/CampaignContext';
import UserContext from '../../../contexts/UserContext';
import { audiences } from '../../../utils/constants/audiences'
import { createAdSetForPdfDelivery } from '../../../utils/api';

const LibraryCardButtonGroup = ({ ad, isSelected }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { selectedAds, updateSelectedAds } = useContext(CampaignContext);
    const { user, account } = useContext(UserContext);

    const getBestFitAudienceNameAgeRangeAndInterests = (bestFitAudience) => {

        if (ad.bestFitAudience) {
            const bestFitAudience = audiences[ad.bestFitAudience - 1];
            const bestFitAudienceName = bestFitAudience.name;
            const ageRange = bestFitAudience.ageRange;
            const interests = bestFitAudience.interests;
            return { bestFitAudienceName, ageRange, interests };
        }

    }
    const userId = user?._id;
    const accountId = account?._id;
    const bestFitAudience = ad?.bestFitAudience || null;
    const { bestFitAudienceName, ageRange, interests } = getBestFitAudienceNameAgeRangeAndInterests(bestFitAudience);



    const handleExpandClick = (event) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const copyText = ad?.copyTextEdited || ad?.copyText;
    const reviewDate = ad?.reviewDate || null;
    const source = ad?.source || null;
    const bestFitReasoning = ad?.bestFitReasoning || null;
    const adNameDateTime = ad?.adNameDateTime || null;

    const handleCreateAdSetFromSelectedAds = (event) => {
        event.stopPropagation();
        console.log('create ad set from selected ads');
        try {
            const adIds = selectedAds.map((ad) => ad._id);
            const newAdSet = createAdSetForPdfDelivery(userId, accountId, adIds, bestFitAudience, bestFitAudienceName, ageRange, interests);
            console.log(newAdSet); // log new AdSet
        } catch (error) {
            console.error('Error creating AdSet:', error);
        }
    }

    return (
        <div
            onClick={handleExpandClick}
            style={{cursor: 'pointer', width: '100%', position: 'relative'}}
        >
            <div style={{textAlign: 'left'}}>
                {isSelected(ad) && (
                    <IconButton
                        onClick={handleCreateAdSetFromSelectedAds}
                        style={{padding: '0', position: 'absolute', right: '2%'}}
                        aria-label="add to library"
                    >
                        <CreateNewFolderOutlinedIcon />
                    </IconButton>
                )}

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
    );
};

export default LibraryCardButtonGroup;
