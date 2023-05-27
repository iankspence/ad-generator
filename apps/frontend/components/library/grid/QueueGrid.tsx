import React, { useContext } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';
import { Ad } from '@monorepo/type';
import { CampaignContext } from '../../../contexts/CampaignContext'
import { audiences } from '../../../utils/constants/audiences';

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

    const getMostCommonAudienceName = (ads) => {
        const audienceCounts = ads.reduce((counts, ad) => {
            const audience = Number(ad.bestFitAudience);
            if (!counts[audience]) {
                counts[audience] = 0;
            }
            counts[audience]++;
            return counts;
        }, {});

        let maxCount = 0;
        let mostCommonAudience = null;
        for (const audience in audienceCounts) {
            if (audienceCounts[audience] > maxCount) {
                maxCount = audienceCounts[audience];
                mostCommonAudience = audience;
            }
        }

        // Return the name of the most common audience, or null if no audience was found
        return mostCommonAudience ? audiences[mostCommonAudience-1].name : null;
    };

    if (!ads.length) return null;

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
                        .map(([adSetId, ads]: [string, Ad[]], index) => {
                            const mostCommonAudienceName = getMostCommonAudienceName(ads);
                            return (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{adSetId} - {mostCommonAudienceName}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            {ads.map((ad, index) => (
                                                <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, queueWidth, refreshAds)}</div>
                                            ))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
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
