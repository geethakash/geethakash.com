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

        {/* Quick Contact Links */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
        >
          <motion.a
            href="mailto:hello@geethakash.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-3 bg-[#111116] border border-white/10 text-surgical-white hover:border-[#aaff00]/40 hover:text-volt transition-colors uppercase tracking-wider"
          >
            <Mail size={13} />
            Email
          </motion.a>
          <motion.a
            href="https://github.com/Geethakash"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-3 bg-[#111116] border border-white/10 text-surgical-white hover:border-[#aaff00]/40 hover:text-volt transition-colors uppercase tracking-wider"
          >
            <ExternalLink size={13} />
            GitHub
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/geethakash"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-3 bg-[#111116] border border-white/10 text-surgical-white hover:border-[#aaff00]/40 hover:text-volt transition-colors uppercase tracking-wider"
          >
            <ExternalLink size={13} />
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </main>
  );
}
