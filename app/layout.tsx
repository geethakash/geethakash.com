import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  title: "Akash Geethanjana",
  description:
    "Portfolio of Akash Geethanjana — a passionate Full-Stack Developer specializing in Next.js, React, GSAP, Framer Motion, and IoT systems.",
  keywords: [
    "Akash Geethanjana",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Sri Lanka",
  ],
  authors: [{ name: "Akash Geethanjana" }],
  openGraph: {
    title: "Akash Geethanjana — Full-Stack Developer",
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    type: "website",
    url: "https://geethakash.com",
    images: "https://geethakash.com/assets/img/business-card-og.png"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Geethanjana",
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    images: "https://geethakash.com/assets/img/business-card-og.png"
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "G-8E4C4J5SL7",

  }
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
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
