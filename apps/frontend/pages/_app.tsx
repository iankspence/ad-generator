import { AppProps } from 'next/app';
import Head from 'next/head';
import '../../../styles/globals.css';
import {UserProvider} from "../contexts/UserContext";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Chiro Creative</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}

export default CustomApp;
