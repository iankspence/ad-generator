import React from 'react';

interface SidebarAudienceReasoningProps {
    audienceReasoning: string;
}

const SidebarAudienceReasoning: React.FC<SidebarAudienceReasoningProps> = ({ audienceReasoning }) => {
    return (
        <div className="w-64 px-6">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray">Audience Reasoning</span>
            </div>
            <div className="flex flex-col items-start mt-2">
                <textarea
                    className="w-full p-2 text-reviewDrumMedGray bg-reviewDrumDarkGray rounded"
                    rows={4}
                    value={audienceReasoning}
                    readOnly
                ></textarea>
            </div>
        </div>
    );
};

export default SidebarAudienceReasoning;