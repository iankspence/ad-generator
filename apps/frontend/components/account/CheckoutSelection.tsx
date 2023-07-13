import React, { useState } from 'react';
import { Dialog, DialogTitle, Switch, Grid, DialogContent, FormControlLabel } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { pricingData } from '../../utils/constants/pricingData';
import { PricingCard } from '../pricing/PricingCard';
import createCheckoutSession from '../../utils/api/mongo/customer/createCheckoutSessionApi';
import { theme } from '../../utils/tailwind/theme';

export function CheckoutSelection({ accountId, openModal, setOpenModal }) {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleConnectPayment = async (price) => {
        try {
            await createCheckoutSession({
                accountId: accountId.toString(),
                priceId: price.priceId,
            });
            console.log('Successfully connected payment.');
        } catch (error) {
            alert('Failed to connect payment. Please try again later.');
        }
    };

    const handleDemoClick = () => {
        window.open('https://calendly.com/ian-xtq/discovery-call', '_blank');
    };


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            PaperProps={{
                style: { width: isMobile ? '100%' : '80%', margin: isMobile ? '10px' : '4px',  padding: isMobile ? '1px' : '4px', height: '60%', maxHeight: 'none', maxWidth: 'none' },
            }}
        >
            <DialogTitle className="text-center text-2xl font-bold my-4">Select a Service</DialogTitle>
            <DialogContent>
                <Grid container justifyContent="center" spacing={2}>
                    {pricingData.map((price, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            { price.tier === 'Content Package' ?
                                <PricingCard
                                    price={price}
                                    buttonText="Select"
                                    onClick={() => handleConnectPayment(price)}
                                />
                                :
                                <PricingCard
                                    price={price}
                                    buttonText="Book Demo"
                                    onClick={() => handleDemoClick()}
                                />
                            }
                        </Grid>
                    ))}

                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutSelection;
