import SidebarAudienceReasoning from '../components/ReviewsSidebar/SidebarAudienceReasoning';
import SidebarAudienceTextArea from '../components/ReviewsSidebar/SidebarAudienceTextArea';
import SidebarReviewConnector from '../components/ReviewsSidebar/SidebarReviewConnector';
import SidebarReviewTextArea from '../components/ReviewsSidebar/SidebarReviewTextArea';
import SidebarReviewViewer from '../components/ReviewsSidebar/SidebarReviewViewer';
import SidebarUpdateFrequency from '../components/ReviewsSidebar/SidebarUpdateFrequency';
import TopNav from '../components/TopNav';
import React from 'react';

function ReviewsPage() {
    const updateFrequency = 'Weekly';
    const reviewText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae pulvinar turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae pulvinar turpis.';
    const audience = 'The Parent';
    const audienceReasoning = 'Lorem ipsum dolor sit amet, consectetur adipiscing';

    return (
        <div className="flex flex-col min-h-screen bg-reviewDrumLightGray">
            <TopNav />
            <div className="flex flex-grow">
                <div className="w-64 flex flex-col items-center bg-reviewDrumDarkGray py-4">
                    <h2 className="text-reviewDrumMedGray font-roboto mb-4">Reviews</h2>
                    <hr className="w-60 ml-4 dark:border-slate-500" />
                    <SidebarReviewConnector />
                    <hr className="w-60 ml-4  dark:border-slate-500 mt-4" />
                    <SidebarUpdateFrequency updateFrequency={updateFrequency} />
                    <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                    <SidebarReviewViewer currentReview={4} totalReviews={105} />
                    <SidebarReviewTextArea reviewText={reviewText} />
                    <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                    <SidebarAudienceTextArea audience={audience} />
                    <SidebarAudienceReasoning audienceReasoning={audienceReasoning} />
                    <button className="bg-reviewDrumBlue text-white px-4 py-2 mt-4 rounded w-48">
                        Change Audience
                    </button>
                    <hr className="w-60 ml-4 dark:border-slate-500 mt-4" />
                </div>

                <div className="flex-grow">{/* The main table will be added here later */}</div>
            </div>
        </div>
    );
}

export default ReviewsPage;
