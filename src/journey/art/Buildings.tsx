import type { StationType } from '../journey-data';

// All buildings draw with their base at y = 0, extending upward (negative y).
// `color` is the station's soft accent; `label`/`subtitle` print on a facade plate.

function Plate({ label, subtitle, y = -150, w = 150 }: { label: string; subtitle?: string; y?: number; w?: number }) {
  return (
    <g>
      <rect x={-w / 2} y={y} width={w} height={subtitle ? 46 : 34} rx={9} fill="#fff8ec" stroke="rgba(90,74,57,0.18)" />
      <text x={0} y={y + 22} textAnchor="middle" style={{ fontFamily: 'var(--round)', fontSize: 17, fill: '#5a4a39' }}>
        {label}
      </text>
      {subtitle && (
        <text x={0} y={y + 38} textAnchor="middle" style={{ fontFamily: 'var(--body)', fontWeight: 600, fontSize: 10.5, fill: '#9b8b76' }}>
          {subtitle}
        </text>
      )}
    </g>
  );
}

function Win({ x, y, c = '#cfe7f2' }: { x: number; y: number; c?: string }) {
  return <rect x={x} y={y} width={26} height={30} rx={4} fill={c} stroke="rgba(90,74,57,0.12)" />;
}

function Hospital({ color, label, subtitle }: B) {
  return (
    <g>
      <rect x={-118} y={-228} width={236} height={228} rx={12} fill="#fffdf8" stroke="rgba(90,74,57,0.1)" />
      <rect x={-118} y={-228} width={236} height={26} rx={12} fill={color} />
      {/* red cross */}
      <g transform="translate(0,-260)">
        <rect x={-9} y={-26} width={18} height={52} rx={4} fill="#e8675c" />
        <rect x={-26} y={-9} width={52} height={18} rx={4} fill="#e8675c" />
      </g>
      <Win x={-92} y={-180} />
      <Win x={-46} y={-180} />
      <Win x={66} y={-180} />
      <Win x={20} y={-180} />
      {/* entrance */}
      <rect x={-30} y={-70} width={60} height={70} rx={8} fill={color} opacity={0.25} />
      <rect x={-26} y={-66} width={52} height={66} rx={6} fill="#fff8ec" />
      <line x1={0} y1={-66} x2={0} y2={0} stroke="rgba(90,74,57,0.18)" />
      <Plate label={label} subtitle={subtitle} y={-150} w={150} />
    </g>
  );
}

function Kindergarten({ color, label, subtitle }: B) {
  return (
    <g>
      <rect x={-100} y={-150} width={200} height={150} rx={14} fill="#fff6ea" stroke="rgba(90,74,57,0.1)" />
      <polygon points="-116,-150 0,-216 116,-150" fill={color} />
      {/* bunting */}
      <path d="M-100 -158 Q0 -132 100 -158" stroke="rgba(90,74,57,0.25)" fill="none" />
      {['#f3a9a2', '#f6c66a', '#8ec9a6', '#7fb4d8'].map((c, i) => (
        <polygon key={i} points={`${-72 + i * 48},-150 ${-58 + i * 48},-150 ${-65 + i * 48},-136`} fill={c} />
      ))}
      <Win x={-78} y={-104} c="#ffe2b0" />
      <Win x={52} y={-104} c="#ffe2b0" />
      <rect x={-22} y={-70} width={44} height={70} rx={22} fill={color} opacity={0.85} />
      {/* balloon */}
      <line x1={86} y1={-150} x2={92} y2={-210} stroke="rgba(90,74,57,0.3)" />
      <circle cx={92} cy={-222} r={14} fill="#f3a9c0" />
      <Plate label={label} subtitle={subtitle} y={-128} w={150} />
    </g>
  );
}

function School({ color, label, subtitle }: B) {
  return (
    <g>
      <rect x={-120} y={-190} width={240} height={190} rx={10} fill="#fffaf0" stroke="rgba(90,74,57,0.1)" />
      <polygon points="-130,-190 0,-238 130,-190" fill={color} />
      {/* flag */}
      <line x1={-104} y1={-238} x2={-104} y2={-300} stroke="#b08968" strokeWidth={4} strokeLinecap="round" />
      <path d="M-104 -296 L-68 -288 L-104 -278 Z" fill={color} />
      {/* clock */}
      <circle cx={0} cy={-205} r={15} fill="#fff8ec" stroke="rgba(90,74,57,0.25)" />
      <line x1={0} y1={-205} x2={0} y2={-214} stroke="#5a4a39" strokeWidth={2} strokeLinecap="round" />
      <line x1={0} y1={-205} x2={7} y2={-205} stroke="#5a4a39" strokeWidth={2} strokeLinecap="round" />
      <Win x={-96} y={-150} />
      <Win x={-50} y={-150} />
      <Win x={24} y={-150} />
      <Win x={70} y={-150} />
      <rect x={-26} y={-72} width={52} height={72} rx={7} fill={color} opacity={0.85} />
      <Plate label={label} subtitle={subtitle} y={-120} w={170} />
    </g>
  );
}

