import React from 'react';

function CloseCanvas({ close }) {
    return (
        <div className="p-2 text-black">
            <h2>Close</h2>
            <p>{close}</p>
        </div>
    );
}

export default CloseCanvas;
