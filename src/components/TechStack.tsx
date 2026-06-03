import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeader } from './primitives';
import { CodeTokens } from './Code';
import { OrbitGraph } from './OrbitGraph';
import { SKILLS } from '../lib/data';
import { useReducedMotion } from '../hooks/useReducedMotion';

const META: Record<string, { file: string; cat: string; short: string; related: string[] }> = {
  react: { file: 'use-presence.tsx', cat: 'Frontend · UI', short: 'React', related: ['JSX', 'Hooks', 'Suspense', 'RSC'] },
  next: { file: 'app/page.tsx', cat: 'Framework · SSR/ISR', short: 'Next', related: ['App Router', 'ISR', 'Edge', 'Route'] },
  ts: { file: 'result.ts', cat: 'Language · Types', short: 'TS', related: ['Generics', 'Zod', 'tsc', 'ESLint'] },
  tw: { file: 'button.tsx', cat: 'Styling · Systems', short: 'TW', related: ['Shadcn', 'Tokens', 'Variants', 'JIT'] },
  rq: { file: 'use-assets.ts', cat: 'Data · State', short: 'Query', related: ['Cache', 'Mutations', 'Zustand', 'SWR'] },
  node: { file: 'timing.ts', cat: 'Runtime · API', short: 'Node', related: ['BFF', 'REST', 'npm', 'V8'] },
  graphql: { file: 'schema.graphql', cat: 'API · Schema', short: 'GQL', related: ['Resolver', 'Codegen', 'Apollo', 'SDL'] },
  test: { file: 'swap.test.tsx', cat: 'Quality · CI', short: 'Tests', related: ['Vitest', 'Playwright', 'RTL', 'Cypress'] },
};

export function TechStack() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // auto-cycle until the user interacts
  useEffect(() => {
    if (locked || reduced) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % SKILLS.length), 3200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [locked, reduced]);

  const skill = SKILLS[active];
  const meta = META[skill.key];

  return (
    <section id="stack" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeader index="03" title="The Stack" note="// hover to inspect — the monitor rewrites itself" />

      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        {/* skill list */}
        <div
          onMouseEnter={() => setLocked(true)}
          onMouseLeave={() => setLocked(false)}
          className="flex flex-col"
        >
          {SKILLS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor
                className="skill-chip group relative grid grid-cols-[2.2rem_1fr_auto] items-center gap-4 border-t border-line py-4 text-left last:border-b"
              >
                <span className={`font-mono text-xs ${on ? 'text-accent' : 'text-faint'}`}>
                  0{i + 1}
                </span>
                <span className="flex items-baseline gap-3 overflow-hidden">
                  <span
                    className={`font-display text-2xl font-extrabold tracking-tight transition-all duration-300 sm:text-[2rem] ${
                      on ? 'text-accent translate-x-1' : 'text-fg'
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted sm:inline">
                    {meta && META[s.key].cat}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden font-mono text-[0.62rem] text-muted tnum sm:inline">
                    {s.level}%
                  </span>
                  <span className="relative h-px w-16 bg-line">
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-accent"
                      animate={{ width: on ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                </span>
              </button>
            );
          })}
          <p className="mt-6 max-w-[40ch] font-mono text-[0.68rem] leading-relaxed text-muted">
            <span className="text-accent">{'// '}</span>
            {skill.blurb}
          </p>
        </div>

        {/* monitor + dependency orbit */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/50">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-line bg-err/70" />
                <span className="h-3 w-3 rounded-full border border-line bg-warn/70" />
                <span className="h-3 w-3 rounded-full border border-line bg-ok/70" />
              </div>
              <div className="flex items-center gap-2 rounded border border-line bg-bg px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={meta.file}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[0.62rem] tracking-tight text-muted"
                  >
                    {meta.file}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">
                ide — main
              </span>
            </div>

            {/* code body */}
            <div className="relative min-h-[230px] bg-surface px-4 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* stagger each line in for a "retyping" feel */}
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                  >
                    {skill.snippet.map((line, li) => (
                      <motion.div
                        key={li}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <CodeTokens lines={[line]} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* status footer with proficiency bar */}
            <div className="flex items-center gap-4 border-t border-line bg-bg px-4 py-3">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ok">
                ✓ compiled
              </span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  animate={{ width: `${skill.level}%` }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                />
              </div>
              <span className="font-mono text-[0.62rem] text-fg tnum">
                {skill.level}% · {skill.years}y
              </span>
            </div>
          </div>

          {/* dependency orbit */}
          <div className="grid items-center gap-4 rounded-lg border border-line bg-surface/50 p-4 sm:grid-cols-[1fr_220px]">
            <div>
              <div className="mono text-faint">Dependency graph</div>
              <div className="mt-2 font-display text-xl font-bold">{skill.name}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {meta.related.map((r) => (
                  <span
                    key={r}
                    className="border border-line px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="mx-auto h-[200px] w-[200px]">
              <OrbitGraph center={meta.short} nodes={meta.related} color="var(--color-accent)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
