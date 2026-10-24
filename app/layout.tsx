import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import SmoothScroll from "./components/SmoothScroll";
import { profile } from "./lib/content";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Akash Geethanjana is a full-stack engineer from Sri Lanka building fast, carefully animated web apps with Next.js, React and TypeScript, and the interfaces for IoT and edge-AI systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://geethakash.com"),
  title: "Akash Geethanjana",
  description,
  keywords: [
    "Akash Geethanjana",
    "Software Engineer",
    "Full-Stack Developer",
    "Frontend Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "IoT",
    "Portfolio",
    "Sri Lanka",
  ],
  authors: [{ name: "Akash Geethanjana" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Akash Geethanjana — Full-Stack Engineer",
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    type: "website",
    url: "https://geethakash.com",
    images: "/assets/img/business-card-og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Geethanjana",
    description: "Engineering scalable web systems, smooth UX, and exploring IoT.",
    images: "/assets/img/business-card-og.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e0a" },
  ],
};

// Runs before first paint: applies a saved theme (no flash of the wrong theme) and
// marks that JS is available, which enables the load-animation start states in CSS.
const themeScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://geethakash.com",
  image: "https://geethakash.com/assets/img/profile-image.jpg",
  jobTitle: "Full-Stack Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Kelaniya" },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <GoogleAnalytics gaId="G-8E4C4J5SL7" />
      <body className="bg-paper text-ink overflow-x-hidden antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
