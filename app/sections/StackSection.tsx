"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stack = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Sass"] },
  { label: "Motion", items: ["GSAP", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Express", "FastAPI", "Django"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Firebase"] },
  { label: "Real-time & IoT", items: ["MQTT", "WebSockets", "ESP32"] },
  { label: "Infrastructure", items: ["Docker", "Linux", "Nginx", "Caddy", "Vercel", "Git", "CI/CD"] },
  { label: "Product & Docs", items: ["Figma", "PWA", "REST APIs", "Docusaurus", "MkDocs"] },
];

export default function StackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="py-24 bg-[#111116] section-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
              Tech_Stack
            </span>
            <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
              The Toolbox
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground leading-relaxed md:text-right">
            Optimised for performance, scalability, and developer experience.
            Every tool chosen with purpose.
          </p>
        </motion.div>

        {/* Category rows */}
        <dl className="border-t border-white/7">
          {stack.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="group grid gap-2 border-b border-white/7 py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6 hover:bg-white/[0.015] transition-colors duration-300"
            >
              <dt className="flex items-center gap-3 font-mono text-[11px] text-foreground/60 uppercase tracking-widest group-hover:text-volt transition-colors duration-300">
                <span className="w-1 h-1 bg-volt/40 group-hover:bg-volt transition-colors duration-300" />
                {row.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-mono text-surgical-white/80">
                  {row.items.map((item) => (
                    <li key={item} className="tech-item cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
