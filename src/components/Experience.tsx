import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { SectionHeader } from './primitives';
import { EXPERIENCE, type Role } from '../lib/data';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Number that re-animates from its previous value whenever the target changes. */
function AnimatedNumber({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();
  const prev = useRef(value);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduced]);

  return (
    <span className="tnum">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function RoleEntry({ role, i, onActive }: { role: Role; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <div ref={ref} className="relative min-h-[58vh] py-10 pl-8 sm:pl-12">
      {/* rail + dot */}
      <span className="absolute left-0 top-0 h-full w-px bg-line" />
      <motion.span
        className="absolute left-0 top-16 h-3 w-3 -translate-x-[5px] rounded-full border-2"
        style={{ borderColor: role.mood, background: 'var(--color-bg)' }}
        animate={{ scale: inView ? 1.4 : 1, boxShadow: inView ? `0 0 16px ${role.mood}` : '0 0 0px transparent' }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        animate={{ opacity: inView ? 1 : 0.4, x: inView ? 0 : -4 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: role.mood }}>
          {role.when}
        </div>
        <h3 className="mt-3 font-display text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
          {role.role}
        </h3>
        <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {role.company} · {role.place}
        </div>
        <p className="mt-4 max-w-[44ch] text-muted">{role.blurb}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {role.stack.map((t) => (
            <span key={t} className="border border-line px-2 py-1 font-mono text-[0.54rem] uppercase tracking-[0.1em] text-muted">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const [active, setActive] = useState(0);
  const role = EXPERIENCE[active];

  return (
    <section id="path" className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      {/* mood glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[60vh] w-[60vh] rounded-full opacity-[0.07] blur-[120px]"
        animate={{ backgroundColor: role.mood }}
        transition={{ duration: 0.8 }}
      />

      <SectionHeader index="04" title="The Path" note="// where the hours went" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* sticky reactive monitor */}
        <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
          <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-line bg-err/70" />
                <span className="h-3 w-3 rounded-full border border-line bg-warn/70" />
                <span className="h-3 w-3 rounded-full border border-line bg-ok/70" />
              </div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
                era://{role.company.toLowerCase().replace(/[^a-z]/g, '')}
              </span>
            </div>

            <div className="p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em]" style={{ color: role.mood }}>
                {role.when}
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold tracking-tight">{role.company}</div>
              <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{role.role}</div>

              {/* era stats */}
              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded border border-line bg-line">
                {role.stats.map((s) => (
                  <div key={s.label} className="bg-bg p-3">
                    <div className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: role.mood }}>
                      <AnimatedNumber value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} />
                    </div>
                    <div className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* streaming era log */}
              <div className="mt-5 space-y-1 rounded border border-line bg-bg/60 p-3 font-mono text-[0.6rem] leading-relaxed">
                {role.log.map((line, k) => (
                  <motion.div
                    key={`${active}-${k}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: k * 0.08 }}
                    className="text-muted"
                  >
                    <span style={{ color: role.mood }}>›</span> {line}
                  </motion.div>
                ))}
                <div className="flex items-center gap-1 text-faint">
                  <span style={{ color: role.mood }}>$</span>
                  <span className="caret" style={{ background: role.mood }} />
                </div>
              </div>
            </div>
          </div>

          {/* progress pips */}
          <div className="mt-4 flex items-center gap-2">
            {EXPERIENCE.map((_, i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{ background: i === active ? role.mood : 'var(--color-line)' }}
              />
            ))}
          </div>
        </div>

        {/* scrolling roles */}
        <div>
          {EXPERIENCE.map((r, i) => (
            <RoleEntry key={r.company} role={r} i={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
