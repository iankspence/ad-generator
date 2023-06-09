import React, { useState } from 'react';
import { Dialog, DialogTitle, Switch, Grid, DialogContent, FormControlLabel } from '@mui/material';
import { pricingData } from '../../utils/constants/pricingData';
import { PricingCard } from '../pricing/PricingCard';
import { changeSubscription } from '../../utils/api/mongo/customer/changeSubscriptionApi';

export function ChangeSubscription({ accountId, openModal, setOpenModal }) {
    const [annualPayment, setAnnualPayment] = useState(false);

    const handleChangeSubscription = async (annualPayment, price) => {
        try {
            const priceId = annualPayment ? price.annualPriceId : price.monthlyPriceId;
            await changeSubscription({
                accountId: accountId.toString(),
                newPriceId: priceId,
            });
            console.log('Successfully changed subscription.');
        } catch (error) {
            alert('Failed to change subscription. Please try again later.');
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
            <DialogTitle className="text-center text-2xl font-bold my-4">Change Subscription Plan</DialogTitle>
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
                                onClick={() => handleChangeSubscription(annualPayment, price)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ChangeSubscription;
