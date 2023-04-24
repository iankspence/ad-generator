import ContentGenerator from '../components/ContentGenerator';
import TopNav from '../components/TopNav';
import { CampaignSidebar } from '../components/sidebar/CampaignSidebar';
import CampaignProvider, { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import React, { useContext, useState } from 'react';

function CampaignPage() {
    const user = useContext(UserContext);
    const account = user?.account;

    return (
        <CampaignProvider>
            <div className="bg-reviewDrumLightGray">
                <div className="w-full">
                    <TopNav />
                    <div className="bg-black min-h-screen w-full text-white flex flex-col justify-center">
                        <div className="flex flex-col md:flex-row flex-grow">
                            <div className="flex-1">
                                <CampaignSidebar />
                            </div>
                            <div className="flex-grow">
                                <ContentGenerator />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CampaignProvider>
    );
}

export default CampaignPage;
