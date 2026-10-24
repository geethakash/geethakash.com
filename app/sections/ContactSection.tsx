"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle, Send } from "lucide-react";
import { CopyEmail, Reveal, Section } from "../components/ui";
import { profile } from "../lib/content";

type Status = "idle" | "sending" | "sent" | "error";

/** Border that draws itself around a field while it has focus. */
function FocusBorder() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="none"
        stroke="var(--signal-ink)"
        strokeWidth="2"
        pathLength="100"
        className="transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [stroke-dasharray:100] [stroke-dashoffset:100] group-focus-within:[stroke-dashoffset:0]"
      />
    </svg>
  );
}

const fieldClass =
  "block w-full border border-rule-strong bg-paper px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-3 focus:outline-none";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("sent");
      } else {
        console.error("Form submission failed:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const pins = [
    { n: 1, name: "Email", value: <CopyEmail className="sm:-my-1" /> },
    {
      n: 2,
      name: "LinkedIn",
      value: (
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-mono text-sm hover:text-signal-ink">
          linkedin.com/in/geethakash
          <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ),
    },
    {
      n: 3,
      name: "GitHub",
      value: (
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-mono text-sm hover:text-signal-ink">
          github.com/geethakash
          <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ),
    },
    {
      n: 4,
      name: "Card",
      value: (
        <Link href="/business-card" className="group inline-flex items-center gap-1.5 font-mono text-sm hover:text-signal-ink">
          Digital business card
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ),
    },
  ];

  return (
    <Section id="contact" index={5} term="Pin functions" title="Contact">
      <Reveal>
        <p className="display max-w-[14ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] [--wdth:112]">
          Let&apos;s build something <span className="text-signal-ink">together.</span>
        </p>
        <p className="mt-6 max-w-[52ch] text-lg text-ink-2">
          I&apos;m open to remote roles and to frontend, full-stack and IoT projects. Email is the
          fastest way to reach me.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-rule-strong pb-3 sm:grid-cols-[2.5rem_5.5rem_minmax(0,1fr)]" aria-hidden="true">
            <span className="label">Pin</span>
            <span className="label hidden sm:block">Name</span>
            <span className="label">Function</span>
          </div>
          <ul>
            {pins.map((pin) => (
              <li key={pin.n} className="grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-y-2 border-b border-rule py-3 sm:grid-cols-[2.5rem_5.5rem_minmax(0,1fr)]">
                <span className="row-span-2 self-start font-mono text-sm tabular-nums text-ink-3 sm:row-span-1 sm:self-center">{pin.n}</span>
                <span className="label text-ink">{pin.name}</span>
                <span className="min-w-0 break-words">{pin.value}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start gap-3 border border-rule bg-panel p-8"
              role="status"
            >
              <CheckCircle size={28} className="text-signal-ink" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Message sent</h3>
              <p className="text-ink-2">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="label">Name</label>
                  <div className="group relative">
                    <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />
                    <FocusBorder />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="label">Email</label>
                  <div className="group relative">
                    <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
                    <FocusBorder />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="label">Message</label>
                <div className="group relative">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role or project"
                    className={`${fieldClass} resize-none`}
                  />
                  <FocusBorder />
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="border-l-2 border-signal-ink pl-3 text-sm text-ink">
                  The message didn&apos;t send. Check your connection and try again, or email{" "}
                  {profile.email} directly.
                </p>
              )}

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 self-start bg-signal px-6 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.06em] text-on-signal transition-colors hover:bg-ink hover:text-paper disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <motion.span
                      className="size-3.5 rounded-full border-2 border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending
                  </>
                ) : (
                  <>
                    {/* Send icon flies out and a new one flies in */}
                    <span className="relative flex size-4 items-center justify-center overflow-hidden" aria-hidden="true">
                      <Send size={14} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 group-hover:translate-x-4" />
                      <Send size={14} className="absolute -translate-x-4 translate-y-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                    </span>
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
