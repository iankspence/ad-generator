import { CampaignContext } from '../../contexts/CampaignContext';
import DownloadCampaignButton from '../CampaignSidebar/DownloadCampaignButton';
import SidebarCampaignOverview from '../CampaignSidebar/SidebarCampaignOverview';
import SidebarClaimViewer from '../CampaignSidebar/SidebarClaimViewer';
import SidebarCopyViewer from '../CampaignSidebar/SidebarCopyViewer';
import SidebarHookViewer from '../CampaignSidebar/SidebarHookViewer';
import SidebarReviewViewer from './SidebarReviewViewer';
import SidebarTextArea from './SidebarTextArea';
import React, { useContext, useState } from 'react';

export function CampaignSidebar() {
    const {
        copies,
        updateCopies,
        selectedCopy,
        updateSelectedCopy,
        hooks,
        updateHooks,
        selectedHook,
        updateSelectedHook,
        claims,
        updateClaims,
        selectedClaim,
        updateSelectedClaim,
        reviews,
        updateReviews,
        selectedReview,
        updateSelectedReview,
    } = useContext(CampaignContext);

    return (
        <div
            className="flex flex-col items-center bg-reviewDrumDarkGray pt-4"
            style={{
                flexBasis: '25%',
                minWidth: '400px',
            }}
        >
            <h2 className="text-reviewDrumMedGray text-3xl font-roboto mb-4">Campaign</h2>
            <hr className="w-11/12 self-end dark:border-slate-500" />
            <SidebarCampaignOverview audience="Audience Name" adsSelected="2/25" />
            <hr className="w-11/12 self-end dark:border-slate-500" />
            <SidebarReviewViewer
                reviewPosition={reviewPosition}
                setReviewPosition={setReviewPosition}
                totalReviews={totalReviews}
            />
            <SidebarTextArea
                textArray={reviews}
                // textArray={reviews.map((review) => review.reviewText)}
                position={reviewPosition}
                rows={2}
            />
            <hr className="w-11/12 self-end dark:border-slate-500" />

            <SidebarCopyViewer
                copyPosition={copyPosition}
                setCopyPosition={setCopyPosition}
                totalCopies={copies.length}
            />
            <SidebarTextArea
                textArray={copies}
                // textArray={copies.map((copy) => copy.copyText)}
                position={copyPosition}
                rows={2}
            />

            <SidebarHookViewer
                hookPosition={hookPosition}
                setHookPosition={setHookPosition}
                totalHooks={hooks.length}
            />
            <SidebarTextArea
                textArray={hooks}
                // textArray={hooks.map((hook) => hook.hookText)}
                position={hookPosition}
                rows={2}
            />

            <SidebarClaimViewer
                claimPosition={claimPosition}
                setClaimPosition={setClaimPosition}
                totalClaims={claims.length}
            />
            <SidebarTextArea
                textArray={claims}
                // textArray={claims.map((claim) => claim.claimText)}
                position={claimPosition}
                rows={2}
            />

            <hr className="w-11/12 self-end dark:border-slate-500" />

            <DownloadCampaignButton userId={user._id?.toString()} />
        </div>
    );
}
