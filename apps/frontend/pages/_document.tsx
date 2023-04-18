import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />*/}
                    {/* Add any other head tags as needed */}
                    <style>
                        {`
              @font-face {
                font-family: 'Roboto';
                src: url(data:font/ttf;base64, LyogY3lyaWxsaWMtZXh0ICovCkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3JvYm90by92MzAvS0ZPbUNucUV1OTJGcjFNdTcyeEtLVFUxS3Zuei53b2ZmMikgZm9ybWF0KCd3b2ZmMicpOwogIHVuaWNvZGUtcmFuZ2U6IFUrMDQ2MC0wNTJGLCBVKzFDODAtMUM4OCwgVSsyMEI0LCBVKzJERTAtMkRGRiwgVStBNjQwLUE2OUYsIFUrRkUyRS1GRTJGOwp9Ci8qIGN5cmlsbGljICovCkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3JvYm90by92MzAvS0ZPbUNucUV1OTJGcjFNdTVteEtLVFUxS3Zuei53b2ZmMikgZm9ybWF0KCd3b2ZmMicpOwogIHVuaWNvZGUtcmFuZ2U6IFUrMDMwMSwgVSswNDAwLTA0NUYsIFUrMDQ5MC0wNDkxLCBVKzA0QjAtMDRCMSwgVSsyMTE2Owp9Ci8qIGdyZWVrLWV4dCAqLwpAZm9udC1mYWNlIHsKICBmb250LWZhbWlseTogJ1JvYm90byc7CiAgZm9udC1zdHlsZTogbm9ybWFsOwogIGZvbnQtd2VpZ2h0OiA0MDA7CiAgZm9udC1kaXNwbGF5OiBzd2FwOwogIHNyYzogdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9yb2JvdG8vdjMwL0tGT21DbnFFdTkyRnIxTXU3bXhLS1RVMUt2bnoud29mZjIpIGZvcm1hdCgnd29mZjInKTsKICB1bmljb2RlLXJhbmdlOiBVKzFGMDAtMUZGRjsKfQovKiBncmVlayAqLwpAZm9udC1mYWNlIHsKICBmb250LWZhbWlseTogJ1JvYm90byc7CiAgZm9udC1zdHlsZTogbm9ybWFsOwogIGZvbnQtd2VpZ2h0OiA0MDA7CiAgZm9udC1kaXNwbGF5OiBzd2FwOwogIHNyYzogdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9yb2JvdG8vdjMwL0tGT21DbnFFdTkyRnIxTXU0V3hLS1RVMUt2bnoud29mZjIpIGZvcm1hdCgnd29mZjInKTsKICB1bmljb2RlLXJhbmdlOiBVKzAzNzAtMDNGRjsKfQovKiB2aWV0bmFtZXNlICovCkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3JvYm90by92MzAvS0ZPbUNucUV1OTJGcjFNdTdXeEtLVFUxS3Zuei53b2ZmMikgZm9ybWF0KCd3b2ZmMicpOwogIHVuaWNvZGUtcmFuZ2U6IFUrMDEwMi0wMTAzLCBVKzAxMTAtMDExMSwgVSswMTI4LTAxMjksIFUrMDE2OC0wMTY5LCBVKzAxQTAtMDFBMSwgVSswMUFGLTAxQjAsIFUrMUVBMC0xRUY5LCBVKzIwQUI7Cn0KLyogbGF0aW4tZXh0ICovCkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3JvYm90by92MzAvS0ZPbUNucUV1OTJGcjFNdTdHeEtLVFUxS3Zuei53b2ZmMikgZm9ybWF0KCd3b2ZmMicpOwogIHVuaWNvZGUtcmFuZ2U6IFUrMDEwMC0wMkFGLCBVKzFFMDAtMUVGRiwgVSsyMDIwLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMjExMywgVSsyQzYwLTJDN0YsIFUrQTcyMC1BN0ZGOwp9Ci8qIGxhdGluICovCkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3JvYm90by92MzAvS0ZPbUNucUV1OTJGcjFNdTRteEtLVFUxS2cud29mZjIpIGZvcm1hdCgnd29mZjInKTsKICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MywgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEOwp9) format('truetype');
              }
            `}
                    </style>
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
