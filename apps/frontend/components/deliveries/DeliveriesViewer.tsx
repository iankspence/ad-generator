import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, useTheme, IconButton, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RenderDeliveryCards from './RenderDeliveryCards';
import { findHookTextByAdId } from '../../utils/api/mongo/ad/findHookTextByAdIdApi';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { createUserAction } from '../../utils/api/mongo/user-action/createUserActionApi';
import UserContext from '../../contexts/UserContext';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { deleteAdSetAndAdsAndCards } from '../../utils/api/mongo/ad-set/deleteAdSetAndAdsAndCardsApi';

export default function DeliveriesViewer({ ads }) { // getHookText is a new prop
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [singleCanvasView, setSingleCanvasView] = useState(isMobile);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [adAccordions, setAdAccordions] = useState<Record<string, {ad: any, title: string}[]>>({});
    const [adExpanded, setAdExpanded] = useState<Record<string, boolean>>({});

    const { user, account } = useContext(UserContext);

    const handleChange = (panel: string) => (event: React.ChangeEvent<unknown>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);

        if (newExpanded) {
            setAdExpanded({});
        }
    };

    const handleAdChange = (id: string) => (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
        setAdExpanded({...adExpanded, [id]: isExpanded });
    };

    useEffect(() => {
        setSingleCanvasView(isMobile);
    }, [isMobile]);

    useEffect(() => {

        const groupAdsByDate = async () => {
            const groupedAds: Record<string, {ad: any, title: string}[]> = {};
            for (const ad of ads) {
                const dateKey = ad.deliveryDate

                const hookText = await findHookTextByAdId({
                    adId: ad._id.toString(),
                });

                if (!groupedAds[dateKey]) {
                    groupedAds[dateKey] = [];
                }
                groupedAds[dateKey].push({ ad, title: hookText });
            }
            setAdAccordions(groupedAds);
        };

        groupAdsByDate();
    }, [ads]);

    const handleDownload = async (ads: {ad: any, title: string}[], date: string) => {

        const zip = new JSZip();
        const cfDomain = process.env.NEXT_PUBLIC_CF_DOMAIN;

        for (const { ad, title } of ads) {
            // Create a folder for each ad
            const folder = zip.folder(`${title} - ${ad._id}`);

            // Add the ad images to the folder
            for (let i = 0; i < ad.cardLocations.length; i++) {
                // Construct the URL to the image file
                const imageUrl = `${cfDomain}/${ad.cardLocations[i].cardLocation}`;

                // Fetch the image, convert it to Blob, and add it to the folder
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                folder.file(`image${i + 1}.png`, blob);  // Note: +1 to image filename so they're not zero-indexed.
            }

            // Add the ad copy text file to the folder
            folder.file('adCopy.txt', ad.copyText);
        }

        // Generate the ZIP file and trigger the download
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${date} Ads.zip`);

        await createUserAction({
            userId: user._id.toString(),
            accountId: account._id.toString(),
            context: 'DeliveriesViewer',
            dateTime: new Date(),
            action: 'download-ads',
            managerUserId: account.managerUserId? account.managerUserId.toString() : '',
        });
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Deliveries</Typography>
                    {Object.entries(adAccordions).map(([date, ads]) => (
                        <Accordion key={date} expanded={expanded === date} onChange={handleChange(date)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                    <Typography>{date}</Typography>
                                    <Box>
                                        { (user.roles.includes('admin') ||  user.roles.includes('content-manager')) && (
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Are you sure you want to delete the ad set? This can\'t be undone!')) {
                                                        if (ads.length > 0) {
                                                            deleteAdSetAndAdsAndCards({ adSetId: ads[0].ad.adSetId });
                                                            setTimeout(() => {
                                                                window.location.reload();
                                                            }, 7000);
                                                    } else {
                                                            console.error('No ads found in ad set!');
                                                        }
                                                    }
                                                }}
                                            >
                                                <HighlightOffOutlinedIcon />
                                            </IconButton>
                                        )}
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm('Are you sure you want to download the ads?')) {
                                                    handleDownload(ads, date);
                                                }
                                            }}
                                        >
                                            <FileDownloadOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {(ads as {ad: any, title: string}[]).map(({ ad, title }) => (
                                    <Accordion key={ad._id.toString()} expanded={adExpanded[ad._id.toString()] || false} onChange={handleAdChange(ad._id.toString())}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel2a-content-${ad._id.toString()}`}
                                            id={`panel2a-header-${ad._id.toString()}`}
                                        >
                                            <Typography>{title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <RenderDeliveryCards ad={ad} width={singleCanvasView ? 1 : 4} />
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
