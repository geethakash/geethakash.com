"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const journeyEvents = [
  {
    year: "2019",
    title: "First Lines of Code",
    desc: "Started programming with C#, building CLI tools and Windows Forms applications. Discovered the power of software solving real-world problems.",
    tech: ["C#", "Windows Forms"],
  },
  {
    year: "2020",
    title: "Web Development Begins",
    desc: "Contributed to the frontend of Vidusaviya — an educational management system. First taste of building real user interfaces on production systems.",
    tech: ["HTML", "CSS"],
  },
  {
    year: "2021",
    title: "TecLMS — Independent Project",
    desc: "Built a Learning Management System during COVID-19 for secure educational material sharing, complete with auth and subject management.",
    tech: ["Django", "SQLite", "HTML", "CSS", "JavaScript",],
  },
  {
    year: "2021",
    title: "Co-Founded Bitzquad",
    desc: "Co-founded a startup delivering information systems and business transformation. Shipped multiple client projects with advanced animations.",
    tech: ["React", "Next.js", "GSAP", "Framer Motion", "Tailwind"],
  },
  {
    year: "2022",
    title: "Premise Edge — BMS System",
    desc: "University project: a centralized Building Energy Optimization & Automation System with IoT-based architecture and real-time MQTT monitoring.",
    tech: ["MQTT", "IoT", "ESP32", "FastAPI", "WebSockets", "Next.js"],
  },
  {
    year: "2025",
    title: "PromiseQ GmbH — Remote",
    desc: "Full-Stack Developer (Remote) on promiseQube edge AI devices and promiseQ Cloud — a platform for monitoring edge computing infrastructure globally.",
    tech: ["Next.js", "TypeScript", "Docusaurus", "REST APIs"],
  },
];

function TimelineItemCard({ event, index, sectionInView }: { event: any, index: number, sectionInView: boolean }) {
  const ref = useRef(null);
  // Activates when the element crosses the middle of the screen
  const isCentered = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={sectionInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot */}
      <div
        className={`absolute -left-10 top-1.5 size-[14px] border border-white/15 transition-all duration-500 ${isCentered ? "bg-volt shadow-[0_0_12px_rgba(170,255,0,0.6)] scale-125" : "bg-[#0a0a0f] scale-100"
          }`}
      />

      {/* Year badge */}
      <span className={`font-mono text-[10px] uppercase tracking-widest mb-2 block transition-colors duration-500 ${isCentered ? "text-volt" : "text-foreground/50"
        }`}>
        {event.year}
      </span>

      {/* Title */}
      <h3 className={`text-lg font-medium mb-2 transition-colors duration-500 ${isCentered ? "text-surgical-white" : "text-surgical-white/60"
        }`}>
        {event.title}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-4 max-w-2xl transition-colors duration-500 ${isCentered ? "text-foreground" : "text-foreground/60"
        }`}>
        {event.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {event.tech.map((t: string) => (
          <span
            key={t}
            className={`text-[10px] px-2 py-0.5 font-mono uppercase border transition-all duration-500 ${isCentered
              ? "bg-[#18181f] text-surgical-white/80 border-white/15"
              : "bg-transparent text-surgical-white/30 border-white/5"
              }`}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function JourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" ref={ref} className="py-24 section-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
            Timeline
          </span>
          <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
            The Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <motion.div
            className="absolute left-[7px] top-0 bottom-0 w-px bg-white/7"
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          />

          <div className="space-y-12 pl-10">
            {journeyEvents.map((event, i) => (
              <TimelineItemCard key={`${event.year}-${event.title}`} event={event} index={i} sectionInView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
