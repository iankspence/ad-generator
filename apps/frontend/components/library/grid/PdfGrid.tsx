import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';
import { Ad } from '@monorepo/type';
import { audiences } from '../../../utils/constants/audiences';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { deleteAdSetAndAdsAndCards } from '../../../utils/api/mongo/ad-set/deleteAdSetAndAdsAndCardsApi';

const PdfGrid = ({ handleResize, setAdsWidth, setPdfWidth, setFacebookWidth, ads, pdfWidth, facebookWidth, refreshAds }) => {
    const groupAdsByAdSet = (ads) => {
        return ads.reduce((groups, ad) => {
            const groupId = ad.adSetId;
            if (!groups[groupId]) {
                groups[groupId] = {
                    ads: [],
                    adSetNameDateTime: ad.adSetNameDateTime,
                };
            }
            groups[groupId].ads.push(ad);
            return groups;
        }, {});
    };

    const handleDeleteAdSetClick = (adSetId: string) => async (event) => {
        event.stopPropagation();

        if (window.confirm("Are you sure you want to delete this Ad Set and its associated Ads? This can't be undone!")) {
            try {
                await deleteAdSetAndAdsAndCards(adSetId);
                refreshAds();
                setTimeout(() => {
                    refreshAds();
                }, 7000);
            } catch (error) {
                alert("Failed to delete Ad Set. Please try again later.");
            }
        }
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
        <Grid container item xs={pdfWidth} style={getGridItemStyle(pdfWidth)}>
            {
                pdfWidth === 2 && facebookWidth === 2 &&
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
                    onClick={() => handleResize(setPdfWidth, setAdsWidth, setFacebookWidth)}
                >
                    <KeyboardArrowLeftIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
            <Grid item xs={pdfWidth === 8 ? 12 : 11}>
                <Typography variant="h6">PDF Ad Sets</Typography>
                {
                    Object.entries(groupAdsByAdSet(ads.filter(ad => ad.adStatus === 'pdf')))
                        .map(([adSetId, adSet]: [string, { ads: Ad[], adSetNameDateTime: string }], index) => {
                            const mostCommonAudienceName = getMostCommonAudienceName(adSet.ads);
                            return (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{adSet.adSetNameDateTime} - {mostCommonAudienceName}</Typography>
                                        <IconButton
                                            onClick={handleDeleteAdSetClick(adSetId)}
                                            style={{padding: '0', position: 'relative', top: '50%', right: '-2%', opacity: '30%'}}
                                        >
                                            <HighlightOffOutlinedIcon />
                                        </IconButton>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            {adSet.ads.map((ad, index) => (
                                                <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, pdfWidth, refreshAds)}</div>
                                            ))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                }
            </Grid>
            {
                pdfWidth === 2 && facebookWidth === 8 &&
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
                    onClick={() => handleResize(setPdfWidth, setAdsWidth, setFacebookWidth)}
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

export default PdfGrid;
