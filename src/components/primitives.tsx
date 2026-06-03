import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion';

/* ---------- Count-up number, triggered when scrolled into view ---------- */
export function CountUp({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className = '',
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Magnetic wrapper — element drifts toward the cursor ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [fine, reduced, strength]);

  return (
    <div ref={ref} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Section header — mono index + title + animated rule ---------- */
export function SectionHeader({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 h-px w-full origin-left bg-line"
      />
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span className="mono text-accent">{index}</span>
        <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          {title}
        </h2>
        {note && <span className="mono text-faint">{note}</span>}
      </div>
    </div>
  );
}

/* ---------- Reveal-on-scroll: rises + fades children once ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Typewriter hook — types a list of lines, char by char ---------- */
export type TypedLine = { text: string; className?: string; pause?: number };

export function useTypewriter(
  lines: TypedLine[],
  opts: { speed?: number; startDelay?: number; loop?: boolean; enabled?: boolean } = {},
) {
  const { speed = 26, startDelay = 200, loop = false, enabled = true } = opts;
  const [output, setOutput] = useState<{ text: string; className?: string }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOutput(lines.map((l) => ({ text: l.text, className: l.className })));
      setDone(true);
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setOutput([]);
    setDone(false);

    const run = async () => {
      await wait(startDelay);
      const acc: { text: string; className?: string }[] = [];
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];
        acc.push({ text: '', className: line.className });
        for (let c = 0; c <= line.text.length; c++) {
          if (cancelled) return;
          acc[i] = { text: line.text.slice(0, c), className: line.className };
          setOutput([...acc]);
          await wait(line.text[c] === ' ' ? speed * 0.5 : speed + Math.random() * 22);
        }
        await wait(line.pause ?? 180);
      }
      if (!cancelled) setDone(true);
      if (loop && !cancelled) {
        await wait(2200);
        if (!cancelled) run();
      }
    };

    function wait(ms: number) {
      return new Promise<void>((res) => {
        const t = setTimeout(res, ms);
        timers.push(t);
      });
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { output, done };
}
