import React, { useEffect, useState } from 'react';
import { Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import Box from '@mui/system/Box';
import Link from 'next/link';

const textBlocks = [
    {
        title: 'Stop discounting your health services',
        content: ['and start generating leads through education and social proof.',
            'Our mission is to help individuals find the best health service providers by generating leads for the top practitioners in each city.' ],
    },
    {
        title: 'We serve local health practices',
        content: [
            'who understand that excellence in their work needs to be coupled with a strong online presence.',
            `We only serve top-tier practices who are rated 4.2+ stars with 40+ reviews.`,
        ],
    },
    {
        title: 'We provide digital ad + education services',
        content: [
            `for lead generation with branded eBooks, and by sharing true story ads with your community.`,
            `Don't discount your services, share your stories and attract patients who value your care.`,
        ],
    },
];

const boldWords = (sentence, words) => {
    return sentence.split(" ").map((word, i) =>
        words.includes(word) ? <strong key={i}>{word} </strong> : `${word} `
    );
}

const wordsToBold = ['Stop', 'discounting', 'education', 'social', 'proof.', 'local', 'practices', 'only', 'digital', 'ad'];

const HomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery('(min-width:412px)');
    const isLargeScreen = useMediaQuery('(min-width:573px)');

    const [cardRefs, setCardRefs] = useState([]);

    const [thirdCardVisible, setThirdCardVisible] = useState(false);

    useEffect(() => {
        setCardRefs(refs =>
            Array(textBlocks.length)
                .fill(0)
                .map((_, i) => refs[i] || React.createRef())
        );
    }, []);

    useEffect(() => {
        const checkVisibility = () => {
            if (!cardRefs) {
                return;
            }
            const percentages = cardRefs.map((ref) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();

                    const elementHeight = rect.height;
                    const visible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                    if (visible) {
                        return 100;
                    } else {
                        return Math.max(0, Math.min(elementHeight, window.innerHeight - rect.top, rect.bottom - window.innerHeight) / elementHeight * 100);
                    }
                } else {
                    return 0;
                }
            });

            setThirdCardVisible(percentages[2] > 0);
        };

        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);

    }, [cardRefs]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const reviewDrumDarkGray = '#1E1E1E'
    const reviewDrumLightGray = '#D9D9D9';
    const reviewDrumOrange = '#FFA726';

    return (
        <div className="bg-white min-h-screen">

            {/*<div className="bg-reviewDrumOrange p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>*/}
            {/*    <Typography variant={isMobile ? "body1" : "h6"} style={{ color: 'white', fontWeight: 600, marginBottom: '10px' }}>*/}
            {/*        {'Next Clinic Cohort: Sept. 1st - Oct. 31st'}*/}
            {/*    </Typography>*/}
            {/*    <Link href="/apply" passHref>*/}
            {/*        <Button variant="contained" style={{ backgroundColor: 'white', color: 'black' }}>*/}
            {/*            Apply Now*/}
            {/*        </Button>*/}
            {/*    </Link>*/}
            {/*</div>*/}

            <div className={`${isMobile? "py-2" : "py-4"}`} ></div>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '20px', marginX: isMobile ? '10px' : '20px' }}>
                {textBlocks.map((text, index) => (
                    <Box ref={cardRefs[index]} key={index} sx={{ height: `${isMobile ? '500px' : '700px'}`, padding: '25px', backgroundImage: `linear-gradient(to right top, ${reviewDrumLightGray}, ${reviewDrumOrange})`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', position: 'relative' }}>
                        <Box sx={{ maxWidth: `${(index !== 1) ? '580px' : '540px' }`, overflow: 'hidden' }}>
                            <Typography variant={isMobile ? 'h3' : 'h1'} sx={{ fontWeight: 'normal', color: reviewDrumDarkGray, marginBottom: `${(index!==2) ? '3vh' : (isMobile ?  '1vh' : '4vh') }`}}>
                                {boldWords(text.title, (index === 0) ? wordsToBold : wordsToBold + 'health' )}
                            </Typography>

                            {text.content.map((paragraph, i) => (
                                <React.Fragment key={i}>
                                    <Typography variant={isMobile ? 'h6' : 'h4'}
                                                sx={{ fontSize: isMobile ? (isMediumScreen ? (isLargeScreen ? '1.8rem' : '1.2rem') : '1.08rem') : '1.5rem', color: `${reviewDrumDarkGray}` }}>
                                        {paragraph}
                                    </Typography>
                                    <br />

                                    {index === 1 && !isMobile &&
                                        <>
                                            <br />
                                        </>
                                    }
                                    {/*{index === 2 && <br />}*/}
                                </React.Fragment>
                            ))}
                        </Box>

                        {index === 1 &&
                            <Link href="/faq" passHref>
                                <Button
                                    sx={{
                                        width: `${isMobile ? '88%' : '500px'}`,
                                        height: `${isMobile ? '56px' : '80px'}`,
                                        fontSize: `${isMobile ? '1.2rem' : '2rem'}`,
                                        position: 'absolute',
                                        bottom: `${isMobile ? '10px' : '20px'}`,
                                        left: `${isMobile ? '19px' : '25px'}`,
                                        backgroundColor: `${reviewDrumOrange}`,
                                        color: 'white',
                                        borderRadius: '5px',
                                        marginTop: '15px',
                                        transition: 'all 0.5s ease-in-out',
                                        opacity: thirdCardVisible ? `${isMobile ? 1 : 0.9}` : 0.6,
                                        boxShadow: thirdCardVisible ? `${isMobile ? '0px 5px 20px rgba(0, 0, 0, 0.3)' : '0px 5px 20px rgba(0, 0, 0, 0.2)'}` : 'none',
                                        '&:hover': {
                                            backgroundColor: `${reviewDrumOrange}`,
                                            color: 'white',
                                            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Link>
                        }
                    </Box>
                ))}
            </Box>
            <div className={`${isMobile? "py-2" : "py-4"}`}></div>
        </div>
    );
};

export default HomePage;
