import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';
import { Ad } from '@monorepo/type';
import {
    getBestFitAudienceNameAgeRangeAndInterests
} from '../../../utils/audience/getBestFitAudienceNameAgeRangeAndInterests';

const QueueGrid = ({ handleResize, setAdsWidth, setQueueWidth, setDeliveryWidth, ads, queueWidth, deliveryWidth, refreshAds }) => {

    const groupAdsByAdSet = (ads) => {
        return ads.reduce((groups, ad) => {
            const groupId = ad.adSetNameDateTime;
            if (!groups[groupId]) {
                groups[groupId] = [];
            }
            groups[groupId].push(ad);
            return groups;
        }, {});
    };

    if (!ads) return null;
    const { bestFitAudienceName, ageRange, interests } = getBestFitAudienceNameAgeRangeAndInterests(ads[0]);

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
                {
                    Object.entries(groupAdsByAdSet(ads.filter(ad => ad.adStatus === 'queue')))
                        .map(([adSetId, ads]: [string, Ad[]], index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{adSetId} - {bestFitAudienceName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        {ads.map((ad, index) => (
                                            <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, queueWidth, refreshAds)}</div>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))
                }
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