function University({ color, label, subtitle }: B) {
  return (
    <g>
      {/* steps */}
      <rect x={-150} y={-14} width={300} height={14} rx={3} fill="#e7dcc6" />
      <rect x={-134} y={-26} width={268} height={14} rx={3} fill="#efe6d2" />
      <rect x={-122} y={-200} width={244} height={176} rx={6} fill="#fffaf0" stroke="rgba(90,74,57,0.1)" />
      {/* columns */}
      {[-92, -46, 0, 46, 92].map((x) => (
        <rect key={x} x={x - 7} y={-186} width={14} height={162} rx={3} fill="#f2ead8" stroke="rgba(90,74,57,0.08)" />
      ))}
      {/* pediment */}
      <polygon points="-138,-200 0,-262 138,-200" fill={color} />
      <circle cx={0} cy={-224} r={12} fill="#fff8ec" opacity={0.85} />
      {/* dome */}
      <path d="M-26 -262 a26 26 0 0 1 52 0 Z" fill={color} />
      <rect x={-3} y={-298} width={6} height={14} rx={2} fill="#b08968" />
      <Plate label={label} subtitle={subtitle} y={-150} w={196} />
    </g>
  );
}

function Workplace({ color, label, subtitle }: B) {
  return (
    <g>
      <rect x={-104} y={-250} width={208} height={250} rx={10} fill="#fbfdff" stroke="rgba(90,74,57,0.1)" />
      <rect x={-104} y={-250} width={208} height={34} rx={10} fill={color} />
      {/* window grid (glassy) */}
      {[0, 1, 2, 3].map((r) =>
        [-1, 0, 1].map((c) => <Win key={`${r}-${c}`} x={c * 46 - 13} y={-196 + r * 44} c="#d6e8f0" />),
      )}
      {/* entrance */}
      <rect x={-30} y={-52} width={60} height={52} rx={6} fill={color} opacity={0.3} />
      <rect x={-26} y={-48} width={52} height={48} rx={5} fill="#eaf2f7" />
      <Plate label={label} subtitle={subtitle} y={-244} w={172} />
    </g>
  );
}

function Today({ color, label, subtitle }: B) {
  return (
    <g>
      {/* little tree beside the home */}
      <g transform="translate(-150,0)">
        <rect x={-6} y={-46} width={12} height={50} rx={5} fill="#b08968" />
        <circle cx={0} cy={-64} r={30} fill="#9ccb8f" />
      </g>
      {/* cozy house */}
      <rect x={-96} y={-150} width={192} height={150} rx={12} fill="#fff6ea" stroke="rgba(90,74,57,0.1)" />
      <polygon points="-112,-150 0,-224 112,-150" fill={color} />
      <rect x={64} y={-210} width={20} height={42} rx={4} fill="#caa06f" />
      {/* glowing window with a heart */}
      <rect x={-66} y={-118} width={50} height={50} rx={7} fill="#ffe49b" />
      <path d="M-41 -86 l-12 -12 a7 7 0 0 1 12 -7 a7 7 0 0 1 12 7 Z" fill="#e8675c" transform="translate(0,-8)" />
      <rect x={18} y={-118} width={50} height={50} rx={7} fill="#ffe49b" />
      {/* door */}
      <rect x={-18} y={-66} width={36} height={66} rx={8} fill={color} opacity={0.9} />
      <circle cx={9} cy={-32} r={2.6} fill="#fff8ec" />
      {/* sun rays behind (hope) */}
      <Plate label={label} subtitle={subtitle} y={-138} w={150} />
    </g>
  );
}

type B = { color: string; label: string; subtitle?: string };

export function Building({ type, ...rest }: { type: StationType } & B) {
  switch (type) {
    case 'hospital':
      return <Hospital {...rest} />;
    case 'kindergarten':
      return <Kindergarten {...rest} />;
    case 'school':
      return <School {...rest} />;
    case 'university':
      return <University {...rest} />;
    case 'workplace':
      return <Workplace {...rest} />;
    case 'today':
      return <Today {...rest} />;
  }
}
