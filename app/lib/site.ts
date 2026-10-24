// Who the site belongs to. Shared by metadata, structured data, sitemap and robots
// so search engines see one consistent identity.
export const site = {
  url: "https://geethakash.com",
  name: "Akash Geethanjana",
  givenName: "Akash",
  familyName: "Geethanjana",
  handle: "geethakash",
  role: "Full-Stack Developer",
  description:
    "Akash Geethanjana (geethakash) is a full-stack developer from Sri Lanka who builds web applications with Next.js and React, and IoT systems with ESP32 and MQTT.",
  ogImage: "/assets/img/business-card-og.png",
  photo: "/assets/img/profile-image.jpg",
  profiles: ["https://github.com/geethakash", "https://www.linkedin.com/in/geethakash"],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: [site.handle, `${site.name} Portfolio`],
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: `${site.name} — ${site.role}`,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      givenName: site.givenName,
      familyName: site.familyName,
      alternateName: site.handle,
      url: site.url,
      image: `${site.url}${site.photo}`,
      jobTitle: site.role,
      description: site.description,
      nationality: { "@type": "Country", name: "Sri Lanka" },
      address: { "@type": "PostalAddress", addressCountry: "LK" },
      knowsAbout: ["Next.js", "React", "TypeScript", "Python", "Django", "FastAPI", "IoT", "MQTT"],
      sameAs: site.profiles,
    },
  ],
};
