import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion';

const FRAGMENTS = [
  { code: 'const ship = async () => await deploy()', top: '16%', left: '6%', depth: 30, delay: 0 },
  { code: 'type Latency = `${number}ms`', top: '28%', left: '74%', depth: 50, delay: 0.4 },
  { code: 'redis.subscribe("presence:*")', top: '62%', left: '9%', depth: 40, delay: 0.8 },
  { code: '/* 99.99% uptime */', top: '72%', left: '68%', depth: 24, delay: 1.1 },
  { code: 'SELECT now() - last_seen', top: '44%', left: '82%', depth: 60, delay: 0.6 },
  { code: 'docker compose up -d --build', top: '84%', left: '40%', depth: 36, delay: 1.4 },
  { code: 'k8s.rollout({ strategy: "canary" })', top: '8%', left: '44%', depth: 44, delay: 0.2 },
];

/** Drifting code fragments with depth-based mouse parallax behind the hero. */
export function FloatingCode() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return;
    const layer = ref.current;
    if (!layer) return;
    const items = Array.from(layer.children) as HTMLElement[];
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      items.forEach((el) => {
        const depth = Number(el.dataset.depth || 30);
        el.style.transform = `translate(${-nx * depth}px, ${-ny * depth}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [fine, reduced]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {FRAGMENTS.map((f, i) => (
        <motion.div
          key={i}
          data-depth={f.depth}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1 + f.delay }}
          style={{ top: f.top, left: f.left }}
          className="absolute transition-transform duration-300 ease-out"
        >
          <span
            className="font-mono text-[0.62rem] tracking-tight text-faint sm:text-xs"
            style={{ animation: reduced ? undefined : `float-y ${6 + (i % 4)}s ease-in-out ${f.delay}s infinite` }}
          >
            {f.code}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
