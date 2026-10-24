"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "promiseQ GmbH",
    role: "Frontend Engineer",
    type: "Remote",
    period: "Feb 2025 – Nov 2025",
    description:
      "Frontend for edge-AI infrastructure: promiseQube, an edge device built on Raspberry Pi and Jetson, and promiseQ Cloud, the platform that monitors and manages those devices around the world.",
    highlights: [
      "Built product UI in Next.js and TypeScript",
      "Improved UX and the shared UI components",
      "Connected device-management screens to REST APIs",
      "Wrote technical documentation in Docusaurus and MkDocs",
    ],
    tech: ["Next.js", "TypeScript", "REST APIs", "Docusaurus", "MkDocs"],
  },
  {
    company: "Bitzquad",
    role: "Co-founder · Full-stack developer & UI/UX engineer",
    type: "Startup",
    period: "Oct 2021 – Aug 2024",
    description:
      "Co-founded a startup that builds information systems and helps businesses move their work online. Shipped web apps for multiple clients.",
    highlights: [
      "Built client web apps with Next.js, Node.js and MongoDB",
      "Designed UX flows and component systems in Figma",
      "Made interface animation with GSAP and Framer Motion",
      "Deployed and ran production apps on Vercel",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 bg-[#111116] section-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
            Work History
          </span>
          <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
            Experience
          </h2>
        </motion.div>

        {/* Roles */}
        <ol className="border-t border-white/7 divide-y divide-white/7">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group py-12 grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
            >
              {/* Left: period */}
              <div className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-2 md:flex-col">
                <span className="font-mono text-xs text-volt uppercase tracking-widest">
                  {exp.period}
                </span>
                <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                  [{exp.type}]
                </span>
              </div>

              {/* Right: role */}
              <div className="min-w-0">
                <h3 className="text-2xl md:text-[1.75rem] font-medium text-surgical-white tracking-tight leading-tight group-hover:text-volt transition-colors duration-300">
                  {exp.company}
                </h3>
                <p className="mt-1 font-mono text-xs text-foreground">{exp.role}</p>
                <p className="mt-5 max-w-[64ch] text-sm text-foreground leading-relaxed">
                  {exp.description}
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 bg-volt" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-[#0a0a0f] text-surgical-white/60 px-2 py-0.5 font-mono uppercase border border-white/7"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
