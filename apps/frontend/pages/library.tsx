import React, {useContext, useEffect, useState} from "react";
import { Grid, IconButton, Typography, GridSize } from "@material-ui/core";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import TopNav from "../components/top-nav/TopNav";
import { getAdsByAccountId } from "../utils/api";
import UserContext from "../contexts/UserContext";
import RenderLibraryCards from '../components/library/libarary-card/RenderLibraryCards';

const Library = () => {
    const { account } = useContext(UserContext);
    const [adsWidth, setAdsWidth] = useState<GridSize>(2);
    const [activeWidth, setActiveWidth] = useState<GridSize>(8);
    const [deliveryWidth, setDeliveryWidth] = useState<GridSize>(2);
    const [ads, setAds] = useState([]);

    const handleResize = (
        setterToExpand: (value: GridSize) => void,
        setterToShrink1: (value: GridSize) => void,
        setterToShrink2: (value: GridSize) => void
    ) => {
        setterToExpand(8);
        setterToShrink1(2);
        setterToShrink2(2);
    };

    useEffect(() => {
        const fetchAds = async () => {
            const ads = await getAdsByAccountId(account?._id);
            setAds(ads);
        };

        fetchAds();
    }, [account]);

    return (
        <>
            <TopNav />

            <div style={{ flexGrow: 1, padding: 8 }}>
                <Grid container spacing={3}>
                    <Grid item xs={adsWidth as GridSize}>
                        <IconButton onClick={() => handleResize(setAdsWidth, setActiveWidth, setDeliveryWidth)}>
                            <UnfoldMoreIcon style={{ transform: "rotate(90deg)", color: adsWidth === 8 ? 'lightgrey' : 'inherit' }} />
                        </IconButton>
                        <Typography variant="h6">Ads</Typography>
                        {ads.filter(ad => ad.adStatus === 'fresh').map((ad, index) => (
                            <div key={index}>{RenderLibraryCards(ad, adsWidth)}</div>
                        ))}
                    </Grid>
                    <Grid item xs={activeWidth as GridSize}>
                        <IconButton onClick={() => handleResize(setActiveWidth, setAdsWidth, setDeliveryWidth)}>
                            <UnfoldMoreIcon style={{ transform: "rotate(90deg)", color: activeWidth === 8 ? 'lightgrey' : 'inherit' }} />
                        </IconButton>
                        <Typography variant="h6">Queue</Typography>
                        {ads.filter(ad => ad.adStatus === 'queue').map((ad, index) => (
                            <div key={index}>{RenderLibraryCards(ad, activeWidth)}</div>
                        ))}
                    </Grid>
                    <Grid item xs={deliveryWidth as GridSize}>
                        <IconButton onClick={() => handleResize(setDeliveryWidth, setAdsWidth, setActiveWidth)}>
                            <UnfoldMoreIcon style={{ transform: "rotate(90deg)", color: deliveryWidth === 8 ? 'lightgrey' : 'inherit' }} />
                        </IconButton>
                        <Typography variant="h6">Delivered</Typography>
                        {ads.filter(ad => ad.adStatus === 'delivered').map((ad, index) => (
                            <div key={index}>{RenderLibraryCards(ad, deliveryWidth)}</div>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Library;
