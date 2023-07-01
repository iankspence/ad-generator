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
import Router from 'next/router';
import withGA from "next-ga";

function CustomApp({ Component, pageProps }: AppProps) {
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

// use GA in production only
const WrappedApp = process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com"
    ? withGA(process.env.NEXT_PUBLIC_GA_TRACKING_ID, Router)(CustomApp)
    : CustomApp;

export default WrappedApp;
