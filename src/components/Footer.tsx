import { scrollToId } from '../hooks/useLenis';
import { PERSON } from '../lib/data';

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1600px] px-5 pb-10 md:px-10">
      <a
        href="/journey.html"
        data-cursor
        data-cursor-label="walk"
        className="group mb-8 flex flex-col gap-3 rounded-lg border border-line bg-surface/40 px-6 py-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">↳</span> My Journey — an interactive side-story of how I got here, from day one to today
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg">
          Take the walk
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
        </span>
      </a>
      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
          © 2026 {PERSON.name} — <span className="text-muted">built from scratch, no templates harmed</span>
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
          Bricolage&nbsp;Grotesque · Hanken&nbsp;Grotesk · <span className="text-muted">JetBrains&nbsp;Mono</span>
        </span>
        <button
          onClick={() => scrollToId('#top')}
          data-cursor
          data-cursor-label="top"
          className="group flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>
      </div>
      <div className="mt-6 select-none font-mono text-[10px] leading-none text-line" aria-hidden>
        {'> EOF — thanks for scrolling. now go build something. _'}
      </div>
    </footer>
  );
}
