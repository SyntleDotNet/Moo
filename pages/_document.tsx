import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html
            className="min-h-screen"
            style={{ WebkitTapHighlightColor: "transparent" }}
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Readex+Pro&family=Roboto+Condensed:ital,wght@1,700&display=swap"
                    rel="stylesheet"
                />
                <link rel="manifest" href="manifest.webmanifest" />
                <link rel="icon" href="icon.png" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
            </Head>
            <body className="w-full min-h-screen bg-[#1b1a27] flex flex-col select-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
