import { audiences } from '../../utils/audiences';
import React from 'react';

interface SidebarAudienceTextAreaProps {
    audience: number;
}

const SidebarAudienceTextArea: React.FC<SidebarAudienceTextAreaProps> = ({ audience }) => {
    return (
        <div className="w-64 px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2 pr-2">Audience</span>
            </div>
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumLightGray py-2">{audiences[audience - 1]?.name}</span>
            </div>
        </div>
    );
};

export default SidebarAudienceTextArea;
