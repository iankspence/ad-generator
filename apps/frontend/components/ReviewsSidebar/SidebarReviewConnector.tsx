import React from 'react';

function SidebarReviewConnector() {
    const currentRateMdsLink = 'https://www.ratemds.com/doctor-ratings/';

    return (
        <div className="w-64 px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2">Google</span>
                <span className="text-reviewDrumMedGray py-2">RateMDs</span>
            </div>
            <div className="flex flex-col items-start">
                <button className="bg-reviewDrumBlue text-white px-4 py-2 rounded">Connect</button>
                <div className="flex flex-col items-start mt-2">
                    <button className="bg-reviewDrumBlue text-white px-4 py-2 rounded mb-2">Connect</button>
                    <a
                        href={currentRateMdsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-reviewDrumMedGray underline text-xs w-26 break-all"
                    >
                        {currentRateMdsLink}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SidebarReviewConnector;
