import React from 'react';
import LibraryCard from './LibraryCard';
import { Grid } from '@material-ui/core';

const RenderLibraryCards = (ad, width) => {

    if (width === 2) {
        return <LibraryCard key={ad.hookCardId} ad={ad} cardLocation={ad.hookCardLocation}/>;
    } else {
        return (
            <Grid container direction="row" justifyContent="space-between">
                <Grid item key={ad.hookCardId}>
                    <LibraryCard ad={ad} cardLocation={ad.hookCardLocation}/>
                </Grid>
                <Grid item key={ad.claimCardId} >
                    <LibraryCard ad={ad} cardLocation={ad.claimCardLocation}/>
                </Grid>
                <Grid item key={ad.reviewCardId}  >
                    <LibraryCard ad={ad} cardLocation={ad.reviewCardLocation}/>
                </Grid>
                <Grid item key={ad.closeCardId}>
                    <LibraryCard ad={ad} cardLocation={ad.closeCardLocation}/>
                </Grid>
            </Grid>
        );
    }
};

export default RenderLibraryCards;
