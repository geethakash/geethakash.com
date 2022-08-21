import '../styles/global.css';

import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
