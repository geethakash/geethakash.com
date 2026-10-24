import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { personJsonLd, site } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Akash Geethanjana",
    "geethakash",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "IoT",
    "Portfolio",
    "Sri Lanka",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: site.givenName,
    lastName: site.familyName,
    username: site.handle,
    title: `${site.name} — ${site.role}`,
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <GoogleAnalytics gaId="G-8E4C4J5SL7" />
      <body className="bg-[#050510] text-[#f1f5f9] overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
