import { STACK_MARQUEE } from '../lib/data';

/** Infinite phosphor marquee of the stack — pauses on hover. */
export function Marquee() {
  const items = [...STACK_MARQUEE, ...STACK_MARQUEE];
  return (
    <div className="group relative flex overflow-hidden border-y border-line bg-surface/40 py-5 select-none">
      <div className="flex shrink-0 animate-[marquee_36s_linear_infinite] items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-3xl font-extrabold tracking-tight sm:text-5xl ${
                i % 2 ? 'text-fg' : 'text-transparent [-webkit-text-stroke:1px_var(--color-muted)]'
              }`}
            >
              {t}
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
