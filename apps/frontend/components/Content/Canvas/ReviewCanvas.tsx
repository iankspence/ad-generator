import React from 'react';

function ReviewCanvas({ review }) {
    return (
        <div className="p-2 text-black">
            <h2>Review</h2>
            <p>{review}</p>
        </div>
    );
}

export default ReviewCanvas;
