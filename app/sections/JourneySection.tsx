"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

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
    tech: ["Django", "SQLite", "HTML", "CSS", "JavaScript"],
  },
  {
    year: "2021",
    title: "Co-Founded Bitzquad",
    desc: "Co-founded a startup delivering information systems and business transformation. Shipped multiple client projects with advanced animations.",
    tech: ["React", "Next.js", "GSAP", "Framer Motion", "Tailwind"],
  },
  {
    year: "2025",
    title: "Premise Edge — BMS System",
    desc: "University project: a centralized Building Energy Optimization & Automation System with IoT-based architecture and real-time MQTT monitoring.",
    tech: ["MQTT", "IoT", "ESP32", "FastAPI", "WebSockets", "Next.js"],
  },
  {
    year: "2025",
    title: "promiseQ GmbH — Remote",
    desc: "Frontend Engineer (Remote) on promiseQube edge AI devices and promiseQ Cloud — a platform for monitoring edge computing infrastructure globally.",
    tech: ["Next.js", "TypeScript", "Docusaurus", "REST APIs"],
  },
];

function TimelineItemCard({
  event,
  index,
  sectionInView,
}: {
  event: (typeof journeyEvents)[0];
  index: number;
  sectionInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Has the scroll line reached this item?
  const isReached = useInView(ref, { margin: "0px 0px -35% 0px" });
  // Is this specific item currently active in the center focus band?
  const isCurrent = useInView(ref, { margin: "-38% 0px -42% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={sectionInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot: ONLY current active glows, previously reached are solid volt, future are dark */}
      <div
        className={`absolute -left-10 top-1.5 size-[14px] border transition-all duration-400 ${
          isCurrent
            ? "bg-volt border-volt shadow-[0_0_16px_rgba(170,255,0,0.9)] scale-125 z-20"
            : isReached
            ? "bg-volt border-volt shadow-none scale-100 z-10"
            : "bg-[#0a0a0f] border-white/20 shadow-none scale-100 z-10"
        }`}
      />

      {/* Year badge */}
      <span
        className={`font-mono text-[10px] uppercase tracking-widest mb-2 block transition-colors duration-400 ${
          isCurrent ? "text-volt font-bold" : isReached ? "text-volt/80 font-medium" : "text-foreground/40"
        }`}
      >
        {event.year}
      </span>

      {/* Title */}
      <h3
        className={`text-lg font-medium mb-2 transition-colors duration-400 ${
          isCurrent ? "text-surgical-white font-semibold" : isReached ? "text-surgical-white/90" : "text-surgical-white/50"
        }`}
      >
        {event.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-4 max-w-2xl transition-colors duration-400 ${
          isCurrent ? "text-foreground" : isReached ? "text-foreground/80" : "text-foreground/45"
        }`}
      >
        {event.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {event.tech.map((t: string) => (
          <span
            key={t}
            className={`text-[10px] px-2 py-0.5 font-mono uppercase border transition-all duration-400 ${
              isCurrent
                ? "bg-[#18181f] text-surgical-white border-volt/40"
                : isReached
                ? "bg-[#18181f]/80 text-surgical-white/70 border-white/10"
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
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Scroll progress for filling the timeline spine
  const { scrollYProgress } = useScroll({
    target: timelineTrackRef,
    offset: ["start 60%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="journey" ref={sectionRef} className="py-24 section-border">
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
        <div ref={timelineTrackRef} className="relative">
          {/* Base Inactive Vertical Spine */}
          <div className="absolute left-[6.5px] top-0 bottom-0 w-[1.5px] bg-white/10" />

          {/* Active Volt Filled Spine (grows on scroll) */}
          <motion.div
            className="absolute left-[6.5px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#aaff00] via-[#aaff00] to-[#c8ff4d] shadow-[0_0_10px_rgba(170,255,0,0.8)] z-0"
            style={{
              scaleY: smoothProgress,
              transformOrigin: "top",
            }}
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
