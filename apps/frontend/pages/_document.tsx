import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheets.getStyleElement()}
                </>
            ),
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="#1abc9c" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
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
