import { CampaignContext } from '../../contexts/CampaignContext';
import UserContext from '../../contexts/UserContext';
import DownloadCampaignButton from '../CampaignSidebar/DownloadCampaignButton';
import SidebarCampaignOverview from '../CampaignSidebar/SidebarCampaignOverview';
import SidebarClaimViewer from '../CampaignSidebar/SidebarClaimViewer';
import SidebarCopyViewer from '../CampaignSidebar/SidebarCopyViewer';
import SidebarHookViewer from '../CampaignSidebar/SidebarHookViewer';
import SidebarCloseViewer from './SidebarCloseViewer';
import SidebarReviewViewer from './SidebarReviewViewer';
import SidebarTextArea from './SidebarTextArea';
import React, { useContext } from 'react';

export function CampaignSidebar() {
    const {
        copies,
        copyPosition,
        updateCopyPosition,
        hooks,
        hookPosition,
        updateHookPosition,
        claims,
        claimPosition,
        updateClaimPosition,
        closes,
        closePosition,
        updateClosePosition,
        reviews,
        reviewPosition,
        updateReviewPosition,
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
                setReviewPosition={updateReviewPosition}
                totalReviews={reviews.length}
            />
            <SidebarTextArea
                textArray={reviews.map((review) => review.reviewText)}
                position={reviewPosition}
                rows={2}
            />

            <SidebarHookViewer
                hookPosition={hookPosition}
                setHookPosition={updateHookPosition}
                totalHooks={hooks.length}
            />
            <SidebarTextArea textArray={hooks.map((hook) => hook.hookText)} position={hookPosition} rows={2} />

            <hr className="w-11/12 self-end dark:border-slate-500" />

            <SidebarCopyViewer
                copyPosition={copyPosition}
                setCopyPosition={updateCopyPosition}
                totalCopies={copies.length}
            />
            <SidebarTextArea textArray={copies.map((copy) => copy.copyText)} position={copyPosition} rows={2} />

            <SidebarClaimViewer
                claimPosition={claimPosition}
                setClaimPosition={updateClaimPosition}
                totalClaims={claims.length}
            />
            <SidebarTextArea textArray={claims.map((claim) => claim.claimText)} position={claimPosition} rows={2} />

            <SidebarCloseViewer
                closePosition={closePosition}
                setClosePosition={updateClosePosition}
                totalCloses={closes.length}
            />
            <SidebarTextArea textArray={closes.map((close) => close.closeText)} position={closePosition} rows={2} />

            <hr className="w-11/12 self-end dark:border-slate-500" />
        </div>
    );
}
