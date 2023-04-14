import { Review } from '@monorepo/type';
import React from 'react';

interface SidebarReviewContentProps {
    reviews: Review[];
    reviewPosition: number;
}

const SidebarReviewTextArea: React.FC<SidebarReviewContentProps> = ({ reviews, reviewPosition }) => {
    const reviewText = reviews[reviewPosition - 1]?.reviewText || '';
    return (
        <div className="w-64 px-6 mt-4">
            <textarea
                className="w-full bg-reviewDrumDarkGray text-reviewDrumMedGray p-2 border-none resize-none"
                rows={5}
                readOnly
                value={reviewText}
            />
        </div>
    );
};

export default SidebarReviewTextArea;
