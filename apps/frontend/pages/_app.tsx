import '../../../styles/globals.css';
import { UserProvider } from '../contexts/UserContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';

const theme = createTheme();

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Head>
                <title>Chiro Creative</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </UserProvider>
    );
}

export default CustomApp;
