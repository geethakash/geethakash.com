import '../styles/global.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
