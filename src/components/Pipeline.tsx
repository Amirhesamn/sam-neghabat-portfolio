import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const STAGES = [
  { key: 'checkout', label: 'checkout', detail: 'git fetch origin main' },
  { key: 'install', label: 'install', detail: 'npm ci — 412 packages' },
  { key: 'build', label: 'build', detail: 'vite build → dist/ (1.1MB)' },
  { key: 'test', label: 'test', detail: '412 passed · 0 failed' },
  { key: 'deploy', label: 'deploy', detail: 'blue-green rollout' },
  { key: 'live', label: 'live', detail: 'https://samneghabat.com · 200 OK' },
];

/** Scroll-scrubbed CI pipeline: stages light up and logs stream as you scroll through. */
export function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(-1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const barWidth = useTransform(scrollYProgress, [0.05, 0.92], ['0%', '100%']);
  const pct = useTransform(scrollYProgress, [0.05, 0.92], [0, 100]);
  const [pctText, setPctText] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = Math.min(STAGES.length - 1, Math.max(-1, Math.floor((p - 0.05) / 0.87 * STAGES.length)));
    setStage(idx);
  });
  useMotionValueEvent(pct, 'change', (v) => setPctText(Math.round(v)));

  const finished = stage >= STAGES.length - 1;

  return (
    <section ref={ref} className="relative h-[230vh] bg-bg" aria-label="Continuous deployment">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-grid">
        {/* big ghost word */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[24vw] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line)]"
        >
          {finished ? 'SHIPPED' : 'DEPLOY'}
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1300px] px-5 md:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mono text-accent">./ci — continuous deployment</div>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                Push to <span className="text-accent">production</span>
              </h2>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl font-extrabold tabular-nums sm:text-7xl">
                {pctText}
                <span className="text-accent">%</span>
              </div>
              <div className="mono text-faint">{finished ? 'deployed' : 'pipeline running'}</div>
            </div>
          </div>

          {/* progress rail */}
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-line">
            <motion.div style={{ width: barWidth }} className="absolute inset-y-0 left-0 rounded-full bg-accent" />
          </div>

          {/* stages */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STAGES.map((s, i) => {
              const on = i <= stage;
              const current = i === stage && !finished;
              return (
                <div
                  key={s.key}
                  className={`relative rounded-md border p-4 transition-colors duration-300 ${
                    on ? 'border-accent/50 bg-accent-deep/40' : 'border-line bg-surface/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.5rem] text-faint">0{i + 1}</span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.5rem] ${
                        on ? 'bg-accent text-bg' : 'border border-line text-faint'
                      }`}
                    >
                      {on ? '✓' : ''}
                      {current && (
                        <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
                      )}
                    </span>
                  </div>
                  <div className={`mt-3 font-mono text-xs uppercase tracking-[0.12em] ${on ? 'text-fg' : 'text-muted'}`}>
                    {s.label}
                  </div>
                  <div className="mt-1 font-mono text-[0.54rem] leading-snug text-faint">{s.detail}</div>
                </div>
              );
            })}
          </div>

          {/* streaming log */}
          <div className="mt-8 h-24 overflow-hidden rounded-md border border-line bg-surface/60 p-3 font-mono text-[0.62rem] leading-relaxed">
            {STAGES.slice(0, stage + 1).map((s) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-muted"
              >
                <span className="text-ok">›</span> {s.detail}
                <span className="text-ok"> ok</span>
              </motion.div>
            ))}
            {finished && <div className="text-accent">✓ deployed in 840ms — ready when you are.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
