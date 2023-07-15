import React, { useEffect, useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

const aboutContent = [
    {
        question: 'I have something to admit..',
        answer: [
            "I’m operating this company by myself.",
            "After working in machine learning and startups for a few years, I made the jump to launch my own venture. ",
            "The downside is what you might expect from a one-man company. Response times may be slower than with other agencies, if I get hit by a bus - there may be consequences in terms of lead conversion. As for the upside, you can feel confident that your work won’t be passed off to an external contractor. I built our ad design tool and enjoy keeping up with the latest trends and technologies in AI - so we’re able to quickly integrate changes as technology and requirements evolve.",
        ],
    },
    {
        question: 'Where is this company going?',
        answer: [
            "Since early 2023, we’ve been developing a low-touch design platform to generate ‘social proof’ ads using online reviews. Our system scrapes reviews and sorts them into 1 of 10 audiences. These sorted reviews are used to create hooks (quotes from the review), claims, closes, and ad copy text. Our ‘social proof’ ads and eBooks match the branding of your practice through auto colouring based on logo images.",
            "As we talk with users and validate our system, we’re working to build a repeatable pattern of consistent lead generation results for our clients - without using discounts. We believe that by leveraging education and social proof, we can create a win-win for clinics and patients. Your clinic gets new patients without discounting services, while patients are connected with one of the top-rated health service providers around.",
            "We plan to scale our team to push the limits of what’s possible for local health service lead generation."
        ],
    },
    {
        question: 'What is your background?',
        answer: [
            "Growing up in rural Alberta, Canada - I pursued an undergrad in Agricultural Biology focusing on plant science and the generation of novel plant-based therapies by adjusting the controlled growth environment.",
            "After completing a Master of Bioinformatics program where I used machine learning to study genomics and design leaf growth optimization trials, I started working at an infrastructure assessment AI startup as an intern, and moved up to R&D engineer, then machine learning lead (managing a team of 9 people) - in less than a year.",
            "I’ve always wanted to start my own company and with the release of more and more powerful AI systems, I saw this as the best time to test my skills and see if I could build something from the ground up."
        ],
    },
    {
        question: 'How can we get in touch?',
        answer: [
            "To learn more about ReviewDrum, you can book a 30 minute call here..", // use two periods to avoid link showing up elsewhere (one period is dropped)
            "We can also connect by email at ian@reviewdrum.com or through LinkedIn."
        ],
    }
];

const AboutPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const reviewDrumDarkGray = '#1E1E1E';
    const reviewDrumOrange = '#FFA726';


    const ParseParagraph = (paragraph) => {
        const [content, setContent] = useState(<Typography variant="body2" paragraph>{paragraph}</Typography>);

        useEffect(() => {
            if (paragraph.includes("LinkedIn")) {
                const parts = paragraph.split("LinkedIn");
                setContent(
                    <Typography variant="body2" paragraph>
                        {parts[0]}
                        <Link href="https://www.linkedin.com/in/iankspence/" passHref>
                            <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', display: 'inline' }}>LinkedIn</Typography>
                        </Link>
                        {parts[1]}
                    </Typography>
                );
            } else if (paragraph.includes("here.")) {
                const parts = paragraph.split("here.");
                setContent(
                    <Typography variant="body2" paragraph>
                        {parts[0]}
                        <Link href="https://calendly.com/ian-xtq/discovery-call" passHref>
                            <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', display: 'inline' }}>here</Typography>
                        </Link>
                        {parts[1]}
                    </Typography>
                );
            }
        }, [paragraph]);

        return content;
    }


    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginX: isMobile ? '5px' : '20px', padding: isMobile ? '15px' : '50px' }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: reviewDrumDarkGray, marginBottom: theme.spacing(3) }}>
                    About Us
                </Typography>
                {aboutContent.map((section, index) => (
                    <Accordion key={index} sx={{ width: '100%', marginBottom: theme.spacing(3), padding: isMobile ? '5px' : '25px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={isMobile ? "h6" : "h5"}>{section.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {section.answer.map((paragraph, i) => ParseParagraph(paragraph))}
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Link href="/services" passHref>
                    <Button
                        variant="contained"
                        color="inherit"
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
                        Services
                    </Button>
                </Link>
                <br/>
            </Box>
        </div>
    );
};

export default AboutPage;
