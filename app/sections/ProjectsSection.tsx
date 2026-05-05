"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "BITZQUAD-WEB",
    title: "Bitzquad Website",
    description:
      "Company website designed in Figma and built with Next.js, Tailwind CSS. Features advanced animations using GSAP & Framer Motion.",
    tags: ["Next.js", "Tailwind", "GSAP", "Framer Motion"],
    year: "2022",
  },
  {
    id: "PREMISE-EDGE",
    title: "Premise Edge",
    description:
      "Centralized Building Energy Optimization & Automation System. IoT-based architecture with real-time monitoring via MQTT/WebSockets.",
    tags: ["IoT", "WebSockets", "MQTT", "React"],
    year: "2023",
  },
  {
    id: "MOBILE-POS",
    title: "Mobile Shop POS",
    description:
      "Complete business management system with multi-user auth, inventory management, repair tracking, marketing tools, and invoice delivery.",
    tags: ["Next.js", "MongoDB", "Node.js", "Prisma"],
    year: "2023",
  },
  {
    id: "TEC-LMS",
    title: "TecLMS",
    description:
      "Learning Management System built during COVID-19 for secure educational material sharing with auth, subject management, and resource delivery.",
    tags: ["Django", "JavaScript", "PostgreSQL"],
    year: "2021",
  },
  {
    id: "FLAVOUR-POS",
    title: "Flavour POS",
    description:
      "Point of Sale system designed for restaurants — fast, intuitive, and built for high-throughput order management.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2022",
  },
  {
    id: "AKAI-LEARN",
    title: "AkaiLearn",
    description:
      "Course publishing platform connecting teachers and students with structured content delivery and progress tracking.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    year: "2023",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-border overflow-hidden"
    >
      {/* Pinned container */}
      <div className="relative h-screen flex flex-col justify-center">
        {/* Section header */}
        <div
          ref={headerRef}
          className="absolute top-12 left-0 right-0 px-6 max-w-7xl mx-auto flex justify-between items-end z-10 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
              Deployments
            </span>
            <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
              Core Projects
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-xs text-foreground/50 uppercase hidden sm:block"
          >
            {projects.length} Projects — scroll →
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="h-scroll-track absolute left-0 top-1/2 -translate-y-1/2 gap-px"
          style={{ paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 24px))", paddingRight: 80 }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-[420px] h-[340px] bg-[#111116] border border-white/7 p-10 cursor-default group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] text-foreground/40">
                    PROJ_ID: {project.id}
                  </span>
                  <span className="font-mono text-[10px] text-foreground/40">
                    {project.year}
                  </span>
                </div>
                <h3 className="project-title text-2xl text-surgical-white mb-3 font-medium transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground max-w-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#18181f] text-surgical-white/60 px-2 py-0.5 font-mono uppercase border border-white/7"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
