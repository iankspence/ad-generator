import React, { useContext, useEffect, useState } from 'react';
import ReviewsAudienceTable from '../components/reviews/ReviewsAudienceTable';
import TopNav from '../components/top-nav/TopNav';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { findReviewsByAccountId } from '../utils/api/mongo/review/findReviewsByAccountIdApi';
import { formatAudienceData } from '../components/reviews/formatAudienceData';
import PrivateAccessButton from '../components/reviews/floating-buttons/PrivateAccessButton';

function ReviewsPage() {
    const { user, account} = useContext(UserContext);
    const { reviews, updateReviews, selectedAudiencePosition } = useContext(CampaignContext);
    const [refreshReviews, setRefreshReviews] = useState(false);

    useEffect(() => {
        if (account) {
            findReviewsByAccountId({
                accountId: account._id.toString()
            }).then((fetchedReviews) => {
                updateReviews(fetchedReviews);
            });
        }
    }, [account, refreshReviews]);

    const tableData = formatAudienceData(reviews);

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <div className="w-full md:w-5/6 bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-semibold mb-8">Reviews</h1>
                    <ReviewsAudienceTable audienceData={tableData}/>
                </div>
            </div>
            {
                user && (user.roles.includes('admin') || user.roles.includes('content-manager')) && selectedAudiencePosition !== null &&
                <PrivateAccessButton refreshReviews={refreshReviews} setRefreshReviews={setRefreshReviews} />
            }
        </>
    );
}

export default ReviewsPage;
