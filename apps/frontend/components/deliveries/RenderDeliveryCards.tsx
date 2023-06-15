import React from 'react';
import DeliveryCard from './DeliveryCard';
import { Grid } from '@mui/material';

const RenderDeliveryCards = ({ ad, width, refreshAds }) => {
    const cardLocations = {
        hook: null,
        claim: null,
        review: null,
        close: null
    };

    ad.cardLocations.forEach(cardLocation => {
        cardLocations[cardLocation.canvasName] = cardLocation.cardLocation;
    });

    const cards = ['hook', 'claim', 'review', 'close'];

    if (width === 1) {
        return (
            <DeliveryCard
                key={ad._id}
                ad={ad}
                cardLocations={cardLocations}
                refreshAds={refreshAds}
            />
        );
    } else {
        return (
            <Grid container direction="row" justifyContent="space-between">
                {cards.map((card, index) => (
                    <Grid key={index} item xs={3}>
                        <DeliveryCard
                            key={`${ad._id}-${card}`}
                            ad={ad}
                            cardLocations={cardLocations}
                            refreshAds={refreshAds}
                            initialCard={card}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
};

export default RenderDeliveryCards;
