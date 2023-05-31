import ContentGenerator from '../components/pixi/content-generator/ContentGenerator';
import TopNav from '../components/top-nav/TopNav';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { getTextByAccountId } from '../utils/api/mongo/account/getTextByAccountIdApi';
import React, { useContext, useEffect } from 'react';
import { GetTextByAccountIdDto } from '../../../libs/type/src/lib/dto/mongo/account/get-text-by-account-id.dto';

function CampaignPage() {
    const { account } = useContext(UserContext);
    const { updateReviews, updateHooks, updateCopies, updateClaims, updateCloses } = useContext(CampaignContext);

    useEffect(() => {
        if (!account) return;
        const fetchData = async () => {
            const getTextByAccountIdDto: GetTextByAccountIdDto = {accountId: account?._id.toString()}
            const allText = await getTextByAccountId(getTextByAccountIdDto);

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
