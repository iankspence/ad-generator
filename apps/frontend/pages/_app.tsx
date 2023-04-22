import '../../../styles/globals.css';
import CampaignProvider from '../contexts/CampaignContext';
import { LayerProvider } from '../contexts/LayerContext';
import { UserProvider } from '../contexts/UserContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';

const theme = createTheme();

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <CampaignProvider>
                <LayerProvider>
                    <Head>
                        <title>Chiro Creative</title>
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <main className="app">
                            <Component {...pageProps} />
                        </main>
                    </ThemeProvider>
                </LayerProvider>
            </CampaignProvider>
        </UserProvider>
    );
}

export default CustomApp;
