import { Review } from '@monorepo/type';
import React from 'react';

interface SidebarReviewContentProps {
    reviews: Review[];
    reviewPosition: number;
}

const SidebarReviewTextArea: React.FC<SidebarReviewContentProps> = ({ reviews, reviewPosition }) => {
    const reviewText = reviews[reviewPosition - 1]?.reviewText || '';
    return (
        <div className="w-3/4 px-6 pb-4">
            <textarea
                className="w-full bg-reviewDrumDarkGray text-reviewDrumLightGray border-none resize-none text-md"
                rows={8}
                readOnly
                value={reviewText}
            />
        </div>
    );
};

export default SidebarReviewTextArea;
