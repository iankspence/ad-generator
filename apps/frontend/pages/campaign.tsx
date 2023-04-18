import DownloadCampaignButton from '../components/CampaignSidebar/DownloadCampaignButton';
import SidebarCampaignOverview from '../components/CampaignSidebar/SidebarCampaignOverview';
import SidebarClaimViewer from '../components/CampaignSidebar/SidebarClaimViewer';
import SidebarCopyViewer from '../components/CampaignSidebar/SidebarCopyViewer';
import SidebarHookViewer from '../components/CampaignSidebar/SidebarHookViewer';
import ContentCanvas from '../components/ContentCanvas';
import SidebarReviewViewer from '../components/ReviewsSidebar/SidebarReviewViewer';
import SidebarTextArea from '../components/ReviewsSidebar/SidebarTextArea';
import TopNav from '../components/TopNav';
import CampaignProvider, { CampaignContext } from '../contexts/CampaignContext';

import UserContext from '../contexts/UserContext';
import React, { useContext, useState } from 'react';

function CampaignPage() {
    const user = useContext(UserContext);
    const account = user?.account;

    const { currentTheme, copies, hooks, claims, reviews, closes, updateCurrentTheme } = useContext(CampaignContext);

    return (
        <CampaignProvider>
            <div className="bg-reviewDrumLightGray">
                <div className="w-full min-w-fit">
                    <TopNav />
                    <div className="bg-black min-h-screen min-w-fit w-full text-white flex flex-col justify-center">
                        <div className="flex flex-col md:flex-row flex-grow">
                            {/* Sidebar */}

                            <ContentCanvas hooks={hooks} claims={claims} reviews={reviews} closes={closes} />
                        </div>
                    </div>
                </div>
            </div>
        </CampaignProvider>
    );
}

export default CampaignPage;
