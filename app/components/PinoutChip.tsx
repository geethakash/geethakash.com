"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { siteRevision } from "../lib/content";

gsap.registerPlugin(useGSAP);

type Pin = { n: number; label: string; name: string; used: string };

// Pin 1 is top-left; numbering runs counter-clockwise like a real DIP package.
const leftPins: Pin[] = [
  { n: 1, label: "NEXT.JS", name: "Next.js", used: "promiseQ Cloud, Bitzquad client apps, AkaiLearn" },
  { n: 2, label: "REACT", name: "React", used: "Flavour POS, srv-stream" },
  { n: 3, label: "TYPESCRIPT", name: "TypeScript", used: "promiseQ, AkaiLearn, srv-stream" },
  { n: 4, label: "TAILWIND", name: "Tailwind CSS", used: "Bitzquad website, AkaiLearn" },
  { n: 5, label: "GSAP", name: "GSAP", used: "Bitzquad website and this site" },
  { n: 6, label: "FIGMA", name: "Figma", used: "UX flows and component systems at Bitzquad" },
];

const rightPins: Pin[] = [
  { n: 12, label: "ESP32", name: "ESP32", used: "Premise Edge device nodes" },
  { n: 11, label: "MQTT", name: "MQTT", used: "Device messaging in Premise Edge" },
  { n: 10, label: "WEBSOCKET", name: "WebSockets", used: "Live dashboard updates in Premise Edge" },
  { n: 9, label: "FASTAPI", name: "FastAPI", used: "Premise Edge service layer" },
  { n: 8, label: "MONGODB", name: "MongoDB", used: "Mobile Shop POS, Flavour POS, Bitzquad" },
  { n: 7, label: "NODE.JS", name: "Node.js", used: "Mobile Shop POS, Flavour POS, Bitzquad" },
];

const allPins = [...leftPins, ...rightPins];

const BODY = { x: 150, y: 30, w: 140, h: 320 };
const pinY = (i: number) => 60 + i * 52;

