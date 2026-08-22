"use client";

import React from "react";

interface BusinessCardProps {
  className?: string;
}

export default function BusinessCard({ className = "" }: BusinessCardProps) {
  return (
    <div
      className={`w-full aspect-[1.75/1] bg-[#111116] border border-white/10 relative flex select-none overflow-hidden ${className}`}
    >
      {/* Primary Black / Obsidian Zone (Left ~70%) */}
      <div className="w-[70%] p-5 sm:p-6 md:p-7 flex flex-col justify-between border-r border-white/10 bg-[#111116]">
        {/* Top Header */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-foreground/40 tracking-widest uppercase">
          <div className="size-1.5 rounded-full bg-volt" />
          PORTFOLIO
        </div>

        {/* Middle: Title & 2-Line Name */}
        <div className="space-y-1 my-auto">
          <span className="font-mono text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-[0.2em] block">
            Full-Stack Developer
          </span>
          <h1 className="pt-1 text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-surgical-white leading-[0.9]">
            AKASH
            <br />
            <span className="text-volt">GEETHANJANA</span>
          </h1>
          <p className="font-mono text-[10px] sm:text-[11px] text-foreground/70 leading-relaxed pt-1 line-clamp-2">
            Engineering scalable web systems, smooth UX, and exploring IoT.
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="border-t border-white/7 pt-2.5 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-foreground/60 uppercase tracking-widest">
          <div>
            <span className="text-foreground/40 block text-[8px] mb-0.5">LOCATION</span>
            <span className="text-surgical-white">SRI LANKA</span>
          </div>
        </div>
      </div>

      {/* Primary Volt Accent Zone (Right ~30%) */}
      <div className="w-[30%] bg-volt text-[#0a0a0f] p-4 sm:p-5 flex flex-col justify-between relative">
        {/* Top Badge */}
        <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-tighter uppercase text-right">
          GEETHAKASH
        </div>

        {/* Middle Tech Signature: Stacked with Separator */}
        <div className="my-auto py-1 flex flex-col items-end font-mono text-[9px] sm:text-[10px] font-bold text-[#0a0a0f]/80 tracking-widest uppercase text-right">
          <span className="py-0.5">DEV</span>
          <div className="w-4 h-px bg-[#0a0a0f]/25 my-0.5" />
          <span className="py-0.5">IOT</span>
          <div className="w-4 h-px bg-[#0a0a0f]/25 my-0.5" />
          <span className="py-0.5">WEB</span>
        </div>

        {/* Bottom Inquiries */}
        <div className="border-t border-[#0a0a0f]/20 pt-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-tight font-bold text-[#0a0a0f] leading-tight">
          <span className="text-[#0a0a0f]/60 block text-[7px] mb-0.5">INQUIRIES</span>
          BUSINESS &amp; COLLABS
        </div>
      </div>

      {/* Subtle Corner Hairline Marks */}
      <div className="absolute -top-px -left-px size-1.5 border-t border-l border-volt z-10" />
      <div className="absolute -bottom-px -left-px size-1.5 border-b border-l border-volt z-10" />
    </div>
  );
}
