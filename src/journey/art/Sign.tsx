// Roadside sign (تابلو) — base at y = 0, board on top. Shows date + age.
export function Sign({ date, age, accent = '#e08a5b' }: { date: string; age: string; accent?: string }) {
  return (
    <g>
      {/* posts */}
      <rect x={-30} y={-96} width={7} height={96} rx={3} fill="#b08968" />
      <rect x={23} y={-96} width={7} height={96} rx={3} fill="#b08968" />
      {/* board */}
      <rect x={-58} y={-160} width={116} height={74} rx={12} fill="#fff8ec" stroke="rgba(90,74,57,0.2)" strokeWidth={2} />
      <rect x={-58} y={-160} width={116} height={20} rx={12} fill={accent} opacity={0.9} />
      <rect x={-58} y={-150} width={116} height={10} fill={accent} opacity={0.9} />
      <text x={0} y={-110} textAnchor="middle" style={{ fontFamily: 'var(--round)', fontSize: 26, fill: '#5a4a39' }}>
        {date}
      </text>
      <text x={0} y={-92} textAnchor="middle" style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 12, fill: accent }}>
        {age}
      </text>
      {/* little pennant */}
      <line x1={26} y1={-160} x2={26} y2={-178} stroke="#b08968" strokeWidth={3} />
      <path d="M26 -178 l18 5 l-18 6 z" fill={accent} />
    </g>
  );
}
