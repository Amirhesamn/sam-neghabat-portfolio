import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParticleField } from './ParticleField';
import { FloatingCode } from './FloatingCode';
import { Terminal } from './Terminal';
import { Magnetic } from './primitives';
import { scrollToId } from '../hooks/useLenis';
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion';
import { PERSON } from '../lib/data';

import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RISE: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1, ease: EASE, delay: 0.2 + i * 0.08 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yName = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // mouse parallax on the giant name
  const onMouseMove = (e: React.MouseEvent) => {
    if (!fine || reduced || !nameRef.current) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const nx = (e.clientX - cx) / cx;
    const ny = (e.clientY - cy) / cy;
    nameRef.current.style.transform = `translate(${nx * 18}px, ${ny * 12}px) rotateX(${-ny * 4}deg) rotateY(${nx * 4}deg)`;
  };
  const onLeave = () => {
    if (nameRef.current) nameRef.current.style.transform = '';
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-grid-lines"
    >
      <ParticleField className="absolute inset-0 z-0 h-full w-full opacity-70" />
      <FloatingCode />

      <motion.div
        style={{ y: yName, opacity, scale }}
        className="relative z-[2] mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-5 pt-24 pb-12 md:px-10"
      >
        {/* status row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ok shadow-[0_0_10px] shadow-ok" />
            {PERSON.available}
          </span>
          <span className="text-faint">/</span>
          <span>{PERSON.location}</span>
          <span className="text-faint">/</span>
          <span>Portfolio — Ed. 2026</span>
        </motion.div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          {/* name + role */}
          <div>
            <div
              ref={nameRef}
              style={{ perspective: 800, transformStyle: 'preserve-3d' }}
              className="transition-transform duration-300 ease-out [will-change:transform]"
            >
              <h1 className="font-display font-extrabold leading-[0.82] tracking-[-0.03em]">
                {[PERSON.first, PERSON.last].map((word, wi) => (
                  <span key={word} className="block overflow-hidden">
                    <motion.span
                      custom={wi}
                      variants={RISE}
                      initial="hidden"
                      animate="show"
                      className="inline-block text-[clamp(3.2rem,13vw,11rem)]"
                    >
                      {word}
                      {wi === 1 && <span className="text-accent">.</span>}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 overflow-hidden">
              <motion.span
                variants={RISE}
                custom={3}
                initial="hidden"
                animate="show"
                className="inline-block font-mono text-sm uppercase tracking-[0.32em] text-fg sm:text-base"
              >
                Full&nbsp;Stack <span className="text-accent">/</span> Developer
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-6 max-w-[42ch] text-lg text-muted sm:text-xl"
            >
              {PERSON.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.4}>
                <button
                  onClick={() => scrollToId('#work')}
                  data-cursor
                  data-cursor-label="explore"
                  className="group flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-bg transition-shadow hover:shadow-[0_0_30px_-4px_rgba(198,242,78,0.6)]"
                >
                  View the work
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </button>
              </Magnetic>
              <Magnetic strength={0.4}>
                <button
                  onClick={() => scrollToId('#contact')}
                  data-cursor
                  className="border border-line px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Start a conversation
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Terminal />
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-faint">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          {!reduced && (
            <span className="absolute left-0 top-0 h-1/2 w-full animate-[scan-move_1.8s_var(--ease-io)_infinite] bg-accent" />
          )}
        </span>
      </motion.div>
    </section>
  );
}
