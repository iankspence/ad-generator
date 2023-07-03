import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheets } from '@mui/styles';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/tailwind/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { constructStyleTagsFromChunks } from '@emotion/server';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const cache = createEmotionCache();
        const { extractCriticalToChunks } = createEmotionServer(cache);

        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(
                    <CacheProvider value={cache}>
                        <CssBaseline />
                        <App {...props} />
                    </CacheProvider>
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);
        const emotionChunks = extractCriticalToChunks(initialProps.html);
        const emotionCss = constructStyleTagsFromChunks(emotionChunks);

        return {
            ...initialProps,
            emotionCss,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                sheets.getStyleElement(),
            ],
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content="#1abc9c" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                            `,
                        }}
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
