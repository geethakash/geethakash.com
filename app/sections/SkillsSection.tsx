"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "SASS", "GSAP", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Django", "FastAPI", "Express.js", "Node.js"],
  },
  {
    label: "DB & Services",
    items: ["MongoDB", "Firebase", "Firestore", "MySQL", "PostgreSQL", "Prisma"],
  },
  {
    label: "Tools",
    items: ["Docker", "WebSockets", "MQTT", "PWA", "REST APIs", "Vercel"],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-24 bg-[#111116] section-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left: title */}
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono text-foreground uppercase tracking-[0.3em] mb-4 underline decoration-[#aaff00] underline-offset-8">
              Tech_Stack
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              Optimised for performance, scalability, and developer experience.
              Every tool chosen with purpose.
            </p>

            {/* Volt accent line */}
            <div className="mt-8 h-px w-16 bg-volt/40" />

            {/* Also familiar with */}
            <div className="mt-8">
              <h4 className="font-mono text-[10px] text-foreground/50 uppercase border-b border-white/7 pb-2 mb-4">
                Also_Familiar
              </h4>
              <ul className="text-sm font-mono text-surgical-white/50 space-y-2">
                {["Figma", "Git", "Linux", "Nginx", "Caddy", "CI/CD"].map((item) => (
                  <li key={item} className="tech-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: category columns */}
          <div className="flex-grow grid grid-cols-2 lg:grid-cols-5 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="space-y-4"
              >
                <h4 className="font-mono text-[10px] text-foreground/60 uppercase border-b border-white/7 pb-2">
                  {cat.label}
                </h4>
                <ul className="text-sm font-mono text-surgical-white space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="tech-item cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
