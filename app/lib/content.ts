// Single source for the site's copy. Sections read from here.

export const profile = {
  name: "Akash Geethanjana",
  handle: "geethakash",
  role: "Full-stack engineer",
  email: "hello@geethakash.com",
  location: "Sri Lanka",
  timeZone: "Asia/Colombo",
  utcOffset: "UTC+05:30",
  startedYear: 2019,
  github: "https://github.com/geethakash",
  linkedin: "https://www.linkedin.com/in/geethakash",
};

// Datasheet revision of this site, shown in the header block and footer.
export const siteRevision = "2026.10";

export const yearsBuilding = new Date().getFullYear() - profile.startedYear;

export const features = [
  {
    label: "Since 2019",
    value: `${yearsBuilding} years building software`,
  },
  {
    label: "promiseQ GmbH",
    value: "Frontend engineer, edge-AI platform",
  },
  {
    label: "Bitzquad",
    value: "Co-founder, 2021 – 2024",
  },
  {
    label: "University of Kelaniya",
    value: "BICT (Hons) undergraduate",
  },
];

export type Link = { label: string; href: string };

export type FeaturedProject = {
  slug: string;
  name: string;
  year: string;
  kind: string;
  summary: string;
  items: string[];
  itemsLabel: string;
  stack: string[];
  link?: Link;
};

export const premiseEdge = {
  slug: "premise-edge",
  name: "Premise Edge",
  year: "2025",
  kind: "University project · IoT",
  summary:
    "A building energy optimisation and automation system. WiFi-enabled devices switch lights and air conditioning, and a web dashboard shows every room live and lets you control it.",
  stack: ["ESP32", "MQTT", "FastAPI", "WebSockets", "Next.js"],
  flow: [
    { tag: "Device", name: "ESP32 nodes", note: "Lights, AC, sensors" },
    { tag: "Broker", name: "MQTT", note: "Lightweight pub/sub" },
    { tag: "Service", name: "FastAPI", note: "State and rules" },
    { tag: "Client", name: "Next.js dashboard", note: "Live monitoring" },
  ],
  links: ["Telemetry", "Subscribe", "WebSockets"],
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "mobile-shop-pos",
    name: "Mobile Shop POS",
    year: "2026",
    kind: "Business system",
    summary:
      "The whole back office of a phone shop in one app, from the counter to the repair bench.",
    itemsLabel: "Modules",
    items: [
      "Multi-user sign-in and roles",
      "Inventory",
      "Repair tracking",
      "Marketing tools",
      "Invoices sent to the customer's phone",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Prisma"],
  },
  {
    slug: "srv-stream",
    name: "srv-stream",
    year: "2026",
    kind: "Open source · Self-hosted",
    summary:
      "Turns any folder of videos on a server into a private streaming site, with file management built in.",
    itemsLabel: "Highlights",
    items: [
      "Byte-range streaming with instant seeking",
      "Subtitles extracted on demand with FFmpeg",
      "Hover-seek previews generated with OpenCV",
      "Token auth on every endpoint",
    ],
    stack: ["React", "TypeScript", "Flask", "FFmpeg"],
    link: { label: "Source", href: "https://github.com/geethakash/srv-stream" },
  },
];

export type IndexProject = {
  name: string;
  year: string;
  summary: string;
  stack: string[];
  link?: Link;
};

export const moreProjects: IndexProject[] = [
  {
    name: "AkaiLearn",
    year: "2025",
    summary:
      "Course publishing platform that connects teachers and students, with structured lessons and progress tracking.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    link: { label: "Source", href: "https://github.com/geethakash/akailearn_next" },
  },
  {
    name: "Flavour POS",
    year: "2025",
    summary: "Point-of-sale system for restaurants, built for fast order entry during busy service.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Bitzquad website",
    year: "2022",
    summary: "Company website, designed in Figma and animated with GSAP and Framer Motion.",
    stack: ["Next.js", "Tailwind", "GSAP", "Framer Motion"],
    link: { label: "bitzquad.com", href: "https://bitzquad.com" },
  },
  {
    name: "TecLMS",
    year: "2021",
    summary:
      "Learning management system I built during COVID-19 so classmates could share study material securely.",
    stack: ["Django", "JavaScript"],
  },
];

export type Role = {
  period: string;
  org: string;
  role: string;
  mode: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    period: "Feb 2025 – Nov 2025",
    org: "promiseQ GmbH",
    role: "Frontend Engineer",
    mode: "Remote",
    summary:
      "Frontend for edge-AI infrastructure: promiseQube, an edge device built on Raspberry Pi and Jetson, and promiseQ Cloud, the platform that monitors and manages those devices around the world.",
    points: [
      "Built product UI in Next.js and TypeScript",
      "Improved UX and the shared UI components",
      "Connected device-management screens to REST APIs",
      "Wrote technical documentation in Docusaurus and MkDocs",
    ],
    stack: ["Next.js", "TypeScript", "REST APIs", "Docusaurus", "MkDocs"],
  },
  {
    period: "Oct 2021 – Aug 2024",
    org: "Bitzquad",
    role: "Co-founder · Full-stack developer & UI/UX engineer",
    mode: "Startup",
    summary:
      "Co-founded a startup that builds information systems and helps businesses move their work online. Shipped web apps for multiple clients.",
    points: [
      "Built client web apps with Next.js, Node.js and MongoDB",
      "Designed UX flows and component systems in Figma",
      "Made interface animation with GSAP and Framer Motion",
      "Deployed and ran production apps on Vercel",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
];

export const milestones = [
  {
    year: "2021",
    title: "Built TecLMS",
    text: "First large independent project: a learning platform for classmates during COVID-19.",
  },
  {
    year: "2020",
    title: "First production frontend",
    text: "Contributed to the frontend of Vidusaviya, an education management system.",
  },
  {
    year: "2019",
    title: "First lines of code",
    text: "C#, command-line tools and Windows Forms apps.",
  },
];

export const specs = [
  { parameter: "Languages", values: ["TypeScript", "JavaScript", "Python"] },
  { parameter: "Frontend", values: ["React", "Next.js", "Tailwind CSS", "Sass"] },
  { parameter: "Motion", values: ["GSAP", "Framer Motion"] },
  { parameter: "Backend", values: ["Node.js", "Express", "FastAPI", "Django"] },
  { parameter: "Data", values: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Firebase"] },
  { parameter: "Real-time & IoT", values: ["MQTT", "WebSockets", "ESP32"] },
  { parameter: "Infrastructure", values: ["Docker", "Linux", "Nginx", "Caddy", "Vercel", "CI/CD"] },
  { parameter: "Product & docs", values: ["Figma", "PWA", "REST APIs", "Docusaurus", "MkDocs"] },
];

export const operatingConditions = [
  { parameter: "Location", value: profile.location },
  { parameter: "Time zone", value: profile.utcOffset },
  { parameter: "Work mode", value: "Remote, worldwide" },
  { parameter: "Building since", value: String(profile.startedYear) },
];
