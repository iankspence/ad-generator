import React, {useContext, useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import TopNav from "../components/top-nav/TopNav";
import { getAdsByAccountId } from "../utils/api";
import UserContext from "../contexts/UserContext";
import {CampaignContext} from "../contexts/CampaignContext";
import AdsGrid from "../components/library/grid/AdsGrid";
import QueueGrid from "../components/library/grid/QueueGrid";
import DeliveredGrid from "../components/library/grid/DeliveredGrid";

const Library = () => {
    const { account } = useContext(UserContext);
    const { ads, updateAds } = useContext(CampaignContext);
    const [adsWidth, setAdsWidth] = useState(2);
    const [queueWidth, setQueueWidth] = useState(8);
    const [deliveryWidth, setDeliveryWidth] = useState(2);

    const handleResize = (
        setterToExpand,
        setterToShrink1,
        setterToShrink2
    ) => {
        setterToExpand(8);
        setterToShrink1(2);
        setterToShrink2(2);
    };

    useEffect(() => {
        const fetchAds = async () => {
            const ads = await getAdsByAccountId(account?._id);
            updateAds(ads);
        };
        fetchAds();
    }, [account]);

    const refreshAds = async () => {
        const newAds = await getAdsByAccountId(account?._id.toString());
        updateAds(newAds);
    };

    return (
        <>
            <TopNav />

            <div style={{ flexGrow: 1, paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                <Grid container spacing={0}>
                    <AdsGrid
                        handleResize={handleResize}
                        setAdsWidth={setAdsWidth}
                        setQueueWidth={setQueueWidth}
                        setDeliveryWidth={setDeliveryWidth}
                        ads={ads}
                        adsWidth={adsWidth}
                        refreshAds={refreshAds}
                    />
                    <QueueGrid
                        handleResize={handleResize}
                        setAdsWidth={setAdsWidth}
                        setQueueWidth={setQueueWidth}
                        setDeliveryWidth={setDeliveryWidth}
                        ads={ads}
                        queueWidth={queueWidth}
                        deliveryWidth={deliveryWidth}
                        refreshAds={refreshAds}
                    />
                    <DeliveredGrid
                        handleResize={handleResize}
                        setAdsWidth={setAdsWidth}
                        setQueueWidth={setQueueWidth}
                        setDeliveryWidth={setDeliveryWidth}
                        ads={ads}
                        deliveryWidth={deliveryWidth}
                        refreshAds={refreshAds}
                    />
                </Grid>
            </div>
        </>
    );
};

export default Library;
