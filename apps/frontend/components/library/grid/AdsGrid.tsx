import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AudienceSelector from "../../pixi/design-drawer/text-input/selector/AudienceSelector";
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const AdsGrid = ({ handleResize, setAdsWidth, setQueueWidth, setDeliveryWidth, ads, adsWidth }) => {
    return (
        <Grid container item xs={adsWidth} style={getGridItemStyle(adsWidth)}>
            <Grid item xs={adsWidth === 8 ? 12 : 11}>
                <AudienceSelector countTarget={'ads'}/>
                <Typography variant="h6">Ads</Typography>
                {ads.filter(ad => ad.adStatus === 'fresh').map((ad, index) => (
                    <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, adsWidth)}</div>
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
            >{
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
