import React, { useEffect, useState } from 'react';
import '../../../styles/globals.css';
import CampaignProvider from '../contexts/CampaignContext';
import {PixiProvider} from '../contexts/PixiContext';
import { UserProvider } from '../contexts/UserContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import TopNav from '../components/nav-bars/TopNav';
import BottomNav from '../components/nav-bars/BottomNav';
import { theme } from '../utils/tailwind/theme';
import { useRouter } from 'next/router';

function CustomApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID as string, {
                page_path: url,
            });
        }

        if (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") {
            router.events.on('routeChangeComplete', handleRouteChange);
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange);
            }
        }
    }, [router.events]);

    useEffect(() => {
        // Once the client side rendering is done, change the isClient state to true
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") {
            import('../components/facebook/initFacebookPixel')
                .then(({ default: initFacebookPixel }) => {
                    initFacebookPixel();
                });
        }
    }, [isClient]);

    return (
        <UserProvider>
            <CampaignProvider>
                <PixiProvider>
                    <Head>
                        <title>ReviewDrum</title>
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <div className="flex flex-col min-h-screen bg-reviewDrumDarkGray">
                            <TopNav />
                            <main className="flex-grow">
                                <Component {...pageProps} />
                            </main>
                            <BottomNav />
                        </div>
                    </ThemeProvider>
                </PixiProvider>
            </CampaignProvider>
        </UserProvider>
    );
}

export default CustomApp;
