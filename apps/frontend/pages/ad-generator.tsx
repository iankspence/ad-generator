import ContentGenerator from '../components/pixi/content-generator/ContentGenerator';
import TopNav from '../components/nav-bars/TopNav';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { findTextByAccountId } from '../utils/api/mongo/account/findTextByAccountIdApi';
import React, { useContext, useEffect } from 'react';
import { FindTextByAccountIdDto } from '@monorepo/type';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { useUser } from '../hooks/useUser';
import BottomNav from '../components/nav-bars/BottomNav';

function AdGeneratorPage() {
    const { account, user } = useContext(UserContext);
    const { updateReviews, updateHooks, updateCopies, updateClaims, updateCloses } = useContext(CampaignContext);

    useUser();

    useEffect(() => {
        if (!account) return;
        const fetchData = async () => {
            const findTextByAccountIdDto: FindTextByAccountIdDto = {accountId: account?._id.toString()}
            const allText = await findTextByAccountId(findTextByAccountIdDto);

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

    if ( !user || !user?.roles ) return <LoadingScreen />;

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
            <BottomNav />
        </div>
    );
}

export default AdGeneratorPage;
