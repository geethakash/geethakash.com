import '../styles/global.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
