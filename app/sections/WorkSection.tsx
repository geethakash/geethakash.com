"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Link = { label: string; href: string };

const leadProject = {
  name: "Premise Edge",
  year: "2025",
  kind: "University project · IoT",
  description:
    "A building energy optimisation and automation system. WiFi-enabled devices switch lights and air conditioning, and a web dashboard shows every room live and lets you control it.",
  tags: ["ESP32", "MQTT", "FastAPI", "WebSockets", "Next.js"],
  flow: [
    { tag: "Device", name: "ESP32 nodes", note: "Lights, AC, sensors" },
    { tag: "Broker", name: "MQTT", note: "Lightweight pub/sub" },
    { tag: "Service", name: "FastAPI", note: "State and rules" },
    { tag: "Client", name: "Next.js dashboard", note: "Live monitoring" },
  ],
  links: ["Telemetry", "Subscribe", "WebSockets"],
};

const featuredProjects: {
  name: string;
  year: string;
  kind: string;
  description: string;
  itemsLabel: string;
  items: string[];
  tags: string[];
  link?: Link;
}[] = [
  {
    name: "Mobile Shop POS",
    year: "2026",
    kind: "Business system",
    description:
      "The whole back office of a phone shop in one app, from the counter to the repair bench.",
    itemsLabel: "Modules",
    items: [
      "Multi-user sign-in and roles",
      "Inventory",
      "Repair tracking",
      "Marketing tools",
      "Invoices sent to the customer's phone",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "Prisma"],
  },
  {
    name: "srv-stream",
    year: "2026",
    kind: "Open source · Self-hosted",
    description:
      "Turns any folder of videos on a server into a private streaming site, with file management built in.",
    itemsLabel: "Highlights",
    items: [
      "Byte-range streaming with instant seeking",
      "Subtitles extracted on demand with FFmpeg",
      "Hover-seek previews generated with OpenCV",
      "Token auth on every endpoint",
    ],
    tags: ["React", "TypeScript", "Flask", "FFmpeg"],
    link: { label: "Source", href: "https://github.com/geethakash/srv-stream" },
  },
];

const moreProjects: {
  name: string;
  year: string;
  description: string;
  tags: string[];
  link?: Link;
}[] = [
  {
    name: "AkaiLearn",
    year: "2025",
    description:
      "Course publishing platform that connects teachers and students, with structured lessons and progress tracking.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    link: { label: "Source", href: "https://github.com/geethakash/akailearn_next" },
  },
  {
    name: "Flavour POS",
    year: "2025",
    description: "Point-of-sale system for restaurants, built for fast order entry during busy service.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Bitzquad Website",
    year: "2022",
    description: "Company website, designed in Figma and animated with GSAP and Framer Motion.",
    tags: ["Next.js", "Tailwind", "GSAP", "Framer Motion"],
    link: { label: "bitzquad.com", href: "https://bitzquad.com" },
  },
  {
    name: "TecLMS",
    year: "2021",
    description:
      "Learning management system I built during COVID-19 so classmates could share study material securely. It began as plain HTML pages and grew into a Django app.",
    tags: ["Django", "JavaScript"],
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 font-mono text-xs text-volt uppercase tracking-widest underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight
        size={14}
        aria-hidden="true"
        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </a>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <span
          key={tag}
          className="text-[10px] bg-[#18181f] text-surgical-white/60 px-2 py-0.5 font-mono uppercase border border-white/7"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/** Device-to-dashboard diagram with packets moving both ways along each link. */
function SignalFlow() {
  const { flow, links } = leadProject;

  return (
    <div className="flex flex-col md:flex-row md:items-stretch">
      {flow.map((node, i) => (
        <Fragment key={node.name}>
          <div className="flex min-w-0 flex-col gap-1 border border-white/10 bg-[#0a0a0f] p-4 md:flex-1">
            <span className="font-mono text-[10px] text-volt uppercase tracking-widest">{node.tag}</span>
            <span className="text-surgical-white font-medium leading-tight">{node.name}</span>
            <span className="font-mono text-xs text-foreground/60">{node.note}</span>
          </div>
          {i < links.length && (
            <div className="relative flex h-16 shrink-0 items-center justify-center md:h-auto md:w-24">
              <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white/15 md:bottom-auto md:left-0 md:right-0 md:top-1/2 md:h-px md:w-auto">
                <span
                  className="packet max-md:left-[-2.5px] md:top-[-2.5px]"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
                <span
                  className="packet is-return max-md:left-[-2.5px] md:top-[-2.5px]"
                  style={{ animationDelay: `${i * 0.5 + 1.2}s` }}
                />
              </div>
              <span className="relative z-10 bg-[#111116] px-1.5 py-0.5 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                {links[i]}
              </span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="py-24 section-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs md:text-sm text-volt uppercase tracking-[0.2em]">
              Deployments
            </span>
            <h2 className="text-4xl md:text-5xl text-surgical-white font-medium tracking-tight mt-2">
              Selected Work
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-foreground leading-relaxed md:text-right">
            Products I&apos;ve designed and built, from IoT systems to business software.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Lead project */}
          <motion.article
            {...reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="project-card group bg-[#111116] border border-white/7 p-6 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
              <span>{leadProject.kind}</span>
              <span>{leadProject.year}</span>
            </div>
            <h3 className="project-title mt-4 text-4xl md:text-[2.75rem] text-surgical-white font-medium tracking-tight transition-colors duration-300">
              {leadProject.name}
            </h3>
            <p className="mt-4 max-w-[62ch] text-sm md:text-base text-foreground leading-relaxed">
              {leadProject.description}
            </p>

            <figure className="mt-10 flex flex-col gap-3">
              <SignalFlow />
              <figcaption className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                Telemetry travels up to the dashboard, commands travel back down.
              </figcaption>
            </figure>

            <div className="mt-8">
              <Tags items={leadProject.tags} />
            </div>
          </motion.article>

          {/* Featured pair */}
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <motion.article
                key={project.name}
                {...reveal}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="project-card group flex flex-col bg-[#111116] border border-white/7 p-6 sm:p-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                  <span>{project.kind}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="project-title mt-4 text-3xl md:text-4xl text-surgical-white font-medium tracking-tight transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="mt-4 text-sm text-foreground leading-relaxed">{project.description}</p>

                <p className="mt-6 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                  {project.itemsLabel}
                </p>
                <ul className="mt-3 border-t border-white/7">
                  {project.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-white/7 py-2.5 text-sm text-foreground"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 bg-volt" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <Tags items={project.tags} />
                  {project.link && <ExternalLink href={project.link.href}>{project.link.label}</ExternalLink>}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Index of other work */}
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="mt-12">
            <h3 className="font-mono text-[10px] text-foreground/60 uppercase tracking-widest">
              More Projects
            </h3>
            <ul className="mt-4 border-t border-white/7">
              {moreProjects.map((project) => (
                <li
                  key={project.name}
                  className="group grid gap-x-6 gap-y-2 border-b border-white/7 px-4 md:px-6 py-6 md:grid-cols-[4rem_11rem_minmax(0,1fr)_8rem] md:items-baseline hover:bg-white/[0.015] transition-colors duration-300"
                >
                  <span className="font-mono text-xs text-volt uppercase tracking-widest">
                    {project.year}
                  </span>
                  <h4 className="text-lg text-surgical-white font-medium leading-tight group-hover:text-volt transition-colors duration-300">
                    {project.name}
                  </h4>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
                    <p className="mt-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                  <div className="md:text-right">
                    {project.link && <ExternalLink href={project.link.href}>{project.link.label}</ExternalLink>}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
