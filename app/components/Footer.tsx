"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="section-border bg-[#0a0a0f] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Left: CTA copy */}
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl font-medium text-surgical-white tracking-tight mb-4">
              Let&apos;s{" "}
              <span className="text-volt">build</span> something
              <br />
              together.
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              I enjoy combining hardware + software to build smart systems that
              interact with the real world. Available for frontend, full-stack,
              and IoT projects.
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col gap-4">
            {/* GitHub — add your SVG icon here */}
            <a
              href="https://github.com/Geethakash"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-foreground hover:text-volt transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              {/* GitHub SVG placeholder */}
              <span className="inline-block w-4 h-4" aria-hidden="true" />
              → GitHub
            </a>

            {/* LinkedIn — add your SVG icon here */}
            <a
              href="https://linkedin.com/in/geethakash"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-foreground hover:text-volt transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              {/* LinkedIn SVG placeholder */}
              <span className="inline-block w-4 h-4" aria-hidden="true" />
              → LinkedIn
            </a>

            <a
              href="mailto:hello@geethakash.com"
              className="font-mono text-sm text-foreground hover:text-volt transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              {/* LinkedIn SVG placeholder */}
              <span className="inline-block w-4 h-4" aria-hidden="true" />
              → Email
            </a>


          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/7 pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            © {year} Akash Geethanjana
          </div>
          {/* <div className="flex items-center gap-2">
            <motion.div
              className="size-2 rounded-full bg-volt"
              animate={{ boxShadow: ["0 0 4px rgba(170,255,0,0.4)", "0 0 14px rgba(170,255,0,0.9)", "0 0 4px rgba(170,255,0,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
              Available for hire
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
