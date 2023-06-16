import React, { useContext, useEffect, useState } from 'react';
import { findAdsByAccountId } from "../utils/api/mongo/ad/findAdsByAccountIdApi";
import UserContext from "../contexts/UserContext";
import LoadingScreen from "../components/loading-screen/LoadingScreen";
import { FindAdsByAccountIdDto } from "@monorepo/type";
import { useUser } from '../hooks/useUser';
import DeliveriesViewer from '../components/deliveries/DeliveriesViewer';

export default function Deliveries() {
    const [deliveredAds, setDeliveredAds] = useState([]);
    const { account } = useContext(UserContext);
    useUser();

    useEffect(() => {
        const fetchAds = async () => {
            const findAdsByAccountIdDto: FindAdsByAccountIdDto = {
                accountId: account?._id.toString(),
            }
            const ads = await findAdsByAccountId(findAdsByAccountIdDto)
            const deliveredAds = ads.filter(ad => ad.adStatus === 'delivered');
            setDeliveredAds(deliveredAds);
        };
        fetchAds();

    }, [account]);

    if (!account) return <LoadingScreen />;

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <div style={{ flexGrow: 1, padding: 8 }}>
                <DeliveriesViewer ads={deliveredAds}/>
            </div>
        </div>
    );
}
