import React, { useState } from 'react';
import { Dialog, DialogTitle, Switch, Grid, DialogContent, FormControlLabel } from '@mui/material';
import { pricingData } from '../../utils/constants/pricingData';
import { PricingCard } from '../pricing/PricingCard';
import createCheckoutSession from '../../utils/api/mongo/customer/createCheckoutSessionApi';

export function CheckoutSelection({ accountId, openModal, setOpenModal }) {
    const [annualPayment, setAnnualPayment] = useState(false);

    const handleConnectPayment = async (annualPayment, price) => {
        try {
            const priceId = annualPayment ? price.annualPriceId : price.monthlyPriceId;
            await createCheckoutSession({
                accountId: accountId.toString(),
                priceId,
            });
            console.log('Successfully connected payment.');
        } catch (error) {
            alert('Failed to connect payment. Please try again later.');
        }
    };

    const handleToggle = () => {
        setAnnualPayment(!annualPayment);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            PaperProps={{
                style: { width: '80%', height: '60%', maxHeight: 'none', maxWidth: 'none' },
            }}
        >
            <DialogTitle className="text-center text-2xl font-bold my-4">Select a Plan</DialogTitle>
            <DialogContent>
                <div className="flex justify-center my-2">
                    <FormControlLabel
                        control={<Switch checked={annualPayment} onChange={handleToggle} />}
                        label="Annual Payment"
                        className="font-semibold"
                    />
                </div>
                <Grid container justifyContent="center" spacing={2}>
                    {pricingData.map((price, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <PricingCard
                                price={price}
                                annualPayment={annualPayment}
                                buttonText="Select"
                                onClick={() => handleConnectPayment(annualPayment, price)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutSelection;
