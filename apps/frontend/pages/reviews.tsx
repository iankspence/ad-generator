import React, { useContext, useEffect } from 'react';
import ReviewsAudienceTable from '../components/review/ReviewsAudienceTable';
import TopNav from '../components/top-nav/TopNav';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { getReviewsByAccountId } from '../utils/api';
import { formatAudienceData } from '../components/review/formatAudienceData';
import ReviewViewer from '../components/review/ReviewViewer';

function ReviewsPage() {
    const { user, account, setAccount } = useContext(UserContext);
    const { reviews, updateReviews, selectedAudiencePosition } = useContext(CampaignContext);

    useEffect(() => {
        if (account) {
            getReviewsByAccountId(account._id.toString()).then((fetchedReviews) => {
                updateReviews(fetchedReviews);
            });
        }
    }, [account]);

    const tableData = formatAudienceData(reviews);

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <div className="w-full md:w-5/6 bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-semibold mb-8">Reviews</h1>
                    <ReviewsAudienceTable audienceData={tableData} />
                </div>
            </div>
        </>
    );
}

export default ReviewsPage;
