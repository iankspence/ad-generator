import React from 'react';

interface DownloadCampaignButtonProps {
    // Add props as needed
    userId: string;
}

const DownloadCampaignButton: React.FC<DownloadCampaignButtonProps> = (userId) => {
    return (
        <button
            className="bg-reviewDrumBlue w-3/4 text-white px-4 py-2 my-4 rounded hover:bg-blue-600 text-xl"
            onClick={() => {
                // Add logic here when needed
            }}
        >
            Download Campaign
        </button>
    );
};

export default DownloadCampaignButton;
