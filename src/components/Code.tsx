import type { Skill } from '../lib/data';

export const TOKEN_COLORS: Record<string, string> = {
  kw: 'var(--color-info)', // keyword
  fn: 'var(--color-accent)', // function
  str: 'var(--color-str)', // string
  num: 'var(--color-warn)', // number
  cm: 'var(--color-faint)', // comment
  op: 'var(--color-muted)', // operator
  ty: '#86e1c9', // type
  pl: 'var(--color-fg)', // plain
};

type Token = Skill['snippet'][number][number];

/** Renders a 2-D token array (lines × tokens) as syntax-highlighted mono text. */
export function CodeTokens({ lines }: { lines: Token[][] }) {
  return (
    <code className="block font-mono text-[0.72rem] leading-[1.7] sm:text-[0.8rem]">
      {lines.map((line, i) => (
        <span key={i} className="flex">
          <span className="mr-4 w-4 shrink-0 select-none text-right text-faint/60">{i + 1}</span>
          <span className="whitespace-pre-wrap">
            {line.map((tok, j) => (
              <span key={j} style={{ color: tok.c ? TOKEN_COLORS[tok.c] : 'var(--color-fg)' }}>
                {tok.t}
              </span>
            ))}
          </span>
        </span>
      ))}
    </code>
  );
}
