"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import BusinessCard from "../components/BusinessCard";
import { ArrowLeft, Mail, ExternalLink } from "lucide-react";

import AnimatedGridBackground from "../components/AnimatedGridBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BusinessCardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f1f5f9] flex flex-col items-center justify-center p-6 relative select-none overflow-hidden">
      {/* Dynamic Animated Grid with Running Volt Beams */}
      <AnimatedGridBackground />

      {/* Ambient Volt Glow Behind Card */}
      <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-radial from-[#aaff00]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[500px] flex flex-col items-center gap-8"
      >
        {/* Navigation Back */}
        <motion.div
          variants={itemVariants}
          className="w-full flex items-center justify-between"
        >
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-xs text-foreground/60 hover:text-volt transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            DIGITAL PASS
          </span>
        </motion.div>

        {/* Business Card Component */}
        <motion.div
          variants={itemVariants}
          className="w-full"
        >
          <BusinessCard />
        </motion.div>

        {/* Quick Contact Links with Split Flap Roll & Drawing Border */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
        >
          {[
            { href: "mailto:hello@geethakash.com", label: "Email", icon: Mail, external: false },
            { href: "https://github.com/Geethakash", label: "GitHub", icon: ExternalLink, external: true },
            { href: "https://linkedin.com/in/geethakash", label: "LinkedIn", icon: ExternalLink, external: true },
          ].map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group relative flex items-center px-6 py-3.5 bg-[#111116] border border-white/10 font-mono text-xs font-bold uppercase tracking-wider overflow-hidden transition-colors duration-300"
            >
              {/* Drawing Border SVG Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="#aaff00"
                  strokeWidth="1.5"
                  pathLength="100"
                  className="[stroke-dasharray:100] [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </svg>

              {/* Split Flap Roll Container */}
              <div className="relative flex flex-col items-center justify-center h-4 overflow-hidden">
                <span className="text-surgical-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full flex items-center gap-2">
                  <Icon size={13} />
                  <span>{label}</span>
                </span>
                <span className="absolute text-volt transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 flex items-center gap-2">
                  <Icon size={13} />
                  <span>{label}</span>
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
