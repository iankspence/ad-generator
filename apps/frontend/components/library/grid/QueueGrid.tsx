import React from 'react';
import { Grid, IconButton, Typography } from "@material-ui/core";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const QueueGrid = ({ handleResize, setAdsWidth, setActiveWidth, setDeliveryWidth, ads, activeWidth }) => {
    return (
        <Grid item xs={activeWidth} style={getGridItemStyle(activeWidth)}>
            <IconButton onClick={() => handleResize(setActiveWidth, setAdsWidth, setDeliveryWidth)}>
                <UnfoldMoreIcon style={{ transform: "rotate(90deg)", color: activeWidth === 8 ? 'lightgrey' : 'inherit' }} />
            </IconButton>
            <Typography variant="h6">Queue</Typography>
            {ads.filter(ad => ad.adStatus === 'queue').map((ad, index) => (
                <div key={index}>{RenderLibraryCards(ad, activeWidth)}</div>
            ))}
        </Grid>
    );
};

export default QueueGrid;
