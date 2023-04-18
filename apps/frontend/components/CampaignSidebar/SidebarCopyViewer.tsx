import React from 'react';

interface SidebarCopyViewerProps {
    copyPosition: number;
    setCopyPosition: (copyPosition: number) => void;
    totalCopies: number;
}

const SidebarCopyViewer: React.FC<SidebarCopyViewerProps> = ({ copyPosition, setCopyPosition, totalCopies }) => {
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2">
                    Copy ({copyPosition}/{totalCopies})
                </span>
                <div>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray px-6  rounded-l text-4xl"
                        onClick={() => {
                            if (copyPosition > 1) {
                                setCopyPosition(copyPosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray rounded-r text-4xl"
                        onClick={() => {
                            if (copyPosition < totalCopies) {
                                setCopyPosition(copyPosition + 1);
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

export default SidebarCopyViewer;
