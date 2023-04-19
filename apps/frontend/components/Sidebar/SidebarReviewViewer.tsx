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
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2">
                    Review ({reviewPosition}/{totalReviews})
                </span>
                <div>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray px-6  rounded-l text-4xl"
                        onClick={() => {
                            if (reviewPosition > 1) {
                                setReviewPosition(reviewPosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray rounded-r text-4xl"
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
