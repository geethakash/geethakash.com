"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import PinoutChip from "../components/PinoutChip";
import { CopyEmail, LocalTime } from "../components/ui";
import { features, profile, siteRevision } from "../lib/content";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The name starts condensed (set in CSS) and widens to full width
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-line", {
          "--wdth": 125,
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.1,
        });
      });
      return () => mm.revert();
    },
    { scope: nameRef },
  );

  const titleBlock = [
    { label: "Part no.", value: "AG-19" },
    { label: "Function", value: profile.role },
    { label: "Revision", value: siteRevision },
    {
      label: "Local time",
      value: (
        <>
          <LocalTime /> <span className="text-ink-3">{profile.utcOffset}</span>
        </>
      ),
    },
  ];

  return (
    <section id="top" aria-label="Introduction" className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 md:pb-24 md:pt-10 lg:px-8">
        {/* Datasheet title block */}
        <dl className="grid grid-cols-2 border-y border-rule md:grid-cols-4">
          {titleBlock.map((cell, i) => (
            <div
              key={cell.label}
              className={`flex flex-col gap-1 py-3 pr-3 ${i % 2 === 1 ? "border-l border-rule pl-3" : ""} ${
                i >= 2 ? "border-t border-rule md:border-t-0" : ""
              } ${i === 2 ? "md:border-l md:pl-3" : ""}`}
            >
              <dt className="label">{cell.label}</dt>
              <dd className="font-mono text-sm">{cell.value}</dd>
            </div>
          ))}
        </dl>

        <h1
          ref={nameRef}
          className="display mt-10 text-[clamp(2.5rem,11.4vw,9.5rem)] md:mt-14"
        >
          <span className="hero-line block">Akash</span>
          <span className="hero-line block">Geethanjana</span>
        </h1>

        <div className="mt-12 grid items-start gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-6 lg:pt-4">
            <p className="max-w-[36ch] text-xl leading-snug text-ink-2 md:text-2xl md:leading-snug">
              Full-stack engineer. I build fast, carefully animated web apps, and I&apos;m happiest
              when they <span className="highlight">talk to hardware</span>: edge-AI devices, IoT
              sensors and building controls.
            </p>

            <p className="flex items-center gap-3 font-mono text-sm">
              <span className="led" aria-hidden="true" />
              Open to remote work · Based in {profile.location}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-signal px-5 py-3 font-mono text-sm font-medium uppercase tracking-[0.06em] text-on-signal transition-colors hover:bg-ink hover:text-paper"
              >
                See selected work
                <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <CopyEmail />
            </div>
          </div>

          <div className="w-full max-w-[34rem] justify-self-center lg:col-span-6 lg:justify-self-end">
            <PinoutChip />
          </div>
        </div>

        {/* Features */}
        <dl className="mt-16 grid border-t border-rule sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col gap-1 border-b border-rule py-5 sm:pr-6 lg:border-b-0 ${
                i % 2 === 1 ? "sm:border-l sm:pl-6" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt className="label">{f.label}</dt>
              <dd className="text-lg leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
