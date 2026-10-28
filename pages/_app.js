import "../styles/globals.css";
import Head from "next/head";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Atharv Shukla — Founding Engineer</title>
        <meta
          name="description"
          content="Atharv Shukla — founding engineer. I take B2B products from an empty repo to production: architecture, backend, frontend, cloud and compliance."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090b" />
        <meta property="og:title" content="Atharv Shukla — Founding Engineer" />
        <meta
          property="og:description"
          content="Founding engineer. Relay, Upmarket and Vouch: three products built and shipped end to end."
        />
        <link rel="icon" href="/favicon.ico?v=2" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <MotionConfig reducedMotion="user">
        <div className={`${sans.variable} ${mono.variable}`}>
          <Layout>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <motion.div
                key={router.asPath.split("#")[0]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </div>
      </MotionConfig>
    </>
  );
}

export default MyApp;
