"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { motion, Variants } from "framer-motion";

const titleAnimation: Variants = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const textRevealAnimation: Variants = {
  initial: { y: "150%" },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.8,
    },
  },
};

function AnimatedWord({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={titleAnimation}
      initial="initial"
      animate="animate"
      className={`inline-block overflow-hidden align-bottom ${className}`}
    >
      {[...text].map((letter, index) => (
        <motion.span
          className="inline-block"
          variants={textRevealAnimation}
          key={index}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

const roles = [
  "FULL-STACK DEVELOPER",
  "SOFTWARE ENGINEER",
  "IOT ENTHUSIAST",
  "WEB ANIMATOR",
];

function TypewriterRole({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");
  const charRef = useRef(0);

  useEffect(() => {
    const current = texts[index];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (charRef.current < current.length) {
        t = setTimeout(() => {
          charRef.current += 1;
          setDisplayed(current.slice(0, charRef.current));
        }, 60);
      } else {
        t = setTimeout(() => setPhase("pausing"), 2000);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("erasing"), 300);
    } else {
      if (charRef.current > 0) {
        t = setTimeout(() => {
          charRef.current -= 1;
          setDisplayed(current.slice(0, charRef.current));
        }, 30);
      } else {
        setIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [phase, displayed, index, texts]);

  return (
    <span className="text-volt">
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // h1 is now animated using framer-motion
      gsap.from(".hero-sub", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out", delay: 0.35,
      });
      gsap.from(".hero-cta", {
        opacity: 0, y: 20, duration: 0.7, ease: "power2.out", delay: 0.55,
      });
      gsap.from(".hero-meta", {
        opacity: 0, duration: 0.8, delay: 0.65,
      });
      gsap.from(".hero-scroll", {
        opacity: 0, y: 10, duration: 0.6, delay: 1.0,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative mx-auto min-h-screen flex flex-col justify-center pt-14"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col justify-center flex-1 relative">
        {/* Top-right metadata — template style */}
        <div className="hero-meta absolute top-20 right-6 font-mono text-[10px] text-foreground/50 space-y-1 hidden md:block text-right">
          <p>STATUS: AVAILABLE</p>
          <p>LOCATION: SRI_LANKA</p>
          <p>STACK: REACT / NEXT / IOT</p>
        </div>

        {/* Main heading */}
        <div className="space-y-6">
          <h1 className="hero-h1 text-[clamp(4rem,12vw,10rem)] font-medium text-surgical-white tracking-tighter leading-[0.85]">
            <AnimatedWord text="AKASH" />
            <br />
            <AnimatedWord text="GEETHANJANA" className="text-volt" />
          </h1>

          {/* Role typewriter + divider */}
          <div className="hero-sub flex items-center gap-6">
            <p className="max-w-md text-sm leading-relaxed text-foreground font-mono">
              <TypewriterRole texts={roles} />
              <br />
              <span className="text-foreground mt-1 block">
                Full-Stack Developer passionate about software engineering,
                building scalable web applications, crafting smooth user
                experiences, and experimenting with IoT systems.
              </span>
            </p>
            <div className="h-px flex-grow bg-white/7 hidden md:block" />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="hero-cta mt-12 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-7 py-3 bg-volt text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#c8ff4d] transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-white/15 text-surgical-white font-mono text-xs font-bold uppercase tracking-widest hover:border-[#aaff00]/40 hover:text-volt transition-colors"
          >
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#aaff00]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
