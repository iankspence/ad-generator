import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';
import { AdDocument, CopyCardsAndAdDto } from '@monorepo/type';
import { audiences } from '../../../utils/constants/audiences';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { deleteAdSetAndAdsAndCards } from '../../../utils/api/mongo/ad-set/deleteAdSetAndAdsAndCardsApi';
import { DeleteAdSetAndAdsAndCardsDto } from '@monorepo/type';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { copyCardsAndAd } from '../../../utils/api/mongo/card/copyCardsAndAdApi';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { findPdfLocationByAdSetId } from '../../../utils/api/mongo/ad-set/findPdfLocationByAdSetIdApi';

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
                const deleteAdSetAndAdsAndCardsDto: DeleteAdSetAndAdsAndCardsDto = {
                    adSetId,
                }
                await deleteAdSetAndAdsAndCards(deleteAdSetAndAdsAndCardsDto);
                refreshAds();
                const timeout = 2000 * ads.length;
                setTimeout(() => {
                    refreshAds();
                }, timeout);
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

        return mostCommonAudience ? audiences[mostCommonAudience-1].name : null;
    };

    const handleCopyAdSetClick = (adSetAds: AdDocument[]) => async (event) => {
        event.stopPropagation();

        if (window.confirm("Are you sure you want to copy this Ad Set and its associated Ads?")) {
            for (const ad of adSetAds) {
                try {
                    const copyCardsAndAdDto: CopyCardsAndAdDto = {
                        adId: ad._id.toString(),
                    }
                    await copyCardsAndAd(copyCardsAndAdDto);
                } catch (error) {
                    alert("Failed to copy ad. Please try again later.");
                }
            }
            refreshAds();
            setTimeout(() => {
                refreshAds();
            }, 7000);
        }
    };

    const handleDownloadClick = (adSetId: string) => async (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to download this PDF?")) {
            try {
                const pdfUrl = await findPdfLocationByAdSetId({
                    adSetId,
                });

                const link = document.createElement('a');
                link.href = pdfUrl;
                link.setAttribute('target', '_blank'); // This will open the link in a new tab
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                alert("Failed to download PDF. Please try again later.");
            }
        }
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
                        .map(([adSetId, adSet]: [string, { ads: AdDocument[], adSetNameDateTime: string }], index) => {
                            const mostCommonAudienceName = getMostCommonAudienceName(adSet.ads);
                            return (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{adSet.adSetNameDateTime} - {mostCommonAudienceName}</Typography>
                                        {pdfWidth > 2 && (
                                            <div style={{ marginLeft: 'auto', marginRight: '12px', display: 'flex', gap: '16px' }}>
                                                <IconButton
                                                    onClick={handleDownloadClick(adSetId)}
                                                    style={{padding: '0', opacity: '30%'}}
                                                    aria-label="download"
                                                >
                                                    <SimCardDownloadIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={handleCopyAdSetClick(adSet.ads)}
                                                    style={{padding: '0', opacity: '30%'}}
                                                >
                                                    <ContentCopyOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={handleDeleteAdSetClick(adSetId)}
                                                    style={{padding: '0', opacity: '30%'}}
                                                >
                                                    <HighlightOffOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        )}
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
