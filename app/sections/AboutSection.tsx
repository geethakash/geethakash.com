"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { label: "EDUCATION", value: "BSc (Hons.) in Information and Communication Technology (UG)", sub: "University of Kelaniya, Sri Lanka" },
  { label: "LOCATION", value: "Sri Lanka 🇱🇰", sub: "Open to remote globally" },
  { label: "STARTED", value: "2019", sub: "6+ years building software" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-[#111116] section-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-volt uppercase tracking-[0.2em] mb-4 block">
              About
            </span>
            <h2 className="text-4xl text-surgical-white font-medium tracking-tight mb-6">
              Engineering<br />with purpose.
            </h2>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              I&apos;m a Full-Stack Developer passionate about software engineering, who loves building
              scalable web applications with smooth, engaging user experiences.
              {/* From IoT real-time dashboards to SaaS platforms — I&apos;ve shipped it all. */}
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-8">
              My journey started with{" "}
              <span className="text-surgical-white">C# and CLI tools in 2019</span>, evolved
              through <span className="text-surgical-white">building LMS platforms</span> during COVID,
              and today I craft enterprise-grade frontends with modern web technologies.
              {/* <span className="text-volt">Next.js, GSAP, and Framer Motion</span>. */}
            </p>

            {/* Stats */}
            <div className="flex gap-10">
              {[
                { num: "5+", label: "Yrs Coding" },
                { num: "10+", label: "Projects" },
                { num: "2", label: "Companies" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-3xl font-medium text-volt tracking-tight">{num}</div>
                  <div className="font-mono text-[10px] text-surgical-white/80 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-px border border-white/7"
          >
            {highlights.map(({ label, value, sub }) => (
              <div
                key={label}
                className="group flex items-start justify-between p-6 bg-[#0a0a0f] hover:bg-[#18181f] transition-colors duration-300"
              >
                <div>
                  <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-surgical-white font-medium">{value}</div>
                  <div className="font-mono text-xs text-foreground/60 mt-0.5">{sub}</div>
                </div>
                <span className="text-volt opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">→</span>
              </div>
            ))}

            {/* Fun fact row */}
            <div className="p-6 bg-[#0a0a0f] border-t border-white/7">
              <div className="font-mono text-[10px] text-volt uppercase tracking-widest mb-2">⚡ Fun Fact</div>
              <p className="text-sm text-foreground leading-relaxed">
                I love combining{" "}
                <span className="text-surgical-white">hardware + software</span> to build
                smart systems that interact with the real world.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
