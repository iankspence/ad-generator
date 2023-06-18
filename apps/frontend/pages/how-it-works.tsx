import React from 'react';
import { Typography, useTheme, useMediaQuery, Button, Card, CardMedia, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const steps = {
    register: [
        { title: 'Enter Clinic Details', description: 'Who\'s the account for?', imagePath: '/images/register-1.png' },
        { title: 'Enter Location', description: 'Where are you?', imagePath: '/images/register-2.png' },
        { title: 'Verify Email', description: '(check spam filter if necessary)', imagePath: '/images/register-3.png' },
    ],
    download: [
        { title: 'Sign In to Account', description: 'Sign in after email verification.', imagePath: '/images/download-1.png' },
        { title: 'Connect Payment', description: 'Connect payment on account page.', imagePath: '/images/download-2.png' },
        { title: 'Receive Ads', description: 'Access ads within 3 days after payment.', imagePath: '/images/download-3.png' },
    ],
    manage: [
        { title: 'Manage your Account', description: 'View account details and manage your subscription.', imagePath: '/images/manage-1.png' },
        { title: 'Change your Subscription', description: 'Change from one plan to another. (Stripe prorates the new price and will apply a credit/charge accordingly).', imagePath: '/images/manage-2.png' },
        { title: 'Cancel your Subscription', description: 'Cancel your subscription and delete your account and the end of the current billing cycle.', imagePath: '/images/manage-3.png' },
    ]
}

const minHeightValues = {
    register: '1em',
    download: '3em',
    manage: '7em',
};

const typeNames = {
    register: 'Register Account',
    download: 'Download Ads',
    'manage': 'Change Plan',
};

const HowItWorksPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const reviewDrumDarkGray = '#1E1E1E';
    const reviewDrumOrange = '#FFA726';

    const handleEntered = (node) => {
        const yCoordinate = node.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -120; // adjust this value based on the size of your nav

        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    };

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginX: isMobile ? '5px' : '20px', padding: isMobile? '15px': '50px' }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: reviewDrumDarkGray, marginBottom: theme.spacing(3) }}>How it Works</Typography>
                {['register', 'download', 'manage'].map((type) => (
                    <Accordion
                        key={type}
                        sx={{ width: '100%', marginBottom: theme.spacing(3), padding: isMobile ? '5px' : '25px' }}
                        TransitionProps={{
                            unmountOnExit: true,
                            onEntered: handleEntered,
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={isMobile ? "h6" : "h5"}>{typeNames[type]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
                                {steps[type].map((step, index) => (
                                    <Grid item xs={isMobile ? 12 : 4} sm={4} key={index}>
                                        <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', padding: isMobile ? '5px' : '20px' }}>
                                            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold', color: reviewDrumDarkGray }}>
                                                    {index + 1}. {step.title}
                                                </Typography>
                                                <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: reviewDrumDarkGray, marginBottom: '2vh', minHeight: minHeightValues[type] }}>
                                                    {step.description || '\u00A0'}
                                                </Typography>
                                            </Box>
                                            <CardMedia
                                                component="img"
                                                image={step.imagePath}
                                                alt={step.title}
                                                sx={{ objectFit: 'contain' }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Link href="/faq" passHref>
                    <Button
                        sx={{
                            width: isMobile ? '200px' : '500px',
                            height: isMobile ? '50px' : '80px',
                            fontSize: isMobile ? '1rem' : '2rem',
                            backgroundColor: reviewDrumOrange,
                            color: 'white',
                            borderRadius: '5px',
                            marginTop: '15px',
                            marginBottom: '15px',
                            transition: 'all 0.5s ease-in-out',
                            '&:hover': {
                                backgroundColor: reviewDrumOrange,
                                color: 'white',
                            },
                        }}
                    >
                        FAQ
                    </Button>
                </Link>
            </Box>
        </div>
    );
};

export default HowItWorksPage;
