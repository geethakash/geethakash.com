"use client";

import { Fragment } from "react";
import { ExternalLink, Reveal, Section, TagList } from "../components/ui";
import { featuredProjects, moreProjects, premiseEdge } from "../lib/content";

/** Device-to-dashboard diagram with packets moving both ways along each link. */
function SignalFlow() {
  const { flow, links } = premiseEdge;

  return (
    <div className="flex flex-col md:flex-row md:items-stretch">
      {flow.map((node, i) => (
        <Fragment key={node.name}>
          <div className="flex min-w-0 flex-col gap-1 border border-rule-strong bg-paper p-4 md:flex-1">
            <span className="label">{node.tag}</span>
            <span className="font-semibold leading-tight">{node.name}</span>
            <span className="text-sm text-ink-3">{node.note}</span>
          </div>
          {i < links.length && (
            <div className="relative flex h-16 shrink-0 items-center justify-center md:h-auto md:w-24">
              <div className="absolute bottom-0 left-1/2 top-0 w-px bg-rule-strong md:bottom-auto md:left-0 md:right-0 md:top-1/2 md:h-px md:w-auto">
                <span
                  className="packet max-md:left-[-2.5px] md:top-[-2.5px]"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
                <span
                  className="packet is-return max-md:left-[-2.5px] md:top-[-2.5px]"
                  style={{ animationDelay: `${i * 0.5 + 1.2}s` }}
                />
              </div>
              <span className="label relative z-10 bg-panel px-1.5 py-0.5">{links[i]}</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function WorkSection() {
  return (
    <Section
      id="work"
      index={1}
      term="Applications"
      title="Selected work"
      intro="Products I've designed and built, from IoT systems to business software."
    >
      <div className="flex flex-col gap-6">
        {/* Lead project */}
        <Reveal>
          <article className="border border-rule bg-panel p-5 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="label">{premiseEdge.kind}</p>
              <p className="label tabular-nums">{premiseEdge.year}</p>
            </div>
            <h3 className="display mt-4 text-4xl [--wdth:112] md:text-5xl">{premiseEdge.name}</h3>
            <p className="mt-4 max-w-[62ch] text-lg text-ink-2">{premiseEdge.summary}</p>

            <figure className="mt-8 flex flex-col gap-3">
              <SignalFlow />
              <figcaption className="label">
                Fig. 2 · Signal flow. Telemetry travels to the dashboard and commands travel back.
              </figcaption>
            </figure>

            <TagList items={premiseEdge.stack} className="mt-8" />
          </article>
        </Reveal>

        {/* Featured pair */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} className="flex">
              <article className="flex w-full flex-col border border-rule p-5 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="label">{project.kind}</p>
                  <p className="label tabular-nums">{project.year}</p>
                </div>
                <h3 className="display mt-4 text-3xl [--wdth:112] md:text-4xl">{project.name}</h3>
                <p className="mt-4 text-ink-2">{project.summary}</p>

                <p className="label mt-6">{project.itemsLabel}</p>
                <ul className="mt-3 flex flex-col border-t border-rule">
                  {project.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 border-b border-rule py-2.5 text-[0.95rem]">
                      <span className="size-1.5 shrink-0 translate-y-[-0.15em] bg-signal-ink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <TagList items={project.stack} />
                  {project.link && <ExternalLink href={project.link.href}>{project.link.label}</ExternalLink>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Index of other work */}
        <Reveal className="mt-10">
          <h3 className="label">More projects</h3>
          <ul className="mt-4 border-t border-rule">
            {moreProjects.map((project) => (
              <li
                key={project.name}
                className="grid gap-x-6 gap-y-2 border-b border-rule py-6 md:grid-cols-[3.5rem_11rem_minmax(0,1fr)_7rem] md:items-baseline"
              >
                <span className="label tabular-nums">{project.year}</span>
                <h4 className="text-lg font-semibold leading-tight">{project.name}</h4>
                <div className="min-w-0">
                  <p className="text-ink-2">{project.summary}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-ink-3">
                    {project.stack.join(" · ")}
                  </p>
                </div>
                <div className="md:text-right">
                  {project.link && <ExternalLink href={project.link.href}>{project.link.label}</ExternalLink>}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
