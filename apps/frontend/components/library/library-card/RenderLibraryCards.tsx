import React from 'react';
import LibraryCard from './LibraryCard';
import { Grid } from '@mui/material';

const RenderLibraryCards = (ad, width, refreshAds) => {

    const cardLocations = {
        hook: null,
        claim: null,
        review: null,
        close: null
    };
    ad.cardLocations.forEach(cardLocation => {
        if (cardLocation.canvasName === "hook") {
            cardLocations.hook = ad.cardLocations.find(cardLocation => cardLocation.canvasName === "hook").cardLocation;
        }
        if (cardLocation.canvasName === "claim") {
            cardLocations.claim = ad.cardLocations.find(cardLocation => cardLocation.canvasName === "claim").cardLocation;
        }
        if (cardLocation.canvasName === "review") {
            cardLocations.review = ad.cardLocations.find(cardLocation => cardLocation.canvasName === "review").cardLocation;
        }
        if (cardLocation.canvasName === "close") {
            cardLocations.close = ad.cardLocations.find(cardLocation => cardLocation.canvasName === "close").cardLocation;
        }
    });

    if (width === 2) {
        return <LibraryCard key={cardLocations.hook} ad={ad} cardLocation={cardLocations.hook} refreshAds={refreshAds}/>;
    } else {
        return (
            <Grid container direction="row" justifyContent="space-between">
                <Grid item  xs={3}>
                    <LibraryCard ad={ad} cardLocation={cardLocations.hook} refreshAds={refreshAds} />
                </Grid>
                <Grid item key={ad.claimCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={cardLocations.claim} refreshAds={refreshAds}/>
                </Grid>
                <Grid item key={ad.reviewCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={cardLocations.review} refreshAds={refreshAds}/>
                </Grid>
                <Grid item key={ad.closeCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={cardLocations.close} refreshAds={refreshAds}/>
                </Grid>
            </Grid>
        );
    }
};

export default RenderLibraryCards;
