import React from 'react';

function SidebarUpdateFrequency({ updateFrequency }) {
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2 ">Update Frequency</span>
                <span className="text-reviewDrumLightGray py-2">{updateFrequency}.</span>
            </div>
        </div>
    );
}

export default SidebarUpdateFrequency;
