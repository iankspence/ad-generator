import { Review } from '@monorepo/type';
import React from 'react';

interface SidebarReviewContentProps {
    reviews: Review[];
    reviewPosition: number;
}

const SidebarReviewTextArea: React.FC<SidebarReviewContentProps> = ({ reviews, reviewPosition }) => {
    const reviewText = reviews[reviewPosition - 1]?.reviewText || '';
    return (
        <div className="w-64 px-6">
            <textarea
                className="w-full bg-reviewDrumDarkGray text-reviewDrumLightGray p-2 border-none resize-none text-sm"
                rows={8}
                readOnly
                value={reviewText}
            />
        </div>
    );
};

export default SidebarReviewTextArea;
