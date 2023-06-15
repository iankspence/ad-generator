import React, { useContext, useEffect, useState } from 'react';
import ReviewsAudienceTable from '../components/reviews/ReviewsAudienceTable';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { findReviewsByAccountId } from '../utils/api/mongo/review/findReviewsByAccountIdApi';
import { formatAudienceData } from '../components/reviews/formatAudienceData';
import PrivateAccessButton from '../components/reviews/floating-buttons/PrivateAccessButton';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { useUser } from '../hooks/useUser';

function ReviewsPage() {
    const { user, account} = useContext(UserContext);
    const { reviews, updateReviews, selectedAudiencePosition } = useContext(CampaignContext);
    const [refreshReviews, setRefreshReviews] = useState(false);

    useUser();

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

    if ( !user || !user?.roles ) return <LoadingScreen />;

    return (
        <>
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <div className="w-11/12 md:w-5/6 bg-white rounded-lg shadow-lg p-6 mb-8">
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
