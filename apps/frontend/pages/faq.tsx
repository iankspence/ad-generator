import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqs } from '../utils/constants/faqs';
import Link from 'next/link';

const FAQPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const reviewDrumDarkGray = '#1E1E1E';
    const reviewDrumOrange = '#FFA726';

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginX: isMobile ? '5px' : '20px', padding: isMobile ? '15px' : '50px' }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: reviewDrumDarkGray, marginBottom: theme.spacing(3) }}>
                    Frequently Asked Questions
                </Typography>
                {faqs.map((faq, index) => (
                    <Accordion key={index} sx={{ width: '100%', marginBottom: theme.spacing(3), padding: isMobile ? '5px' : '25px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={isMobile ? "h6" : "h5"}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant={isMobile ? "body2" : "body1"}>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}

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

export default FAQPage;
