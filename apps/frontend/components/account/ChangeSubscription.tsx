import React, { useState } from 'react';
import { Dialog, DialogTitle, Switch, Grid, DialogContent, FormControlLabel } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { pricingData } from '../../utils/constants/pricingData';
import { PricingCard } from '../pricing/PricingCard';
import { changeSubscription } from '../../utils/api/mongo/customer/changeSubscriptionApi';
import { reactivateUser } from '../../utils/api/mongo/user/register/reactivateUserApi';
import {useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { theme } from '../../utils/theme';

const useStyles = makeStyles({
    dialogContent: {
        fontSize: theme.breakpoints.down('sm') ? '0.8em' : '1em',
    },
});

export function ChangeSubscription({ accountId, userId, openModal, setOpenModal, refreshAccount, setRefreshAccount }) {
    const [annualPayment, setAnnualPayment] = useState(false);
    const router = useRouter();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const handleChangeSubscription = async (annualPayment, price) => {
        const confirmMessage = `You are about to change your subscription. Please note that according to Stripe's policy:\n
    - If you upgrade your subscription, you'll be charged the prorated difference between the two plans.\n
    - If you downgrade your subscription, you'll be credited the prorated difference towards future payments.\n
    Do you wish to continue?`;

        if (window.confirm(confirmMessage)) {
            try {
                const priceId = annualPayment ? price.annualPriceId : price.monthlyPriceId;
                await changeSubscription({
                    accountId: accountId.toString(),
                    newPriceId: priceId,
                });
                console.log('Successfully changed subscription.');
                await reactivateUser({
                    userId: userId,
                    accountId: accountId.toString()
                });
                setRefreshAccount(!refreshAccount);
                setOpenModal(false);
                router.push('/updated-subscription');

            } catch (error) {
                alert('Failed to change subscription. Please try again later.');
            }
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
                style: { width: isMobile ? '100%' : '80%', margin: isMobile ? '10px' : '4px',  padding: isMobile ? '1px' : '4px', height: '60%', maxHeight: 'none', maxWidth: 'none' },
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
