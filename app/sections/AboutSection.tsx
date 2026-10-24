"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const facts = [
  {
    label: "EDUCATION",
    value: "BICT (Hons), University of Kelaniya",
    sub: "Faculty of Computing and Technology",
  },
];

type Token = { text: string; className?: string };

const keyword = "text-volt";
const name = "text-surgical-white";
const prop = "text-foreground";
const str = "text-surgical-white";
const num = "text-volt";
const punct = "text-foreground/55";

const code: Token[][] = [
  [{ text: "const", className: keyword }, { text: " " }, { text: "akash", className: name }, { text: " = {", className: punct }],
  [{ text: "  basedIn", className: prop }, { text: ": ", className: punct }, { text: '"Sri Lanka"', className: str }, { text: ",", className: punct }],
  [{ text: "  codingSince", className: prop }, { text: ": ", className: punct }, { text: "2019", className: num }, { text: ",", className: punct }],
  [{ text: "  careerShift", className: prop }, { text: ": ", className: punct }, { text: '"TecLMS"', className: str }, { text: ",", className: punct }],
  [
    { text: "  stack", className: prop },
    { text: ": [", className: punct },
    { text: '"Next.js"', className: str },
    { text: ", ", className: punct },
    { text: '"React"', className: str },
    { text: ",", className: punct },
  ],
  [
    { text: "          " },
    { text: '"Django"', className: str },
    { text: ", ", className: punct },
    { text: '"FastAPI"', className: str },
    { text: "],", className: punct },
  ],
  [{ text: "  loves", className: prop }, { text: ": ", className: punct }, { text: '"hardware + software"', className: str }, { text: ",", className: punct }],
  [{ text: "};", className: punct }],
];

const lineLengths = code.map((line) => line.reduce((n, token) => n + token.text.length, 0));
// Each line also counts one step for its line break, which reads as a short pause.
const lineStarts = lineLengths.map((_, i) => lineLengths.slice(0, i).reduce((n, len) => n + len + 1, 0));
const totalChars = lineLengths.reduce((n, len) => n + len + 1, 0);
const tokenStarts = code.map((line) =>
  line.map((_, j) => line.slice(0, j).reduce((n, token) => n + token.text.length, 0))
);

const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);

/** Editor window that types out a short description of me once it scrolls into view. */
function CodeCard({ start }: { start: boolean }) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!start || reduceMotion) return;
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= totalChars) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, [start, reduceMotion]);

  const shown = reduceMotion ? totalChars : typed;

  return (
    <div aria-hidden="true" className="border border-white/7 bg-[#0a0a0f]">
      <div className="flex items-center gap-2 border-b border-white/7 bg-[#18181f] px-4 py-3">
        <span className="size-2.5 rounded-full bg-volt/80" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-3 font-mono text-xs text-foreground/60">akash.ts</span>
        <span className="ml-auto font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
          TypeScript
        </span>
      </div>

      <div className="overflow-x-auto p-5 sm:p-6 font-mono text-[13px] sm:text-sm md:text-[15px] lg:text-base leading-7 lg:leading-8">
        {code.map((line, i) => {
          const start = lineStarts[i];
          // Untyped text stays in place but invisible, so the card never changes size.
          const lineTyped = clamp(shown - start, lineLengths[i]);
          const visible = line.map((token, j) => clamp(lineTyped - tokenStarts[i][j], token.text.length));
          const hasCursor =
            (shown >= start && shown <= start + lineLengths[i]) || (i === code.length - 1 && shown >= totalChars);
          const cursorToken = hasCursor ? visible.findIndex((v, j) => tokenStarts[i][j] + v === lineTyped) : -1;

          return (
            <div key={i} className="flex">
              <span className="mr-4 w-6 shrink-0 select-none text-right text-foreground/25">{i + 1}</span>
              <span className="whitespace-pre">
                {line.map((token, j) => (
                  <span key={j} className={token.className}>
                    {token.text.slice(0, visible[j])}
                    {j === cursorToken && <span className="cursor-blink -mr-[5px]" />}
                    <span className="opacity-0">{token.text.slice(visible[j])}</span>
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
          {/* Left: code card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative mx-2 mt-2">
              <CodeCard start={inView} />
              <CornerBrackets />
            </div>
          </motion.div>

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
