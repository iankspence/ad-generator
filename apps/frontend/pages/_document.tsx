import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheets } from '@mui/styles';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';
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
                    {/*<style*/}
                    {/*    data-emotion={`css ${this.props.ids.join(' ')}`}*/}
                    {/*    dangerouslySetInnerHTML={{ __html: this.props.css }}*/}
                    {/*/>*/}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                          window.fbAsyncInit = function() {
                            FB.init({
                              appId      : '1480457259391178',
                              cookie     : true,
                              xfbml      : true,
                              version    : 'v17.0'
                            });

                            FB.AppEvents.logPageView();

                          };

                          (function(d, s, id){
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) {return;}
                            js = d.createElement(s); js.id = id;
                            js.src = "https://connect.facebook.net/en_US/sdk.js";
                            fjs.parentNode.insertBefore(js, fjs);
                          }(document, 'script', 'facebook-jssdk'));
                        `
                    }} />
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
