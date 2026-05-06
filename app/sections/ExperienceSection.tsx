"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "PromiseQ GmbH",
    role: "Full-Stack Developer",
    type: "Remote",
    period: "Feb 2025 - Nov 2025",
    description:
      "Worked on edge AI infrastructure — promiseQube (Raspberry Pi / Jetson-based edge devices) and the promiseQ Cloud platform for monitoring and managing edge infrastructure globally.",
    highlights: [
      "Frontend development with Next.js and TypeScript",
      "UX engineering and UI component improvements",
      "Technical documentation with Docusaurus and MkDocs",
      "REST API integrations for device management",
    ],
    tech: ["Next.js", "TypeScript", "REST APIs", "Docusaurus", "MkDocs"],
  },
  {
    company: "Bitzquad",
    role: "Full-Stack Developer & UI/UX Engineer",
    type: "Co-Founder",
    period: "Oct 2021 - Aug 2024",
    description:
      "Co-founded a startup delivering information systems and business transformation. Built modern web applications for multiple clients with a focus on performance and high-quality animations.",
    highlights: [
      "Built modern web apps with Next.js for multiple clients",
      "Designed UI/UX workflows and component systems",
      "Created animations with GSAP & Framer Motion",
      "Full stack: MongoDB, Node.js, Tailwind CSS",
      "Deployed and managed applications on Vercel",
    ],
    tech: ["Next.js", "GSAP", "Framer Motion", "MongoDB", "Node.js", "Tailwind CSS"],
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
          className="mb-16"
        >
          <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
            Work History
          </span>
          <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
            Experience
          </h2>
        </motion.div>

        {/* Experience entries */}
        <div className="space-y-0 divide-y divide-white/7">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group py-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 hover:bg-white/[0.01] transition-colors duration-300"
            >
              {/* Left: meta */}
              <div>
                <div className="font-mono text-[10px] text-volt uppercase tracking-widest mb-2">
                  {exp.period}
                </div>
                <h3 className="text-xl font-medium text-surgical-white mb-1">
                  {exp.company}
                </h3>
                <div className="font-mono text-xs text-foreground mb-1">{exp.role}</div>
                <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                  [{exp.type}]
                </div>
              </div>

              {/* Right: content */}
              <div>
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 bg-volt" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
