import React, { useContext, useState } from 'react';
import { IconButton, CardContent, Typography, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FacebookIcon from '@mui/icons-material/Facebook';
import { CampaignContext } from '../../../contexts/CampaignContext';
import UserContext from '../../../contexts/UserContext';
import { createAdSetForPdfDelivery } from '../../../utils/api/mongo/ad-set/createAdSetForPdfDeliveryApi';
import { getBestFitAudienceNameAgeRangeAndInterests } from '../../../utils/audience/getBestFitAudienceNameAgeRangeAndInterests';
import { formatDateString } from '../../../utils/formatDateString';
import { CreateAdSetForPdfDeliveryDto } from '@monorepo/type';
import { useRouter } from 'next/router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const LibraryCardBottomButtonGroup = ({ ad, isSelected, refreshAds }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { selectedAds, updateSelectedAds } = useContext(CampaignContext);
    const { user, account } = useContext(UserContext);

    const userId = user?._id;
    const accountId = account?._id;
    const bestFitAudience = ad?.bestFitAudience || null;

    const { bestFitAudienceName, ageRange, interests } = getBestFitAudienceNameAgeRangeAndInterests(ad);

    const router = useRouter();
    const currentRoute = router.pathname;
    const isMobile = useMediaQuery('(max-width:600px)');  // adjust the value based on your definition of 'mobile view'

    const [currentCard, setCurrentCard] = useState('hook'); // Add this line if you don't have a similar state variable

    const handleCardNavigationClick = (direction) => {
        switch (currentCard) {
            case 'hook':
                if (direction === 'right') {
                    setCurrentCard('claim');
                }
                break;
            case 'claim':
                if (direction === 'left') {
                    setCurrentCard('hook');
                } else if (direction === 'right') {
                    setCurrentCard('review');
                }
                break;
            case 'review':
                if (direction === 'left') {
                    setCurrentCard('claim');
                } else if (direction === 'right') {
                    setCurrentCard('close');
                }
                break;
            case 'close':
                if (direction === 'left') {
                    setCurrentCard('review');
                }
                break;
            default:
                console.log('Invalid current card state');
                break;
        }
    };

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const copyText = ad?.copyTextEdited || ad?.copyText;
    const reviewDate = ad?.reviewDate || null;
    const source = ad?.source || null;
    const bestFitReasoning = ad?.bestFitReasoning || null;
    const adNameDateTime = ad?.adNameDateTime || null;
    const adStatus = ad?.adStatus || '';

    const IconComponent = () => {
        if (adStatus === 'fresh') {
            return <PictureAsPdfIcon fontSize="small" />;
        } else if (adStatus === 'pdf') {
            return <FacebookIcon fontSize="small" />;
        } else {
            return null;
        }
    }

    const handleCreateAdSetFromSelectedAds = () => {
        try {
            const adIds = selectedAds.map((ad) => ad._id);
            const createAdSetForPdfDeliveryDto: CreateAdSetForPdfDeliveryDto = {
                userId: userId.toString(),
                accountId: accountId.toString(),
                adIds,
                bestFitAudience,
                bestFitAudienceName,
                ageRange,
                interests,
            }

            createAdSetForPdfDelivery(createAdSetForPdfDeliveryDto);
            updateSelectedAds([]);
            const resetTime = 7000 * adIds.length;
            setTimeout(() => {
                refreshAds();
            }, resetTime);
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
                        style={{padding: '0', position: 'absolute', right: '3%', top: '12%'}}
                        aria-label="add to library"
                    >
                        <IconComponent />
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
                        <strong>Review Date:</strong> {formatDateString(reviewDate)}
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

export default LibraryCardBottomButtonGroup;
