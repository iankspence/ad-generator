import React from 'react';

function ClaimCanvas({ claim }) {
    return (
        <div className="p-2 text-black">
            <h2>Claim</h2>
            <p>{claim}</p>
        </div>
    );
}

export default ClaimCanvas;
