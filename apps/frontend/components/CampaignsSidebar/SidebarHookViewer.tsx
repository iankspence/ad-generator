import React from 'react';

interface SidebarHookViewerProps {
    hookPosition: number;
    setHookPosition: (hookPosition: number) => void;
    totalHooks: number;
}

const SidebarHookViewer: React.FC<SidebarHookViewerProps> = ({ hookPosition, setHookPosition, totalHooks }) => {
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2">
                    Hook ({hookPosition}/{totalHooks})
                </span>
                <div>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray px-6  rounded-l text-4xl"
                        onClick={() => {
                            if (hookPosition > 1) {
                                setHookPosition(hookPosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray rounded-r text-4xl"
                        onClick={() => {
                            if (hookPosition < totalHooks) {
                                setHookPosition(hookPosition + 1);
                            }
                        }}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarHookViewer;
