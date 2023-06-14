import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RenderLibraryCards from '../library-card/RenderLibraryCards';
import { getGridItemStyle } from './getGridItemStyle';

const DeliveryGrid = ({ handleResize, setAdsWidth, setPdfWidth, setDeliveryWidth, ads, deliveryWidth, refreshAds }) => {
    const approvedAds = ads.filter(ad => ad.adStatus === 'approved');
    const deliveredAds = ads.filter(ad => ad.adStatus === 'delivered');

    return (
        <Grid container item xs={deliveryWidth} style={getGridItemStyle(deliveryWidth)}>
            {
                deliveryWidth === 2 &&
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
                    onClick={() => handleResize(setDeliveryWidth, setAdsWidth, setPdfWidth)}
                >
                    <KeyboardArrowLeftIcon
                        style={{
                            color: 'inherit'
                        }}
                    />
                </Grid>
            }
            <Grid item xs={deliveryWidth === 8 ? 12 : 11}>
                <Typography variant="h6">Delivery</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Approved</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {approvedAds.map((ad, index) => (
                            <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, deliveryWidth, refreshAds)}</div>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Delivered</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {deliveredAds.map((ad, index) => (
                            <div style={{padding: "16px"}} key={index}>{RenderLibraryCards(ad, deliveryWidth, refreshAds)}</div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
};

export default DeliveryGrid;
