import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, Reveal, useTypewriter } from './primitives';
import { RevealImage } from './RevealImage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PROJECTS, type Project } from '../lib/data';
import { scrollToId } from '../hooks/useLenis';

/** A browser/IDE frame whose source auto-types once it scrolls into view. */
function LiveFrame({ project, run }: { project: Project; run: boolean }) {
  const reduced = useReducedMotion();
  const { output, done } = useTypewriter(
    project.code.map((text) => ({ text, className: 'text-fg/90' })),
    { speed: 16, startDelay: 200, enabled: run && !reduced },
  );

  return (
    <div className="w-full overflow-hidden rounded-md border border-line bg-bg/95 shadow-2xl shadow-black/60 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-err/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
        <span className="ml-2 truncate font-mono text-[0.55rem] uppercase tracking-[0.14em] text-faint">
          {project.name.toLowerCase()} — source
        </span>
      </div>
      <div className="px-3 py-3 font-mono text-[0.64rem] leading-[1.7] sm:text-[0.72rem]">
        {(run ? output : project.code.map((text) => ({ text, className: 'text-fg/90' }))).map((l, i) => (
          <div key={i} className="flex">
            <span className="mr-3 w-3 select-none text-right text-faint/50">{i + 1}</span>
            <span className={`whitespace-pre-wrap ${l.className}`}>
              {l.text}
              {run && i === output.length - 1 && !done && <span className="caret" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Showcase({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const flip = i % 2 === 1;
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);
  const frameY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['12%', '-12%']);

  return (
    <div ref={ref} className="relative border-t border-line py-16 md:py-24">
      <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? 'lg:[direction:rtl]' : ''}`}>
        {/* visual */}
        <div ref={inViewRef} className="relative [direction:ltr]">
          <motion.span
            style={{ y: numY }}
            className="pointer-events-none absolute -top-10 right-2 z-0 font-display text-[8rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line)] sm:text-[11rem]"
            aria-hidden
          >
            {project.index}
          </motion.span>

          <a href={project.href} onClick={(e) => { e.preventDefault(); scrollToId(project.href); }} data-cursor="hover" data-cursor-label="view" className="proj-card relative z-[1] block">
            <RevealImage
              src={project.image}
              fallbackSeed={project.imageSeed}
              alt={`${project.name} — ${project.kind}`}
              className="aspect-[16/11] w-full rounded-lg border border-line bg-surface"
              parallax
              flat
              w={1400}
              h={963}
            />
          </a>

          {/* floating live code frame */}
          <motion.div
            style={{ y: frameY }}
            className="absolute -bottom-8 left-4 z-[2] w-[68%] max-w-[360px] sm:left-6"
          >
            <LiveFrame project={project} run={inView} />
          </motion.div>
        </div>

        {/* meta */}
        <div className="[direction:ltr]">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
              <span className="h-px w-7" style={{ background: project.accent }} />
              {project.kind} · {project.year}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="group mt-4 font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-fg to-fg bg-[length:0%_2px] bg-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {project.name}
              </span>
            </h3>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[46ch] text-muted">{project.description}</p>
          </Reveal>

          {/* metrics */}
          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-line bg-line">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg p-4">
                <div className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1.5 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <button
              onClick={() => scrollToId(project.href)}
              data-cursor
              data-cursor-label="open"
              className="group mt-8 inline-flex items-center gap-3 border-b border-fg pb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accent"
            >
              View case study
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
            </button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionHeader index="01" title="Selected Work" note="// three things I'm proud of" />
      {PROJECTS.map((p, i) => (
        <Showcase key={p.name} project={p} i={i} />
      ))}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-6 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
        <span>EOF — selected_work[]</span>
        <span>{PROJECTS.length} of many</span>
      </div>
    </section>
  );
}
