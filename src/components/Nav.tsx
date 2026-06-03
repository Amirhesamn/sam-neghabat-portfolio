import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToId } from '../hooks/useLenis';
import { PERSON } from '../lib/data';
import type Lenis from 'lenis';

const LINKS = [
  { id: '#work', label: 'Work', idx: '01' },
  { id: '#about', label: 'About', idx: '02' },
  { id: '#stack', label: 'Stack', idx: '03' },
  { id: '#path', label: 'Path', idx: '04' },
  { id: '#contact', label: 'Contact', idx: '05' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [clock, setClock] = useState('');

  // hide-on-scroll-down + solid background
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 360 && !open);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // scroll-spy: mark the section currently in view for aria-current + highlight
  useEffect(() => {
    const ids = LINKS.map((l) => l.id.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // live clock
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Tehran',
        }),
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // lock scroll + Escape to close when the mobile menu is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      {/* skip link for keyboard users */}
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          go('#work');
        }}
        className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg ${focusRing}`}
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[1200] transition-colors duration-500 ${
          solid || open ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          {/* brand */}
          <button
            onClick={() => go('#top')}
            data-cursor
            data-cursor-label="top"
            aria-label="Sam Neghabat — back to top"
            className={`group flex items-center gap-2.5 rounded font-mono text-[0.95rem] font-bold tracking-tight ${focusRing}`}
          >
            <span className="inline-block h-2.5 w-2.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-accent" />
            <span className="text-fg">SAM NEGHABAT</span>
            <span className="text-faint transition-colors group-hover:text-accent">_</span>
          </button>

          {/* desktop links — enlarged with clear hit areas + active state */}
          <ul className="hidden items-center gap-3 md:flex">
            {LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    data-cursor
                    aria-current={on ? 'true' : undefined}
                    className={`group relative flex items-center gap-1.5 rounded px-3 py-3 font-mono text-[0.8rem] uppercase tracking-[0.12em] transition-colors ${focusRing} ${
                      on ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    <span className={on ? 'text-accent' : 'text-accent/60'}>{l.idx}</span>
                    {l.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${
                        on ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* right cluster */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              <span className="tnum">{clock}</span> Tehran
            </span>
            <button
              onClick={() => go('#contact')}
              data-cursor
              data-cursor-label="say hi"
              className={`hidden items-center gap-2 bg-accent px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bg transition-shadow hover:shadow-[0_0_24px_-4px_rgba(198,242,78,0.6)] md:inline-flex ${focusRing}`}
            >
              Let’s talk
            </button>

            {/* hamburger (mobile) — 48px target */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-cursor
              className={`flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded border border-line md:hidden ${focusRing}`}
            >
              <span className={`h-px w-5 bg-fg transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`h-px w-5 bg-fg transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`h-px w-5 bg-fg transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1150] flex flex-col bg-bg/97 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className={`flex w-full items-baseline gap-4 border-b border-line py-5 text-left ${focusRing}`}
                  >
                    <span className="font-mono text-sm text-accent">{l.idx}</span>
                    <span className="font-display text-4xl font-extrabold tracking-tight text-fg">{l.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto space-y-4">
              <a
                href={`mailto:${PERSON.email}`}
                className={`block font-mono text-sm text-muted ${focusRing}`}
              >
                {PERSON.email}
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {PERSON.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint ${focusRing}`}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
