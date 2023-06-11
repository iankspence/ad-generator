import React, { useState } from 'react';
import TopNav from '../components/nav-bars/TopNav';
import {
    Typography,
    FormControlLabel,
    Switch,
    Grid,
    Box,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqs } from '../utils/constants/faqs';
import { PricingCard } from '../components/pricing/PricingCard';
import { pricingData } from '../utils/constants/pricingData';
import { useRouter } from 'next/router';

export function PricingPage() {
    const [annualPayment, setAnnualPayment] = useState(false);
    const router = useRouter();

    const handleToggle = () => {
        setAnnualPayment(!annualPayment);
    };

    const navigateToRegister = () => {
        router.push('/register');
    };

    return (
        <div>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto p-8">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Our Pricing</h1>
                <p className="text-center mb-6">Choose the plan that suits your needs.</p>

                <FormControlLabel
                    control={<Switch checked={annualPayment} onChange={handleToggle} />}
                    label="Annual Payment"
                />

                <Grid container justifyContent="center" spacing={2}>
                    {pricingData.map((price, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <PricingCard
                                price={price}
                                annualPayment={annualPayment}
                                buttonText="Register"
                                onClick={navigateToRegister}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box mt={6} mx={1}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Frequently Asked Questions
                    </Typography>
                    {faqs.map((faq, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                <div className="text-center mt-4">
                    <Typography variant="caption" display="block" gutterBottom>
                        *Please note: Due to the nature of our services, we do not provide refunds on any products.
                    </Typography>
                </div>

            </div>

        </div>
    );
}

export default PricingPage;
