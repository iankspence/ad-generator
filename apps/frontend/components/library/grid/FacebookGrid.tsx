import React from 'react';
import { Grid, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const FacebookGrid = ({ handleResize, setAdsWidth, setPdfWidth, setFacebookWidth, ads, facebookWidth, refreshAds }) => {
    return (
        <Grid container item xs={facebookWidth} style={getGridItemStyle(facebookWidth)}>
            {
                facebookWidth === 2 &&
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
                    onClick={() => handleResize(setFacebookWidth, setAdsWidth, setPdfWidth)}
                >
                    <KeyboardArrowLeftIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
            <Grid item xs={facebookWidth === 8 ? 12 : 11}>
                <Typography variant="h6">Facebook Ad Sets</Typography>
                {ads.filter(ad => ad.adStatus === 'facebook').map((ad, index) => (
                    <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, facebookWidth, refreshAds)}</div>
                ))}
            </Grid>
        </Grid>
    );
};

export default FacebookGrid;
