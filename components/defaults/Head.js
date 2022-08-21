import Head from 'next/head';
import React from 'react';

export default function CustomHead({
  title,
  description,
  image,
  ogImage,
  siteName,
  url,
  keywords,
  type,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={type ? type : 'website'} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={'1200'} />
      <meta property="og:image:height" content={'630'} />
      <meta property="og:locale" content="en_US" />

      <meta
        property="article:publisher"
        content="https://twitter.com/geethakash07"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@GeethAkash" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

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
  );
}
