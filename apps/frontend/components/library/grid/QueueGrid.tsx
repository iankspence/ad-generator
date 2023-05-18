import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const QueueGrid = ({ handleResize, setAdsWidth, setQueueWidth, setDeliveryWidth, ads, queueWidth, deliveryWidth, refreshAds }) => {
    return (
        <Grid container item xs={queueWidth} style={getGridItemStyle(queueWidth)}>
            {
                queueWidth === 2 && deliveryWidth === 2 &&
                <Grid
                    item
                    xs={1}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        borderRadius: '5px 0 0 5px',
                    }}
                    onClick={() => handleResize(setQueueWidth, setAdsWidth, setDeliveryWidth)}
                >
                    <KeyboardArrowLeftIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
            <Grid item xs={queueWidth === 8 ? 12 : 11}>
                <Typography variant="h6">Queue</Typography>
                {ads.filter(ad => ad.adStatus === 'queue').map((ad, index) => (
                    <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, queueWidth, refreshAds)}</div>
                ))}
            </Grid>
            {
                queueWidth === 2 && deliveryWidth === 8 &&
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
                    onClick={() => handleResize(setQueueWidth, setAdsWidth, setDeliveryWidth)}
                >
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

export default QueueGrid;
