import React, { useContext } from 'react';
import TextSelector from '../pixi/design-drawer/text-input/selector/TextSelector';
import AudienceSelector from '../pixi/design-drawer/text-input/selector/AudienceSelector';
import { CampaignContext } from '../../contexts/CampaignContext';

const ReviewViewer = () => {
    const { reviews, reviewPosition, updateReviewPosition, selectedAudiencePosition } = useContext(CampaignContext);

    const filteredReviews = reviews.filter(review => Number(review.bestFitAudience) === Number(selectedAudiencePosition));

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex justify-between">

            <div className="flex-1 pr-4">
                <div className="mb-4">
                    <AudienceSelector
                        countTarget="reviews"
                    />
                </div>


                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Audience Reasoning</h3>
                    <p>{filteredReviews[reviewPosition - 1]?.bestFitReasoning}</p>
                </div>
            </div>

            <div className="flex-1 pr-4">
                <div className="mb-4 -translate-x-4">
                    <TextSelector
                        label="Review"
                        position={reviewPosition}
                        setPosition={updateReviewPosition}
                        totalCount={filteredReviews.length}
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2">Review</h3>
                <p>{filteredReviews[reviewPosition - 1]?.reviewText}</p>
            </div>

        </div>
    );
};

export default ReviewViewer;
