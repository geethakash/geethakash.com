import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    description: "Building scalable web apps, smooth UX, and smart IoT systems.",
    type: "website",
    url: "https://geethakash.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Geethanjana",
    description: "Building scalable web apps, smooth UX, and smart IoT systems.",
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
      <body className="bg-[#050510] text-[#f1f5f9] overflow-x-hidden antialiased">
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
