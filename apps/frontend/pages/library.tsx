import React, {useContext, useEffect, useState} from "react";
import { Grid } from "@mui/material";
import TopNav from "../components/top-nav/TopNav";
import { findAdsByAccountId } from "../utils/api/mongo/ad/findAdsByAccountIdApi";
import UserContext from "../contexts/UserContext";
import {CampaignContext} from "../contexts/CampaignContext";
import AdsGrid from "../components/library/grid/AdsGrid";
import PdfGrid from "../components/library/grid/PdfGrid";
import FacebookGrid from "../components/library/grid/FacebookGrid";
import LoadingScreen from "../components/loading-screen/LoadingScreen";
import { FindAdsByAccountIdDto } from "@monorepo/type";
import { useUser } from '../hooks/useUser';

const Library = () => {
    const { account, user } = useContext(UserContext);
    const { ads, updateAds } = useContext(CampaignContext);
    const [adsWidth, setAdsWidth] = useState(2);
    const [pdfWidth, setPdfWidth] = useState(8);
    const [facebookWidth, setFacebookWidth] = useState(2);

    useUser();

    useEffect(() => {
        const fetchAds = async () => {
            const findAdsByAccountIdDto: FindAdsByAccountIdDto = {
                accountId: account?._id.toString(),
            }
            const ads = await findAdsByAccountId(findAdsByAccountIdDto);
            updateAds(ads);
        };
        fetchAds();
    }, [account]);

    const handleResize = (
        setterToExpand,
        setterToShrink1,
        setterToShrink2
    ) => {
        setterToExpand(8);
        setterToShrink1(2);
        setterToShrink2(2);
    };

    const refreshAds = async () => {
        const findAdsByAccountIdDto: FindAdsByAccountIdDto = {
            accountId: account?._id.toString(),
        }
        const newAds = await findAdsByAccountId(findAdsByAccountIdDto);
        updateAds(newAds);
    };

    if ( !user || !user?.roles ) return <LoadingScreen />;

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
