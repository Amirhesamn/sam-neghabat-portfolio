import type { CharacterStage } from '../journey-data';

// Figures draw with feet at y = 0, facing right. Placed via translate(charX, GROUND_Y).
const SKIN = '#f1c8a0';
const HAIR = '#3a2e28';

function Shadow({ rx = 30 }: { rx?: number }) {
  return <ellipse cx={0} cy={4} rx={rx} ry={6} fill="rgba(80,60,40,0.12)" />;
}

function Smile({ x = 4, y = 0, r = 5 }: { x?: number; y?: number; r?: number }) {
  return <path d={`M${x - r} ${y} q${r} ${r} ${r * 2} 0`} stroke="#5a4a39" strokeWidth={1.6} fill="none" strokeLinecap="round" />;
}

/* 1 — newborn: mother pushing the stroller (کالسکه) */
function Newborn() {
  return (
    <g>
      <Shadow rx={70} />
      {/* mother */}
      <g transform="translate(-44,0)">
        <polygon points="-22,0 22,0 14,-66 -14,-66" fill="#e79aa6" />
        <rect x={-15} y={-70} width={30} height={14} rx={7} fill="#f6b6bf" />
        <circle cx={0} cy={-88} r={15} fill={SKIN} />
        <path d="M-15 -90 q15 -20 30 0 q2 -18 -15 -20 q-17 2 -15 20" fill={HAIR} />
        <circle cx={9} cy={-30} r={7} fill="#e79aa6" />
        {/* arm to handle */}
        <path d="M16 -52 Q44 -44 60 -54" stroke="#e79aa6" strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
      {/* stroller */}
      <g transform="translate(34,0)">
        <line x1={-30} y1={-58} x2={26} y2={-40} stroke="#7a93a6" strokeWidth={4} strokeLinecap="round" />
        <path d="M-26 -36 a40 30 0 0 1 64 6 L-26 -2 Z" fill="#8db7d6" />
        <path d="M-26 -36 a40 40 0 0 1 40 -16 l0 30 Z" fill="#6f9fc4" />
        {/* baby */}
        <circle cx={20} cy={-26} r={9} fill={SKIN} />
        <circle cx={20} cy={-30} r={9} fill="#fff" opacity={0.25} />
        <circle cx={-10} cy={6} r={11} fill="#5a4a39" />
        <circle cx={-10} cy={6} r={4} fill="#cbb89c" />
        <circle cx={30} cy={6} r={11} fill="#5a4a39" />
        <circle cx={30} cy={6} r={4} fill="#cbb89c" />
      </g>
    </g>
  );
}

/* 2 — toddler: first wobbly steps */
function Toddler() {
  return (
    <g>
      <Shadow rx={20} />
      <rect x={-7} y={-16} width={6} height={16} rx={3} fill="#caa06f" />
      <rect x={3} y={-16} width={6} height={16} rx={3} fill="#caa06f" />
      <rect x={-15} y={-46} width={30} height={34} rx={13} fill="#f6c66a" />
      <path d="M-15 -34 q-8 6 -10 16" stroke="#f6c66a" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M15 -34 q8 6 10 16" stroke="#f6c66a" strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-60} r={18} fill={SKIN} />
      <path d="M-18 -62 q18 -22 36 0 q0 -16 -18 -18 q-18 2 -18 18" fill={HAIR} />
      <Smile y={-56} />
      <circle cx={-4} cy={-62} r={1.6} fill="#5a4a39" />
      <circle cx={8} cy={-62} r={1.6} fill="#5a4a39" />
    </g>
  );
}

/* 3 — child: small kid with a backpack */
function Child() {
  return (
    <g>
      <Shadow rx={22} />
      <rect x={-9} y={-20} width={7} height={20} rx={3} fill="#5a4a39" />
      <rect x={3} y={-20} width={7} height={20} rx={3} fill="#5a4a39" />
      <rect x={-18} y={-58} width={14} height={36} rx={7} fill="#e08a5b" />
      <rect x={-16} y={-56} width={32} height={40} rx={11} fill="#8ec9a6" />
      <path d="M16 -50 q9 5 9 16" stroke="#8ec9a6" strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={2} cy={-72} r={16} fill={SKIN} />
      <path d="M-14 -74 q16 -20 32 0 q0 -15 -16 -16 q-16 1 -16 16" fill={HAIR} />
      <Smile x={-2} y={-68} />
      <circle cx={-2} cy={-74} r={1.7} fill="#5a4a39" />
      <circle cx={8} cy={-74} r={1.7} fill="#5a4a39" />
    </g>
  );
}

