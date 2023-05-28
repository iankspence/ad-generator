import React, { useContext } from 'react';
import { CampaignContext } from '../../../contexts/CampaignContext';
import { getFilteredTextArrays } from '../utils/text/getFilteredTextArrays';

const AdCopyDisplay = ({ rightDrawerOpen, singleCanvasView }) => {
    const {
        copies,
        copyPosition,
        hooks,
        hookPosition,
        claims,
        reviews,
        reviewPosition,
        closes,
        selectedAudiencePosition,
    } = useContext(CampaignContext);

    const {
        filteredCopies
    } = getFilteredTextArrays(
        reviews,
        reviewPosition,
        hooks,
        hookPosition,
        claims,
        closes,
        copies,
        selectedAudiencePosition,
    );

    const currentCopy = filteredCopies[copyPosition - 1];
    const copyText = currentCopy?.copyTextEdited || currentCopy?.copyText || '';
    const textSize = copyText.length > 400 ? "text-xs" : "text-sm";

    return (
        <>
            {!singleCanvasView && (
                <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-36 bg-black border border-gray-600 p-2 rounded-md ${textSize}`} style={{ width: '700px', left: rightDrawerOpen ? `calc(50% - 200px)` : '50%' }}>
                    <p className="text-gray-500">Ad Copy: {copyText}</p>
                </div>
            )}

            {singleCanvasView && (
                <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black border border-gray-600 p-2 rounded-md ${textSize}`} style={{ width: '700px', left: rightDrawerOpen ? `calc(50% - 200px)` : '50%' }}>
                    <p className="text-gray-500">Ad Copy: {copyText}</p>
                </div>
            )}
        </>
    );
};

export default AdCopyDisplay;
