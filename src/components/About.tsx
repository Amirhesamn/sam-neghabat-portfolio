import { SectionHeader, Reveal, CountUp } from './primitives';
import { RevealImage } from './RevealImage';
import { IMAGES, PERSON } from '../lib/data';

const FACTS = [
  { k: 'Currently', v: 'Senior Frontend Engineer, Setflow' },
  { k: 'Focus', v: 'React · Next.js · TypeScript · Design systems' },
  { k: 'Philosophy', v: 'Make it correct, make it fast, make it kind.' },
  { k: 'Off-keyboard', v: 'Coffee, side projects, and too many browser tabs' },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeader index="02" title="About" note="// colophon of a career" />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* portrait */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <RevealImage
              src={IMAGES.portrait}
              fallbackSeed={IMAGES.portraitSeed}
              alt="Portrait of August Wren"
              className="aspect-[4/5] w-full"
              parallax
              w={1100}
              h={1375}
            />
            <div className="absolute -bottom-4 -left-4 hidden border border-line bg-bg px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted sm:block">
              <span className="text-accent">●</span> rendering: sam_neghabat.png
            </div>
            <div className="mt-3 flex justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
              <span>FIG. 02 — the developer</span>
              <span>ISO 400 · f/1.8</span>
            </div>
          </div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal>
            <p className="font-display text-[1.7rem] font-semibold leading-[1.18] tracking-tight sm:text-[2.4rem]">
              I build interfaces the way good editors build a page —
              <span className="text-accent"> with hierarchy, restraint,</span> and a stubborn belief
              that you should never see the machinery.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-[52ch] space-y-4 text-muted">
              <p>
                For six years I’ve shipped production-grade SaaS — from a media platform serving a
                thousand customers to a crypto wallet where a dropped session is a security incident,
                not a ticket. I work remotely with teams in Milan from my desk in Tehran, and I care
                about the parts users never name: the design system that made the team faster, the
                empty state that answered a question before it was asked.
              </p>
              <p>
                I came up through the front end — React, Next.js, and TypeScript — but I think in
                architecture: monorepos, micro-frontends, performance budgets, and accessibility as a
                default, not a patch. I write components like they’re going to be read aloud, and I
                treat <span className="text-fg">latency as a design material.</span>
              </p>
            </div>
          </Reveal>

          {/* facts */}
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {FACTS.map((f, i) => (
              <Reveal key={f.k} delay={0.05 * i}>
                <div className="h-full bg-bg p-5">
                  <div className="mono text-accent">{f.k}</div>
                  <div className="mt-2 text-sm text-fg">{f.v}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* stats */}
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {[
              { n: 6, s: '+', label: 'Years shipping' },
              { n: 1000, s: '+', label: 'Users reached' },
              { n: 30, s: '+', label: 'Components' },
              { n: 45, s: '%', label: 'Faster delivery' },
            ].map((st) => (
              <div key={st.label} className="bg-bg p-5">
                <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <CountUp to={st.n} />
                  <span className="text-accent">{st.s}</span>
                </div>
                <div className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <a
              href={`mailto:${PERSON.email}`}
              data-cursor
              data-cursor-label="email"
              className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-fg"
            >
              <span className="border-b border-accent pb-1">{PERSON.email}</span>
              <span className="text-accent">↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
