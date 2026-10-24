"use client";

import { Reveal, Section, TagList } from "../components/ui";
import { milestones, roles } from "../lib/content";

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      index={2}
      term="Revision history"
      title="Experience"
      intro="Roles first, then the milestones that got me there."
    >
      <div className="hidden grid-cols-[11rem_minmax(0,1fr)] gap-8 border-b border-rule-strong pb-3 md:grid" aria-hidden="true">
        <span className="label">Date</span>
        <span className="label">Revision</span>
      </div>

      <ol className="flex flex-col">
        {roles.map((role) => (
          <li key={role.org} className="border-b border-rule py-10 first:pt-8">
            <Reveal className="grid gap-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
              <div className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1 md:flex-col">
                <span className="font-mono text-sm tabular-nums">{role.period}</span>
                <span className="label">{role.mode}</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">
                  {role.org}
                </h3>
                <p className="mt-1 font-mono text-sm text-signal-ink">{role.role}</p>
                <p className="mt-5 max-w-[64ch] text-ink-2">{role.summary}</p>
                <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-baseline gap-3 text-[0.95rem]">
                      <span className="size-1.5 shrink-0 translate-y-[-0.15em] bg-signal-ink" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <TagList items={role.stack} className="mt-7" />
              </div>
            </Reveal>
          </li>
        ))}

        {milestones.map((m) => (
          <li key={m.year} className="border-b border-rule py-6">
            <Reveal className="grid gap-2 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
              <span className="font-mono text-sm tabular-nums">{m.year}</span>
              <div className="min-w-0">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-1 text-ink-2">{m.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
