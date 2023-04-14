import React from 'react';

interface SidebarReviewViewerProps {
    reviewPosition: number;
    setReviewPosition: (reviewPosition: number) => void;
    totalReviews: number;
}

const SidebarReviewViewer: React.FC<SidebarReviewViewerProps> = ({
    reviewPosition,
    setReviewPosition,
    totalReviews,
}) => {
    return (
        <div className="w-64 px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2">
                    Review ({reviewPosition}/{totalReviews})
                </span>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex justify-center items-start">
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumMedGray px-2  rounded-l text-6xl"
                        onClick={() => {
                            if (reviewPosition > 1) {
                                setReviewPosition(reviewPosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumMedGray px-6 rounded-r text-6xl"
                        onClick={() => {
                            if (reviewPosition < totalReviews) {
                                setReviewPosition(reviewPosition + 1);
                            }
                        }}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarReviewViewer;
