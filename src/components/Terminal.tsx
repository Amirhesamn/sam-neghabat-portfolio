import { useTypewriter, type TypedLine } from './primitives';
import { useReducedMotion } from '../hooks/useReducedMotion';

const LINES: TypedLine[] = [
  { text: '$ whoami', className: 'text-fg', pause: 260 },
  { text: 'sam_neghabat — senior frontend engineer · 6+ yrs', className: 'text-muted', pause: 220 },
  { text: '$ cat ./philosophy.txt', className: 'text-fg', pause: 260 },
  { text: '"correct, then fast, then kind — in that order."', className: 'text-str', pause: 240 },
  { text: '$ npm run build && deploy --prod', className: 'text-fg', pause: 200 },
  { text: '› vite build ............ 1.1MB', className: 'text-ok', pause: 90 },
  { text: '› 412 tests, 0 regressions ok', className: 'text-ok', pause: 90 },
  { text: '› lighthouse 98 / a11y 100 . ok', className: 'text-ok', pause: 160 },
  { text: '✓ shipped. ready when you are.', className: 'text-accent', pause: 600 },
];

/** Faux developer terminal that types real-looking commands and output. */
export function Terminal() {
  const reduced = useReducedMotion();
  const { output, done } = useTypewriter(LINES, { speed: 18, startDelay: 1100, enabled: !reduced });

  return (
    <div
      data-cursor="text"
      className="w-full overflow-hidden rounded-lg border border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-sm"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border border-line bg-err/80" />
        <span className="h-3 w-3 rounded-full border border-line bg-warn/80" />
        <span className="h-3 w-3 rounded-full border border-line bg-ok/80" />
        <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
          august@wren — zsh — 80×24
        </span>
      </div>
      {/* body */}
      <div className="min-h-[228px] px-4 py-3 font-mono text-[0.72rem] leading-[1.85] sm:text-[0.82rem]">
        {output.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap ${l.className ?? 'text-fg'}`}>
            {l.text}
            {i === output.length - 1 && !done && <span className="caret" />}
          </div>
        ))}
        {done && (
          <div className="text-fg">
            $ <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}
