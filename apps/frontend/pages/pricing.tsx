import React, { useState } from 'react';
import TopNav from '../components/top-nav/TopNav';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    FormControlLabel,
    Switch,
    Grid,
    Box,
    List,
    ListItem,
    ListItemText,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqs } from '../utils/constants/faqs';

export function PricingPage() {
    const [annualPayment, setAnnualPayment] = useState(false);

    const pricingData = [
        {
            tier: 'Practitioner',
            description: 'Ideal for individual professionals who seek unique ad content monthly. Access creativity and stand out without stress.',
            bullets: ['1 Unique Ad per Month', 'Ideal for Solo Practitioners', 'Creatives Available for Download'],
            monthly: '$129 CAD',
            annual: '$1290 CAD',
        },
        {
            tier: 'Team',
            description: 'Perfect for businesses seeking diversity and quantity in their ad content. More creative, more impact.',
            bullets: ['4 Unique Ads per Month', 'Ideal for Small Teams', 'Creatives Available for Download'],
            monthly: '$299 CAD',
            annual: '$2990 CAD',
        },
        {
            tier: 'Clinic',
            description: 'Our done-for-you service for clinics with ad budget of +$20/day. We handle ad creation, posting, and data analytics for optimal ad performance.',
            bullets: ['Full-Service Ad Management', 'Ideal for Top-Tier Clinics', 'New Creatives Cycled in Bi-Weekly'],
            monthly: '$399 CAD',
            annual: '$3990 CAD',
        },
    ];

    const handleToggle = () => {
        setAnnualPayment(!annualPayment);
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
                            <Card elevation={3} className="flex flex-col h-full">
                                <CardContent className="flex flex-col flex-grow">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" component="div" gutterBottom className="mb-2">
                                            {price.tier}
                                        </Typography>
                                        <Typography variant="h6" component="p" className="font-bold mb-2">
                                            {annualPayment ? `${price.annual} /yr` : `${price.monthly} /mo`}
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" component="p" gutterBottom className="mb-2">
                                        {price.description}
                                    </Typography>
                                    <List className="flex-grow">
                                        {price.bullets.map((bullet, idx) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={`\u2022 ${bullet}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <CardActions className="mb-2" style={{justifyContent: 'center'}}>
                                    <Button size="large" fullWidth variant="contained" color="inherit" href="/register">Register</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box mt={6} mx={12}>
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
