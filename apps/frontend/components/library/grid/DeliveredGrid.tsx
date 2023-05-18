import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const DeliveredGrid = ({ handleResize, setAdsWidth, setQueueWidth, setDeliveryWidth, ads, deliveryWidth }) => {
    return (
        <Grid container item xs={deliveryWidth} style={getGridItemStyle(deliveryWidth)}>
            {
                deliveryWidth === 2 &&
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
                    onClick={() => handleResize(setDeliveryWidth, setAdsWidth, setQueueWidth)}
                >
                    <KeyboardArrowLeftIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
            <Grid item xs={deliveryWidth === 8 ? 12 : 11}>
                <Typography variant="h6">Delivered</Typography>
                {ads.filter(ad => ad.adStatus === 'delivered').map((ad, index) => (
                    <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, deliveryWidth)}</div>
                ))}
            </Grid>
        </Grid>
    );
};

export default DeliveredGrid;
