import type { Metadata } from "next";
import { site } from "../lib/site";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Business Card",
  description: `Digital business card of ${site.name} (${site.handle}), ${site.role.toLowerCase()} from Sri Lanka.`,
  alternates: {
    canonical: "/business-card",
  },
  openGraph: {
    type: "profile",
    firstName: site.givenName,
    lastName: site.familyName,
    username: site.handle,
    title: `Business Card — ${site.name}`,
    url: "/business-card",
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
};

export default function BusinessCardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
