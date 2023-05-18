import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AudienceSelector from "../../pixi/design-drawer/text-input/selector/AudienceSelector";
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const AdsGrid = ({ handleResize, setAdsWidth, setActiveWidth, setDeliveryWidth, selectAdsByAudience, setSelectAdsByAudience, ads, adsWidth }) => {
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
                    backgroundColor: '#f2f2f2',
                }}
                onClick={() => handleResize(setAdsWidth, setActiveWidth, setDeliveryWidth)}
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
                        backgroundColor: '#f2f2f2',
                    }}
                    onClick={() => handleResize(setAdsWidth, setActiveWidth, setDeliveryWidth)}
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
