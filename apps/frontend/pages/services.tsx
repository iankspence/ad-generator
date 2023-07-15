import React from 'react';
import {
    Typography,
    Grid,
    Box,
    Button, useMediaQuery, useTheme,
} from '@mui/material';
import { PricingCard } from '../components/pricing/PricingCard';
import { pricingData } from '../utils/constants/pricingData';
import { useRouter } from 'next/router';

export function PricingPage() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigateToRegister = () => {
        router.push('/register');
    };

    const handleDemoClick = () => {
        window.open('https://calendly.com/ian-xtq/discovery-call', '_blank');
    };

    const reviewDrumOrange = '#FFA726';

    return (
        <div>
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto p-8">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Our Services</h1>
                <p className="text-center mb-6">Choose the plan that suits your needs.</p>


                <Grid container justifyContent="center" spacing={2}>
                    {pricingData.map((price, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <PricingCard
                                price={price}
                                buttonText="Register"
                                onClick={navigateToRegister}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/*<div className="text-center mt-4">*/}
                {/*    <Typography variant="caption" display="block" gutterBottom>*/}
                {/*        *Please note: Due to the nature of our services, we do not provide refunds on any products.*/}
                {/*    </Typography>*/}
                {/*</div>*/}

                <Box mt={6} mx={1} mb={6} textAlign="center">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Want to Learn More?
                    </Typography>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleDemoClick}
                        sx={{
                            width: isMobile ? '200px' : '500px',
                            height: isMobile ? '50px' : '80px',
                            fontSize: isMobile ? '1rem' : '2rem',
                            backgroundColor: reviewDrumOrange,
                            color: 'white',
                            borderRadius: '5px',
                            marginTop: '15px',
                            marginBottom: '15px',
                            '&:hover': {
                                backgroundColor: reviewDrumOrange,
                                color: 'white',
                            },
                        }}
                    >
                        Book a Call
                    </Button>
                </Box>

            </div>
        </div>
    );
}

export default PricingPage;
