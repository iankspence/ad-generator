import React from 'react';

interface SidebarReviewViewerProps {
    currentReview: number;
    totalReviews: number;
}

const SidebarReviewViewer: React.FC<SidebarReviewViewerProps> = ({ currentReview, totalReviews }) => {
    return (
        <div className="w-64 px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2">
                    Review ({currentReview}/{totalReviews})
                </span>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex justify-center items-start">
                    <button className="bg-reviewDrumDarkGray text-reviewDrumMedGray px-2  rounded-l text-6xl">
                        &lt;
                    </button>
                    <button className="bg-reviewDrumDarkGray text-reviewDrumMedGray px-6 rounded-r text-6xl">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarReviewViewer;
