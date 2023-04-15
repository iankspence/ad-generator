import React from 'react';

function SidebarUpdateFrequency({ updateFrequency }) {
    return (
        <div className="w-full px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2 pr-2">Update Frequency</span>
            </div>
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumLightGray py-2">{updateFrequency}.</span>
            </div>
        </div>
    );
}

export default SidebarUpdateFrequency;
