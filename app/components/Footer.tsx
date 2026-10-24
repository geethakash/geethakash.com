import { ArrowUp } from "lucide-react";
import { profile, siteRevision } from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 font-mono text-xs uppercase tracking-[0.08em] text-ink-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © {year} {profile.name}
        </p>
        <p>Datasheet rev. {siteRevision} · Built with Next.js, GSAP and Framer Motion</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
          Back to top
          <ArrowUp size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
