import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html data-theme="mantic" className="min-h-screen">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Readex+Pro&family=Roboto+Condensed:ital,wght@1,700&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="icon.png" />
            </Head>
            <body className="w-full overflow-hidden">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
