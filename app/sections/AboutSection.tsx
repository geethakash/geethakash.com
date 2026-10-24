"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const facts = [
  {
    label: "EDUCATION",
    value: "BICT (Hons), University of Kelaniya",
    sub: "Faculty of Computing and Technology",
  },
];

function CornerBrackets() {
  const corner = "absolute size-4 border-volt";
  return (
    <span aria-hidden="true">
      <span className={`${corner} -left-2 -top-2 border-l border-t`} />
      <span className={`${corner} -right-2 -top-2 border-r border-t`} />
      <span className={`${corner} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${corner} -bottom-2 -right-2 border-b border-r`} />
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-[#111116] section-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start">
          {/* Left: portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="relative mx-2 mt-2">
              <Image
                src="/assets/img/profile-image.jpg"
                alt="Portrait of Akash Geethanjana"
                width={1984}
                height={1984}
                sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 40vw, 100vw"
                className="aspect-square w-full object-cover border border-white/7"
              />
              <CornerBrackets />
            </div>
            <figcaption className="mx-2 mt-2 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Akash Geethanjana · Sri Lanka
            </figcaption>
          </motion.figure>

          {/* Right: story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="font-mono text-xs md:text-sm text-volt uppercase tracking-[0.2em] mb-4 block">
              About
            </span>
            <h2 className="text-4xl md:text-5xl text-surgical-white font-medium tracking-tight mb-8">
              Engineering<br />with purpose.
            </h2>

            <p className="text-xl md:text-2xl text-surgical-white leading-snug tracking-tight mb-6">
              <span className="text-volt">TecLMS</span> is where my career shifted. I started it
              during <span className="whitespace-nowrap">COVID-19</span> as a few plain HTML pages so my classmates could share study
              material, and kept improving it until it became a full Django application.
            </p>
            <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
              From there I went all in on the web. In 2021 I co-founded{" "}
              <span className="text-surgical-white">Bitzquad</span> and spent three years shipping
              products for clients, and in 2025 I worked with{" "}
              <span className="text-surgical-white">promiseQ</span> on the cloud interface for their
              edge-AI devices.
            </p>
            <p className="text-sm md:text-base text-foreground leading-relaxed mb-10">
              The work I enjoy most is where software meets hardware. I like wiring up
              microcontrollers and sensors, then building the dashboard that makes them useful to
              people. <span className="text-surgical-white">Premise Edge</span>, my university
              project, came out of that.
            </p>

            <dl className="grid gap-px border border-white/7 bg-white/7">
              {facts.map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="p-6 bg-[#0a0a0f] hover:bg-[#18181f] transition-colors duration-300"
                >
                  <dt className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                    {label}
                  </dt>
                  <dd className="text-surgical-white font-medium">{value}</dd>
                  <dd className="font-mono text-xs text-foreground/60 mt-0.5">{sub}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
