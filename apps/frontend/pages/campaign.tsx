import ContentGenerator from '../components/ContentGenerator';
import { CampaignSidebar } from '../components/Sidebar/CampaignSidebar';
import TopNav from '../components/TopNav';
import CampaignProvider, { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import React, { useContext, useState } from 'react';

function CampaignPage() {
    const user = useContext(UserContext);
    const account = user?.account;

    return (
        <CampaignProvider>
            <div className="bg-reviewDrumLightGray">
                <div className="w-full min-w-fit">
                    <TopNav />
                    <div className="bg-black min-h-screen min-w-fit w-full text-white flex flex-col justify-center">
                        <div className="flex flex-col md:flex-row flex-grow">
                            <CampaignSidebar />
                            {/*<ContentCanvas />*/}
                            <ContentGenerator />
                        </div>
                    </div>
                </div>
            </div>
        </CampaignProvider>
    );
}

export default CampaignPage;
