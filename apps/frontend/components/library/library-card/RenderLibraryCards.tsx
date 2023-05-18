import React from 'react';
import LibraryCard from './LibraryCard';
import { Grid } from '@material-ui/core';

const RenderLibraryCards = (ad, width) => {

    if (width === 2) {
        return <LibraryCard key={ad.hookCardId} ad={ad} cardLocation={ad.hookCardLocation}/>;
    } else {
        return (
            <Grid container direction="row" justifyContent="space-between">
                <Grid item  xs={3}>
                    <LibraryCard ad={ad} cardLocation={ad.hookCardLocation} />
                </Grid>
                <Grid item key={ad.claimCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={ad.claimCardLocation}/>
                </Grid>
                <Grid item key={ad.reviewCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={ad.reviewCardLocation}/>
                </Grid>
                <Grid item key={ad.closeCardId} xs={3}>
                    <LibraryCard ad={ad} cardLocation={ad.closeCardLocation}/>
                </Grid>
            </Grid>
        );
    }
};

export default RenderLibraryCards;