export default function PinoutChip() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const activePin = allPins.find((p) => p.n === active);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const leds = gsap.utils
          .toArray<SVGRectElement>("[data-lit]")
          .sort((a, b) => Number(a.dataset.lit) - Number(b.dataset.lit));
        let flicker: gsap.core.Tween | undefined;

        // Power-on: LEDs light up in pin order, then idle activity
        gsap.to(leds, {
          opacity: 1,
          duration: 0.14,
          stagger: 0.07,
          delay: 0.5,
          ease: "none",
          onComplete: function next() {
            const led = gsap.utils.random(leds);
            gsap.fromTo(led, { opacity: 0.15 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
            flicker = gsap.delayedCall(gsap.utils.random(0.35, 1.2), next);
          },
        });

        return () => flicker?.kill();
      });
      return () => mm.revert();
    },
    { scope: svgRef },
  );

  const renderPin = (pin: Pin, i: number, side: "left" | "right") => {
    const y = pinY(i);
    const left = side === "left";
    const isActive = active === pin.n;
    const legX = left ? BODY.x - 14 : BODY.x + BODY.w;
    const ledX = left ? BODY.x - 34 : BODY.x + BODY.w + 26;
    const labelX = left ? BODY.x - 42 : BODY.x + BODY.w + 42;

    return (
      <g
        key={pin.n}
        className="pin cursor-pointer"
        tabIndex={0}
        role="button"
        aria-label={`Pin ${pin.n}, ${pin.name}`}
        onMouseEnter={() => setActive(pin.n)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(pin.n)}
        onBlur={() => setActive(null)}
        onClick={() => setActive(pin.n)}
      >
        <rect
          className="pin-hit"
          x={left ? 8 : BODY.x + BODY.w}
          y={y - 18}
          width={left ? BODY.x - 8 : 440 - 8 - BODY.x - BODY.w}
          height={36}
          fill="transparent"
        />
        {/* Leg */}
        <rect x={legX} y={y - 4} width={14} height={8} fill={isActive ? "var(--signal)" : "var(--ink-3)"} />
        {/* Trace to the LED */}
        <line
          x1={left ? legX : legX + 14}
          x2={left ? ledX + 8 : ledX}
          y1={y}
          y2={y}
          stroke="var(--rule-strong)"
          strokeWidth={1.5}
        />
        {/* LED */}
        <rect x={ledX} y={y - 4} width={8} height={8} fill="var(--paper)" stroke="var(--rule-strong)" />
        <rect className="pin-lit" data-lit={pin.n} x={ledX} y={y - 4} width={8} height={8} fill="var(--signal)" />
        {/* Label */}
        <text
          x={labelX}
          y={y}
          textAnchor={left ? "end" : "start"}
          dominantBaseline="central"
          className="font-mono"
          fontSize={14}
          letterSpacing="0.04em"
          fontWeight={isActive ? 600 : 400}
          fill={isActive ? "var(--ink)" : "var(--ink-2)"}
        >
          {pin.label}
        </text>
        {/* Pin number, inside the package */}
        <text
          x={left ? BODY.x + 10 : BODY.x + BODY.w - 10}
          y={y}
          textAnchor={left ? "start" : "end"}
          dominantBaseline="central"
          className="font-mono"
          fontSize={11}
          fill="var(--ink-3)"
        >
          {pin.n}
        </text>
      </g>
    );
  };

  return (
    <figure className="flex w-full flex-col gap-4">
      <svg
        ref={svgRef}
        viewBox="0 0 440 380"
        className="h-auto w-full"
        aria-labelledby="pinout-title"
        role="group"
      >
        <title id="pinout-title">
          Pin configuration of AG-19: frontend tools on the left pins, backend and IoT tools on the right pins
        </title>

        {/* Pin group headings */}
        <text x={BODY.x - 42} y={14} textAnchor="end" className="font-mono" fontSize={10} letterSpacing="0.1em" fill="var(--ink-3)">
          FRONTEND
        </text>
        <text x={BODY.x + BODY.w + 42} y={14} textAnchor="start" className="font-mono" fontSize={10} letterSpacing="0.1em" fill="var(--ink-3)">
          BACKEND · IOT
        </text>

        {/* Package */}
        <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} fill="var(--panel)" stroke="var(--ink)" strokeWidth={1.5} />
        <path
          d={`M${BODY.x + 55} ${BODY.y} A15 15 0 0 0 ${BODY.x + 85} ${BODY.y}`}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={1.5}
        />
        <circle cx={BODY.x + 22} cy={BODY.y + 14} r={3.5} fill="var(--ink)" />

        {/* Package marking, along the long axis */}
        <g transform={`translate(${BODY.x + BODY.w / 2 + 2} ${BODY.y + BODY.h / 2}) rotate(-90)`} fill="var(--ink)">
          <text textAnchor="middle" y={-6} className="display" fontSize={40}>
            AG-19
          </text>
          <text textAnchor="middle" y={14} className="font-mono" fontSize={11} letterSpacing="0.12em" fill="var(--ink-2)">
            GEETHAKASH
          </text>
          <text textAnchor="middle" y={30} className="font-mono" fontSize={10} letterSpacing="0.08em" fill="var(--ink-3)">
            LK · 2019 · REV {siteRevision}
          </text>
        </g>

        {leftPins.map((pin, i) => renderPin(pin, i, "left"))}
        {rightPins.map((pin, i) => renderPin(pin, i, "right"))}
      </svg>

      <figcaption className="flex min-h-12 flex-col gap-1 border-t border-rule pt-3 text-sm sm:flex-row sm:items-baseline sm:gap-3">
        {activePin ? (
          <>
            <span className="label text-signal-ink">Pin {String(activePin.n).padStart(2, "0")}</span>
            <span className="font-medium">{activePin.name}</span>
            <span className="text-ink-2">{activePin.used}</span>
          </>
        ) : (
          <>
            <span className="label">Fig. 1</span>
            <span className="text-ink-2">Pin configuration, top view. Hover or tap a pin to see where I&apos;ve used it.</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
