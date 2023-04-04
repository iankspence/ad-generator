import '../../../styles/globals.css';
import { SelectedClinicProvider } from '../contexts/SelectedClinicContext';
import { UserProvider } from '../contexts/UserContext';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <SelectedClinicProvider>
                <Head>
                    <title>Chiro Creative</title>
                </Head>
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </SelectedClinicProvider>
        </UserProvider>
    );
}

export default CustomApp;
