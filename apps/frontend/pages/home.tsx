import React from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/system/Box';
import TopNav from '../components/top-nav/TopNav';

const textBlocks = [
    {
        title: 'We believe true stories make the best ads.',
        content: ['This belief inspires us to transform online reviews into Facebook ads, helping chiropractors grow their online brand in the digital age.'],
    },
    {
        title: 'We serve practitioners',
        content: [
            'who understand that the easiest way to attract and retain patients in 2023 is through a strong online presence.',
            `We only serve clinics rated 4.2 stars or higher across 50+ reviews so that folks in need find the best care possible.`,
        ],
    },
    {
        title: 'We provide digital ad services',
        content: [
            `for communicating success stories to targeted audiences within your local community.`,
            `From coming up with the ad creative, to handling the ad account, we've got you covered.`,
        ],
    },
];

const boldWords = (sentence, words) => {
    return sentence.split(" ").map((word, i) =>
        words.includes(word) ? <strong key={i}>{word} </strong> : `${word} `
    );
}

const wordsToBold = ['true', 'local', 'covered.', 'stories', 'only', 'patients', 'account,', 'transform', 'Facebook', 'ads,', 'best', 'creative,', 'inspires', 'ads.', '4.2', 'stars', 'retain', 'success', 'targeted', 'audiences', 'attract', '50+', 'reviews', 'authentic', 'presence', 'chiropractors', 'practitioners', 'community.', 'reviews', 'online', 'brand', 'digital', 'care', 'possible.', 'ad', 'services', 'age.', 'strong', 'presence.', 'community'];

const HomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery('(min-width:412px)'); // Custom breakpoint
    const isLargeScreen = useMediaQuery('(min-width:573px)'); // Another custom breakpoint


    const reviewDrumDarkGray = '#1E1E1E'
    const reviewDrumLightGray = '#D9D9D9';
    const reviewDrumOrange = '#FFA726'

    return (
        <>
            <TopNav />
            <div className="py-4"></div>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '20px', marginX: isMobile ? '10px' : '20px' }}>
                {textBlocks.map((text, index) => (
                    <Box key={index} sx={{ height: `${isMobile ? '52vh' : '700px'}`, padding: '25px', backgroundImage: `linear-gradient(to right top, ${reviewDrumLightGray}, ${reviewDrumOrange})`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        <Box sx={{ maxWidth: `${(index !== 1) ? '580px' : '540px' }`, overflow: 'hidden' }}>
                            <Typography variant={isMobile ? 'h3' : 'h1'} sx={{ fontWeight: 'normal', color: reviewDrumDarkGray, marginBottom: `${(index===0) ? '3vh' : '1vh' }`}}>
                                {boldWords(text.title, wordsToBold)}
                            </Typography>
                            {text.content.map((paragraph, i) => (
                                <React.Fragment key={i}>
                                    <Typography variant={isMobile ? 'h6' : 'h4'}
                                                sx={{ fontSize: isMobile ? (isMediumScreen ? (isLargeScreen ? '1.8rem' : '1.36rem') : '1.18rem') : '2rem', color: '#000000' }}>
                                        {boldWords(paragraph, wordsToBold)}
                                    </Typography>
                                    <br />
                                    <br />
                                </React.Fragment>
                            ))}


                        </Box>
                    </Box>
                ))}
            </Box>
            <div className="py-4"></div>


        </>

    );
};

export default HomePage;
