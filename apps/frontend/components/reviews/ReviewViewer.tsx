import React, { useContext } from 'react';
import TextSelector from '../ad-generator/design-drawer/text-input/selector/TextSelector';
import AudienceSelector from '../ad-generator/design-drawer/text-input/selector/AudienceSelector';
import { CampaignContext } from '../../contexts/CampaignContext';
import { useTheme, useMediaQuery, Box } from '@mui/material';

const ReviewViewer = () => {
    const { reviews, reviewPosition, updateReviewPosition, selectedAudiencePosition } = useContext(CampaignContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const filteredReviews = reviews.filter(review => Number(review.bestFitAudience) === Number(selectedAudiencePosition));

    return (
        <Box className="w-full rounded-lg shadow-lg p-4 mt-8"
             display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="between"
             bgcolor="#F2F2F2">

            <Box className="flex-1 pr-4" mb={isMobile ? 4 : 0}>
                <Box className="mb-4">
                    <AudienceSelector
                        countTarget="reviews"
                    />
                </Box>

                <Box className="flex-1 pr-4">
                    <Box className="mb-4 -translate-x-4 -mr-10">
                        <TextSelector
                            label="Review"
                            position={reviewPosition}
                            setPosition={updateReviewPosition}
                            totalCount={filteredReviews.length}
                        />
                    </Box>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold mb-2`}>Review</h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-md'}`} >{filteredReviews[reviewPosition - 1]?.reviewText}</p>

                </Box>
            </Box>

            <Box className="flex-1 mb-4">
                <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold mb-2`}>Audience Reasoning</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-md'}`} >{filteredReviews[reviewPosition - 1]?.bestFitReasoning}</p>
                <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold mt-4 mb-2`}>Source</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-md'}`} >{filteredReviews[reviewPosition - 1]?.source}</p>
                <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold mt-4 mb-2`}>Date</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-md'}`} >{filteredReviews[reviewPosition - 1]?.reviewDate}</p>
            </Box>

        </Box>
    );
};

export default ReviewViewer;
