import React, {useContext, useEffect, useState} from 'react';
import { Grid, Typography } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MultiAudienceSelector from '../selector/MultiAudienceSelector';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';
import { audiences } from "../../../utils/constants/audiences";
import {CampaignContext} from "../../../contexts/CampaignContext";
import { getAdsByAccountId } from '../../../utils/api';
import UserContext from "../../../contexts/UserContext";

const AdsGrid = ({ handleResize, setAdsWidth, setQueueWidth, setDeliveryWidth, ads, adsWidth, refreshAds }) => {
    const [selectedAudiences, setSelectedAudiences] = useState([]);
    const { updateAds } = useContext(CampaignContext);
    const { account } = useContext(UserContext);

    useEffect(() => {
        const fetchAds = async () => {
            const fetchedAds = await getAdsByAccountId(account?._id.toString());
            updateAds(fetchedAds);
        };

        fetchAds();
    }, []);

    return (
        <Grid container item xs={adsWidth} style={getGridItemStyle(adsWidth)}>
            <Grid item xs={adsWidth === 8 ? 12 : 11}>
                <MultiAudienceSelector
                    audiences={audiences}
                    selectedAudiences={selectedAudiences}
                    setSelectedAudiences={setSelectedAudiences}
                />
                <Typography variant="h6">Ads</Typography>
                {ads.filter(ad => ad.adStatus === 'fresh').map((ad, index) => (
                    <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, adsWidth, refreshAds)}</div>
                ))}
            </Grid>
            {
                adsWidth === 2 &&
                <Grid
                    item
                    xs={1}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        borderRadius: '0 5px 5px 0',
                    }}
                    onClick={() => handleResize(setAdsWidth, setQueueWidth, setDeliveryWidth)}
                >
                    {
                        adsWidth === 2 &&
                        <Grid
                            item
                            xs={1}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderRadius: '0 5px 5px 0',
                            }}
                            onClick={() => handleResize(setAdsWidth, setQueueWidth, setDeliveryWidth)}
                        >

                        </Grid>
                    }
                    <KeyboardArrowRightIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
        </Grid>
    );
};

export default AdsGrid;
