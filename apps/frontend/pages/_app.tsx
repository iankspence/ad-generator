import '../../../styles/globals.css';
import { ClinicProvider } from '../contexts/ClinicContext';
import { UserProvider } from '../contexts/UserContext';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <ClinicProvider>
                <Head>
                    <title>Chiro Creative</title>
                </Head>
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </ClinicProvider>
        </UserProvider>
    );
}

export default CustomApp;
