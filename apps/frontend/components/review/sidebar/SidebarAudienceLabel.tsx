import { audiences } from '../../../utils/constants/audiences';
import React from 'react';

interface SidebarAudienceTextAreaProps {
    audience: number;
}

const SidebarAudienceLabel: React.FC<SidebarAudienceTextAreaProps> = ({ audience }) => {
    return (
        <div className="w-3/4 px-6 grid grid-cols-2 mt-4 text-xl">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2 pr-2">Best Fit Audience</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-reviewDrumLightGray py-2">{audiences[audience - 1]?.name}</span>
            </div>
        </div>
    );
};

export default SidebarAudienceLabel;
