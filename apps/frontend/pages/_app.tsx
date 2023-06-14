import '../../../styles/globals.css';
import CampaignProvider from '../contexts/CampaignContext';
import {PixiProvider} from '../contexts/PixiContext';
import { UserProvider } from '../contexts/UserContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import TopNav from '../components/nav-bars/TopNav';
import BottomNav from '../components/nav-bars/BottomNav';
import { theme } from '../utils/theme';

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

export default CustomApp;
