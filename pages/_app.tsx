import "../style/global.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").then(
                (r) => {},
                (err) =>
                    console.error("Service Worker registration failed: ", err)
            );
        }
    }, []);

    return <Component {...pageProps} />;
}
