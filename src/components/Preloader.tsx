import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const BOOT = [
  'initializing portfolio.kernel',
  'mounting /august/wren',
  'loading fonts · bricolage · jetbrains',
  'warming up animations',
  'compiling experience ████████',
];

/** Short boot sequence that compiles a progress bar, then lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      const t = setTimeout(onDone, 200);
      return () => clearTimeout(t);
    }
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      setPct(p);
      setLine(Math.min(BOOT.length - 1, Math.floor((p / 100) * BOOT.length)));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
        setTimeout(onDone, 1100);
      }
    }, 230);
    return () => clearInterval(id);
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
        >
          <div className="w-[min(420px,80vw)]">
            <div className="mb-4 flex items-end justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                august_wren<span className="text-accent">.dev</span>
              </span>
              <span className="font-display text-4xl font-extrabold tabular-nums text-fg">
                {Math.round(pct)}<span className="text-accent">%</span>
              </span>
            </div>
            <div className="h-[3px] w-full overflow-hidden bg-line">
              <motion.div className="h-full bg-accent" animate={{ width: `${pct}%` }} transition={{ ease: 'easeOut' }} />
            </div>
            <div className="mt-4 h-4 font-mono text-[0.62rem] text-faint">
              <span className="text-accent">›</span> {BOOT[line]}
              <span className="caret ml-1" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
