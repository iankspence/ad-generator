import React from 'react';
import { Grid, IconButton, Typography } from "@material-ui/core";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const DeliveredGrid = ({ handleResize, setAdsWidth, setActiveWidth, setDeliveryWidth, ads, deliveryWidth }) => {
    return (
        <Grid item xs={deliveryWidth} style={getGridItemStyle(deliveryWidth)}>
            <IconButton onClick={() => handleResize(setDeliveryWidth, setAdsWidth, setActiveWidth)}>
                <UnfoldMoreIcon style={{ transform: "rotate(90deg)", color: deliveryWidth === 8 ? 'lightgrey' : 'inherit' }} />
            </IconButton>
            <Typography variant="h6">Delivered</Typography>
            {ads.filter(ad => ad.adStatus === 'delivered').map((ad, index) => (
                <div key={index}>{RenderLibraryCards(ad, deliveryWidth)}</div>
            ))}
        </Grid>
    );
};

export default DeliveredGrid;
