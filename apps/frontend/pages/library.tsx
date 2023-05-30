import React, {useContext, useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import TopNav from "../components/top-nav/TopNav";
import { getAdsByAccountId } from "../utils/api/mongo/ad/getAdsByAccountIdApi";
import UserContext from "../contexts/UserContext";
import {CampaignContext} from "../contexts/CampaignContext";
import AdsGrid from "../components/library/grid/AdsGrid";
import PdfGrid from "../components/library/grid/PdfGrid";
import FacebookGrid from "../components/library/grid/FacebookGrid";

const Library = () => {
    const { account } = useContext(UserContext);
    const { ads, updateAds } = useContext(CampaignContext);
    const [adsWidth, setAdsWidth] = useState(2);
    const [pdfWidth, setPdfWidth] = useState(8);
    const [facebookWidth, setFacebookWidth] = useState(2);

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
                        setPdfWidth={setPdfWidth}
                        setFacebookWidth={setFacebookWidth}
                        ads={ads}
                        adsWidth={adsWidth}
                        refreshAds={refreshAds}
                    />
                    <PdfGrid
                        handleResize={handleResize}
                        setAdsWidth={setAdsWidth}
                        setPdfWidth={setPdfWidth}
                        setFacebookWidth={setFacebookWidth}
                        ads={ads}
                        pdfWidth={pdfWidth}
                        facebookWidth={facebookWidth}
                        refreshAds={refreshAds}
                    />
                    <FacebookGrid
                        handleResize={handleResize}
                        setAdsWidth={setAdsWidth}
                        setPdfWidth={setPdfWidth}
                        setFacebookWidth={setFacebookWidth}
                        ads={ads}
                        facebookWidth={facebookWidth}
                        refreshAds={refreshAds}
                    />
                </Grid>
            </div>
        </>
    );
};

export default Library;
