import "../styles/globals.css";
import dynamic from "next/dynamic";
import React from "react";
import { CursorRef } from "../components/Cursor";
import Head from "next/head";
const AnimatedCursor = dynamic(import("react-animated-cursor"), { ssr: false });
import Cursor from "../components/Cursor";

function MyApp({ Component, pageProps }) {
    const cursorRef = React.useRef < CursorRef > null;
    return (
        <div>
            <Head>
                <title>Atharv Shukla</title>
            </Head>
            <Component {...pageProps} cursor={cursorRef} />
        </div>
    );
}

export default MyApp;