/* 4 — teen: taller, headphones */
function Teen() {
  return (
    <g>
      <Shadow rx={22} />
      <rect x={-9} y={-26} width={8} height={26} rx={3} fill="#3f4a5a" />
      <rect x={3} y={-26} width={8} height={26} rx={3} fill="#3f4a5a" />
      <rect x={-17} y={-72} width={34} height={50} rx={13} fill="#7fb4d8" />
      <path d="M17 -64 q10 6 9 20" stroke="#7fb4d8" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={1} cy={-90} r={16} fill={SKIN} />
      <path d="M-15 -92 q16 -22 32 0 q1 -17 -16 -18 q-17 1 -16 18" fill={HAIR} />
      {/* headphones */}
      <path d="M-16 -92 a17 17 0 0 1 34 0" stroke="#5a4a39" strokeWidth={3} fill="none" />
      <rect x={-21} y={-94} width={7} height={12} rx={3} fill="#5a4a39" />
      <rect x={15} y={-94} width={7} height={12} rx={3} fill="#5a4a39" />
      <Smile x={-3} y={-86} />
    </g>
  );
}

/* 5 — student: young adult with a satchel */
function Student() {
  return (
    <g>
      <Shadow rx={23} />
      <rect x={-10} y={-28} width={8} height={28} rx={3} fill="#3a4250" />
      <rect x={3} y={-28} width={8} height={28} rx={3} fill="#3a4250" />
      <rect x={-18} y={-78} width={36} height={54} rx={13} fill="#c2a8e6" />
      {/* satchel */}
      <path d="M-18 -64 L18 -50" stroke="#9b86c4" strokeWidth={4} />
      <rect x={10} y={-52} width={20} height={22} rx={5} fill="#9b86c4" />
      <path d="M18 -68 q11 7 10 22" stroke="#c2a8e6" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={1} cy={-97} r={16} fill={SKIN} />
      <path d="M-15 -99 q16 -22 32 0 q1 -17 -16 -18 q-17 1 -16 18" fill={HAIR} />
      <Smile x={-3} y={-93} />
      <circle cx={-3} cy={-99} r={1.7} fill="#5a4a39" />
      <circle cx={7} cy={-99} r={1.7} fill="#5a4a39" />
    </g>
  );
}

/* 6 — adult: dark hoodie + coffee (today) */
function Adult() {
  return (
    <g>
      <Shadow rx={24} />
      <rect x={-10} y={-30} width={9} height={30} rx={3} fill="#2f3640" />
      <rect x={3} y={-30} width={9} height={30} rx={3} fill="#2f3640" />
      <rect x={-19} y={-82} width={38} height={56} rx={14} fill="#3b424c" />
      {/* hoodie pocket + strings */}
      <path d="M-12 -44 q12 8 24 0" stroke="#2f3640" strokeWidth={2.4} fill="none" />
      <line x1={-4} y1={-72} x2={-5} y2={-58} stroke="#cdd2da" strokeWidth={2} />
      <line x1={6} y1={-72} x2={7} y2={-58} stroke="#cdd2da" strokeWidth={2} />
      {/* arm holding coffee */}
      <path d="M19 -70 q12 8 6 22" stroke="#3b424c" strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={20} y={-52} width={14} height={16} rx={3} fill="#fff8ec" stroke="#caa06f" />
      <path d="M34 -49 q7 1 6 7 q-1 4 -6 4" stroke="#caa06f" strokeWidth={2.4} fill="none" />
      <path d="M24 -56 q2 -5 0 -9" stroke="#caa06f" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <circle cx={1} cy={-101} r={16} fill={SKIN} />
      <path d="M-15 -103 q16 -22 32 0 q1 -17 -16 -18 q-17 1 -16 18" fill={HAIR} />
      <path d="M-15 -101 q5 6 10 6" fill={HAIR} opacity={0.6} />
      <Smile x={-3} y={-96} />
      <circle cx={-3} cy={-102} r={1.7} fill="#5a4a39" />
      <circle cx={7} cy={-102} r={1.7} fill="#5a4a39" />
    </g>
  );
}

export function Character({ stage }: { stage: CharacterStage }) {
  switch (stage) {
    case 'newborn':
      return <Newborn />;
    case 'toddler':
      return <Toddler />;
    case 'child':
      return <Child />;
    case 'teen':
      return <Teen />;
    case 'student':
      return <Student />;
    case 'adult':
      return <Adult />;
  }
}
