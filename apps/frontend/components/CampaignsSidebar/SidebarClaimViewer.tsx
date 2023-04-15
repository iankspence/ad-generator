import React from 'react';

interface SidebarClaimViewerProps {
    claimPosition: number;
    setClaimPosition: (claimPosition: number) => void;
    totalClaims: number;
}

const SidebarClaimViewer: React.FC<SidebarClaimViewerProps> = ({ claimPosition, setClaimPosition, totalClaims }) => {
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start text-xl">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray py-2">
                    Claim ({claimPosition}/{totalClaims})
                </span>
                <div>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray px-6  rounded-l text-4xl"
                        onClick={() => {
                            if (claimPosition > 1) {
                                setClaimPosition(claimPosition - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <button
                        className="bg-reviewDrumDarkGray text-reviewDrumLightGray rounded-r text-4xl"
                        onClick={() => {
                            if (claimPosition < totalClaims) {
                                setClaimPosition(claimPosition + 1);
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

export default SidebarClaimViewer;
