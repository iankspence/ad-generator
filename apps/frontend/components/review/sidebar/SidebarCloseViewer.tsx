import React from 'react';

interface SidebarCloseViewerProps {
    closePosition: number;
    setClosePosition: (closePosition: number) => void;
    totalCloses: number;
}

const SidebarCloseViewer: React.FC<SidebarCloseViewerProps> = ({ closePosition, setClosePosition, totalCloses }) => {
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2">
                    Close ({closePosition}/{totalCloses})
                </span>
                <div>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray px-6  rounded-l text-4xl"
                        onClick={() => {
                            if (closePosition > 1) {
                                setClosePosition(closePosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray rounded-r text-4xl"
                        onClick={() => {
                            if (closePosition < totalCloses) {
                                setClosePosition(closePosition + 1);
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

export default SidebarCloseViewer;
