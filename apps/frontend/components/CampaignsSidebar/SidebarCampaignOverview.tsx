import React, { useState } from 'react';

interface Props {
    audience: string;
    adsSelected: string;
}

const SidebarCampaignOverview: React.FC<Props> = ({ audience, adsSelected }) => {
    const [isSelected, setIsSelected] = useState(true);

    const toggleSelected = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray text-xl py-2 font-semibold">Audience</span>
                <span className="text-white text-xl py-2">{audience}</span>
            </div>
            <div className="w-full flex justify-between mt-4">
                <span className="text-reviewDrumMedGray text-xl py-2 font-semibold">Ads Selected</span>
                <span className="text-white text-xl py-2">{adsSelected}</span>
            </div>
            <div className="w-full flex justify-between mt-4">
                <span
                    className={`text-xl py-2 font-semibold ${
                        isSelected ? 'text-reviewDrumOrange' : 'text-reviewDrumMedGray'
                    }`}
                >
                    {isSelected ? 'Selected' : 'Deselected'}
                </span>
                <button
                    onClick={toggleSelected}
                    className={`w-20 h-8 rounded-full ${isSelected ? 'bg-reviewDrumBlue' : 'bg-reviewDrumMedGray'}`}
                />
            </div>
        </div>
    );
};

export default SidebarCampaignOverview;
