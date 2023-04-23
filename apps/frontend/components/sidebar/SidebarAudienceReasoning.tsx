import React from 'react';

interface SidebarAudienceReasoningProps {
    audienceReasoning: string;
}

const SidebarAudienceReasoning: React.FC<SidebarAudienceReasoningProps> = ({ audienceReasoning }) => {
    return (
        <div className="w-3/4 px-6">
            <div className="flex flex-col items-start mt-2">
                <textarea
                    className="w-full p-2 text-reviewDrumLightGray bg-reviewDrumDarkGray rounded text-md"
                    rows={6}
                    value={audienceReasoning}
                    readOnly
                ></textarea>
            </div>
        </div>
    );
};

export default SidebarAudienceReasoning;
