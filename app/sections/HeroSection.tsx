"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { motion, Variants } from "framer-motion";

const titleAnimation = (delayOffset: number): Variants => ({
  animate: {
    transition: {
      delayChildren: delayOffset + 0.1,
      staggerChildren: 0.05,
    },
  },
});

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

function AnimatedWord({ text, className = "", delayOffset = 0, isReady = true }: { text: string; className?: string; delayOffset?: number; isReady?: boolean }) {
  return (
    <motion.span
      variants={titleAnimation(delayOffset)}
      initial="initial"
      animate={isReady ? "animate" : "initial"}
      className={`inline-block overflow-hidden align-bottom ${className}`}
    >
      {[...text].map((letter, index) => (
        <motion.span
          className="inline-block will-change-transform"
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

function TypewriterRole({ texts, isReady = true }: { texts: string[]; isReady?: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isReady) return;

    let index = 0;
    let phase: "typing" | "pausing" | "erasing" = "typing";
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const loop = () => {
      const current = texts[index];

      if (phase === "typing") {
        if (charIndex < current.length) {
          charIndex++;
          if (spanRef.current) spanRef.current.textContent = current.slice(0, charIndex);
          timeout = setTimeout(loop, 60);
        } else {
          phase = "pausing";
          timeout = setTimeout(loop, 2000);
        }
      } else if (phase === "pausing") {
        phase = "erasing";
        timeout = setTimeout(loop, 300);
      } else {
        if (charIndex > 0) {
          charIndex--;
          if (spanRef.current) spanRef.current.textContent = current.slice(0, charIndex);
          timeout = setTimeout(loop, 30);
        } else {
          index = (index + 1) % texts.length;
          phase = "typing";
          timeout = setTimeout(loop, 60);
        }
      }
    };

    loop();

    return () => clearTimeout(timeout);
  }, [texts, isReady]);

  return (
    <span className="text-volt">
      <span ref={spanRef}></span>
      <span className="cursor-blink" />
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isReplay, setIsReplay] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).__PRELOADER_DONE__) {
        setIsReady(true);
      } else {
        const handlePreloader = () => setIsReady(true);
        window.addEventListener("preloader-finished", handlePreloader);
        return () => window.removeEventListener("preloader-finished", handlePreloader);
      }
    }
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      setIsReplay(true);
      setAnimationKey(prev => prev + 1);
    };
    window.addEventListener("replay-animations", handleReplay);
    return () => window.removeEventListener("replay-animations", handleReplay);
  }, []);

  const delayOffset = isReplay ? 0 : 0.4;

  useGSAP(
    () => {
      if (!isReady) {
        gsap.set([".hero-sub", ".hero-cta", ".hero-meta", ".hero-scroll"], { opacity: 0 });
        return;
      }
      gsap.fromTo(".hero-sub", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: delayOffset + 0.35,
      });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: delayOffset + 0.55,
      });
      gsap.fromTo(".hero-meta", { opacity: 0 }, {
        opacity: 1, duration: 0.8, delay: delayOffset + 0.65,
      });
      gsap.fromTo(".hero-scroll", { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, delay: delayOffset + 1.0,
      });
    },
    { scope: containerRef, dependencies: [animationKey, delayOffset, isReady] }
  );

  return (
    <section
      key={animationKey}
      id="hero"
      ref={containerRef}
      className="relative mx-auto min-h-screen flex flex-col justify-center pt-14"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col justify-center flex-1 relative">
        {/* Top-right metadata — template style */}
        {/* <div className="hero-meta absolute top-20 right-6 font-mono text-[10px] text-foreground/50 space-y-1 hidden md:block text-right">
          <p>CODE</p>
          <p>CREATE</p>
          <p>SOLVE</p>
        </div> */}

        {/* Main heading */}
        <div className="space-y-6">
          <h1 className="hero-h1 text-[clamp(4rem,12vw,10rem)] font-medium text-surgical-white tracking-tighter leading-[0.85]">
            <AnimatedWord text="AKASH" delayOffset={delayOffset} isReady={isReady} />
            <br />
            <AnimatedWord text="GEETHANJANA" className="text-volt" delayOffset={delayOffset} isReady={isReady} />
          </h1>

          {/* Role typewriter + divider */}
          <div className="hero-sub flex items-center gap-6">
            <p className="max-w-md text-sm leading-relaxed text-foreground font-mono">
              <TypewriterRole texts={roles} isReady={isReady} />
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
