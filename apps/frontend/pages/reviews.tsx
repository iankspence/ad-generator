import ProcessedReviewChart, { data } from '../components/ProcessedReviewChart';
import SidebarAudienceReasoning from '../components/ReviewsSidebar/SidebarAudienceReasoning';
import SidebarAudienceTextArea from '../components/ReviewsSidebar/SidebarAudienceTextArea';
import SidebarChangeAudienceButton from '../components/ReviewsSidebar/SidebarChangeAudienceButton';
import SidebarReviewConnector from '../components/ReviewsSidebar/SidebarReviewConnector';
import SidebarReviewTextArea from '../components/ReviewsSidebar/SidebarReviewTextArea';
import SidebarReviewViewer from '../components/ReviewsSidebar/SidebarReviewViewer';
import SidebarUpdateFrequency from '../components/ReviewsSidebar/SidebarUpdateFrequency';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import useAccount from '../hooks/useAccount';
import { getReviewsByAccountId } from '../utils/api';
import WebsocketHandler from '../utils/websocket/WebsocketHandler';
import handleProcessedReview from '../utils/websocket/handleProcessedReview';
import React, { useContext, useEffect, useState } from 'react';

function ReviewsPage() {
    const { user } = useContext(UserContext);
    const { account, setAccount } = useAccount(user?._id);
    const [chartData, setChartData] = useState(data);
    const [showChart, setShowChart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewPosition, setReviewPosition] = useState(1);
    const [audience, setAudience] = useState('');
    const [audienceReasoning, setAudienceReasoning] = useState('');
    const [refreshReviews, setRefreshReviews] = useState(false);

    const updateFrequency = 'Weekly';

    useEffect(() => {
        if (account) {
            getReviewsByAccountId(account._id.toString()).then((reviews) => {
                setReviews(reviews);
            });
            console.log('reviews', reviews);
        }
        setRefreshReviews(false);
    }, [account, showChart, refreshReviews]);

    // set audience and audience reasoning
    useEffect(() => {
        if (reviews.length > 0) {
            const review = reviews[reviewPosition - 1];
            console.log('review', review);
            if (review) {
                setAudience(review.bestFitAudience);
                setAudienceReasoning(review.bestFitReasoning);
            }
        }
    }, [reviews, reviewPosition]);

    return (
        <div className="min-h-screen bg-reviewDrumLightGray">
            <TopNav />
            <WebsocketHandler
                onDataReceived={(review) => handleProcessedReview(review, setChartData, setIsLoading, setShowChart)}
            />
            {isLoading ? (
                <div className="flex flex-col flex-grow">
                    <div className="fixed w-screen h-screen z-50 flex items-center justify-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                    <p className="pt-24 text-center fixed top-1/4 left-0 w-screen h-screen z-50 flex items-center justify-center">
                        Reviews are being connected to your account. This can take between 20 seconds and 5 minutes.
                    </p>
                </div>
            ) : (
                <div className="bg-black min-h-screen text-white  flex flex-col  justify-center">
                    {showChart ? (
                        <div className="w-full max-w-7xl">
                            <ProcessedReviewChart chartData={chartData} onCloseChart={() => setShowChart(false)} />
                        </div>
                    ) : (
                        <div className="flex flex-grow">
                            <div className="w-64 flex flex-col items-center bg-reviewDrumDarkGray py-4">
                                <h2 className="text-reviewDrumMedGray text-2xl font-roboto mb-4">Reviews</h2>
                                <hr className="w-60 ml-4 dark:border-slate-500" />
                                {user && account && (
                                    <SidebarReviewConnector
                                        userId={user._id}
                                        account={account}
                                        setAccount={setAccount}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                )}
                                <hr className="w-60 ml-4  dark:border-slate-500 mt-4" />
                                <SidebarUpdateFrequency updateFrequency={updateFrequency} />
                                <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                                <SidebarReviewViewer
                                    reviewPosition={reviewPosition}
                                    setReviewPosition={setReviewPosition}
                                    totalReviews={reviews?.length}
                                />
                                <SidebarReviewTextArea reviews={reviews} reviewPosition={reviewPosition} />
                                <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                                <SidebarAudienceTextArea audience={parseInt(audience)} />
                                <SidebarAudienceReasoning audienceReasoning={audienceReasoning} />
                                <SidebarChangeAudienceButton
                                    audience={audience}
                                    setAudience={setAudience}
                                    audienceReasoning={audienceReasoning}
                                    setAudienceReasoning={setAudienceReasoning}
                                    review={reviews[reviewPosition - 1]}
                                    setRefreshReviews={setRefreshReviews}
                                />
                                <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                            </div>

                            <div className="flex-grow">{/* The main table will be added here later */}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ReviewsPage;
