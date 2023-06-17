import React from 'react';
import { Typography, useTheme, useMediaQuery, Button, Card, CardContent, CardMedia, Alert } from '@mui/material';
import Box from '@mui/system/Box';
import Link from 'next/link';


const AboutPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isLandscape = useMediaQuery('(orientation: landscape)');
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const reviewDrumDarkGray = '#1E1E1E';
    const reviewDrumOrange = '#FFA726';

    const getPadding = () => {
        if (isLargeScreen) return '100px 300px';
        if (isLandscape) return '0px';
        return '50px';
    };

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginX: `${isMobile ? '-40px' : '20px'}`, padding: getPadding() }}>
                <Card sx={{ width: '100%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', marginBottom: theme.spacing(3) }}>
                    <CardContent>
                        <Typography variant={isMobile ? 'h3' : 'h1'} sx={{ fontWeight: 'bold', color: reviewDrumDarkGray, marginBottom: '2vh' }}>
                            Nice to meet you!
                        </Typography>
                        <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ color: reviewDrumDarkGray, marginBottom: '2vh' }}>
                            Learn how ReviewDrum helps you manage your Facebook ads, classify your reviews by audience into targeted campaigns, and more.
                        </Typography>
                        {isMobile && <Alert severity="info">For the best viewing experience, please flip your phone to landscape mode.</Alert>}
                        <CardMedia
                            component="video"
                            src="Your video source URL"
                            title="How It Works"
                            controls
                            style={{width: '100%', height: 'auto', objectFit: 'contain'}}
                        />
                    </CardContent>
                </Card>
                <Link href="/pricing" passHref>
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
                        Pricing
                    </Button>
                </Link>
            </Box>
        </div>
    );
};

export default AboutPage;
