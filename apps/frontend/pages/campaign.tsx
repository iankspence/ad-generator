import ContentGenerator from '../components/content-generator/ContentGenerator';
import TopNav from '../components/TopNav';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import useAccount from '../hooks/useAccount';
import { getAllTextByAccountId } from '../utils/api';
import React, { useContext, useEffect } from 'react';

function CampaignPage() {
    const { user } = useContext(UserContext);
    const { updateReviews, updateHooks, updateCopies, updateClaims, updateCloses } = useContext(CampaignContext);

    const { account } = useAccount(user?._id);

    useEffect(() => {
        if (!account) return;
        const fetchData = async () => {
            const allText = await getAllTextByAccountId(account?._id.toString());

            if (account) {
                updateReviews(allText[0]);
                updateHooks(allText[1]);
                updateClaims(allText[2]);
                updateCloses(allText[3]);
                updateCopies(allText[4]);
            }
        };

        fetchData();
    }, [account]);

    return (
        <div className="bg-reviewDrumLightGray">
            <div className="w-full">
                <TopNav />
                <div className="bg-black min-h-screen w-full text-white flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row flex-grow">
                        <div className="flex-grow">
                            <ContentGenerator primaryColor={account?.primaryColor} secondaryColor={account?.secondaryColor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignPage;
