"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { profile } from "../lib/content";

/** Respects the visitor's reduced-motion setting for every Framer Motion animation. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Datasheet section: side heading on the left, content on the right. */
export function Section({
  id,
  index,
  term,
  title,
  intro,
  children,
}: {
  id: string;
  index: number;
  term: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-12 md:gap-8 md:py-28 lg:px-8">
        <header className="md:col-span-4 lg:col-span-3">
          <div className="flex flex-col gap-4 md:sticky md:top-24">
            <p className="label">
              <span className="text-signal-ink">§{index}</span> · {term}
            </p>
            <h2 id={`${id}-title`} className="display text-[2.5rem] [--wdth:112] lg:text-[2.75rem]">
              {title}
            </h2>
            {intro && <p className="max-w-xs text-ink-2">{intro}</p>}
          </div>
        </header>
        <div className="min-w-0 md:col-span-8 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="border border-rule-strong px-2 py-1 font-mono text-[0.72rem] uppercase leading-none tracking-[0.06em] text-ink-2">
      {children}
    </li>
  );
}

export function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-signal-ink underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight
        size={14}
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

/** Copies the email address; falls back to opening the mail app. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-3 border border-rule-strong px-4 py-3 font-mono text-sm transition-colors hover:border-ink ${className}`}
    >
      <span>{profile.email}</span>
      <span className="relative inline-flex h-4 w-14 justify-end overflow-hidden" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`label ${copied ? "text-signal-ink" : "group-hover:text-ink"}`}
          >
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="inline-flex size-9 items-center justify-center border border-rule-strong text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      <Sun size={16} aria-hidden="true" className="theme-when-light" />
      <Moon size={16} aria-hidden="true" className="theme-when-dark" />
    </button>
  );
}

/** Current time in Sri Lanka. Renders a placeholder on the server. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const timer = setInterval(update, 15_000);
    return () => clearInterval(timer);
  }, []);

  return <time className="tabular-nums">{time ?? "--:--"}</time>;
}
