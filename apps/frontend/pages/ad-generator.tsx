import React, { useContext, useEffect, useState } from 'react'; // add useState
import { useRouter } from 'next/router'; // add useRouter
import ContentGenerator from '../components/ad-generator/content-generator/ContentGenerator';
import { CampaignContext } from '../contexts/CampaignContext';
import UserContext from '../contexts/UserContext';
import { findTextByAccountId } from '../utils/api/mongo/account/findTextByAccountIdApi';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { useUser } from '../hooks/useUser';
import { FindTextByAccountIdDto } from '@monorepo/type';

function AdGeneratorPage() {
    const router = useRouter();
    const { account, user } = useContext(UserContext);
    const { updateReviews, updateHooks, updateCopies, updateClaims, updateCloses } = useContext(CampaignContext);
    const [navHovered, setNavHovered] = useState(false);

    useUser();
    useEffect(() => {
        const handleRouteChange = () => {
            setNavHovered(false);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.pathname]);

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
        <div className={`bg-reviewDrumLightGray ${router.pathname === '/ad-generator' && !navHovered ? 'bg-reviewDrumDarkGray' : ''}`} onMouseEnter={() => setNavHovered(true)} onMouseLeave={() => setNavHovered(false)}>
            <div className="w-full">
                <div className="bg-reviewDrumDarkGray min-h-screen w-full text-white flex flex-col justify-center">
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

export default AdGeneratorPage;
