"use client";

import Image from "next/image";
import { Reveal, Section } from "../components/ui";
import { profile } from "../lib/content";

function CropMarks() {
  const mark = "absolute size-4 border-ink";
  return (
    <span aria-hidden="true">
      <span className={`${mark} -left-2 -top-2 border-l border-t`} />
      <span className={`${mark} -right-2 -top-2 border-r border-t`} />
      <span className={`${mark} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${mark} -bottom-2 -right-2 border-b border-r`} />
    </span>
  );
}

export default function AboutSection() {
  return (
    <Section id="about" index={3} term="Description" title="About">
      <div className="grid gap-12 lg:grid-cols-9 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <figure className="flex flex-col gap-3">
            <div className="relative mx-2 mt-2">
              <Image
                src="/assets/img/profile-image.jpg"
                alt="Portrait of Akash Geethanjana"
                width={1984}
                height={1984}
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 60vw, 100vw"
                className="aspect-square w-full object-cover"
              />
              <CropMarks />
            </div>
            <figcaption className="label mx-2 mt-2">
              Fig. 3 · {profile.name}, {profile.location}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="flex flex-col gap-6 text-lg leading-relaxed text-ink-2 lg:col-span-5" delay={0.08}>
          <p className="text-2xl leading-snug text-ink">
            I started programming in 2019 with C#, writing command-line tools and Windows Forms apps.
            That was the first time I saw software solve a real problem for someone.
          </p>
          <p>
            Then came the web. I worked on the frontend of Vidusaviya, an education management
            system, and during COVID-19 I built TecLMS so my classmates could share study material
            safely. In 2021 I co-founded Bitzquad and spent three years shipping products for
            clients. In 2025 I joined promiseQ, building the cloud interface for their edge-AI devices.
          </p>
          <p>
            The work I enjoy most is where software meets hardware. I like wiring up microcontrollers
            and sensors, then building the dashboard that makes them useful to people. Premise Edge,
            my university project, came out of that.
          </p>

          <dl className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            <div className="flex flex-col gap-1 bg-paper p-4">
              <dt className="label">Education</dt>
              <dd className="text-base leading-snug text-ink">
                BICT (Hons), Faculty of Computing and Technology, University of Kelaniya
              </dd>
            </div>
            <div className="flex flex-col gap-1 bg-paper p-4">
              <dt className="label">Looking for</dt>
              <dd className="text-base leading-snug text-ink">
                Remote roles and frontend, full-stack or IoT projects
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
