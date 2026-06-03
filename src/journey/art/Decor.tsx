// Soft, flat decorative pieces. All drawn with their base at y = 0 (ground),
// extending upward (negative y), so they can be placed with translate(x, GROUND_Y).

export function Tree({ s = 1, hue = '#9ccb8f' }: { s?: number; hue?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-7} y={-58} width={14} height={62} rx={6} fill="#b08968" />
      <circle cx={0} cy={-78} r={36} fill={hue} />
      <circle cx={-26} cy={-62} r={26} fill={hue} />
      <circle cx={26} cy={-62} r={26} fill={hue} />
      <circle cx={0} cy={-78} r={36} fill="#ffffff" opacity={0.08} />
    </g>
  );
}

export function PineTree({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-5} y={-30} width={10} height={34} rx={4} fill="#a9805f" />
      <polygon points="0,-110 34,-46 -34,-46" fill="#8bbf86" />
      <polygon points="0,-86 28,-30 -28,-30" fill="#7fb47b" />
    </g>
  );
}

export function Bush({ s = 1, hue = '#a8d39a' }: { s?: number; hue?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <circle cx={-16} cy={-12} r={16} fill={hue} />
      <circle cx={14} cy={-14} r={18} fill={hue} />
      <circle cx={0} cy={-20} r={20} fill={hue} />
    </g>
  );
}

export function Flower({ color = '#f3a9c0' }: { color?: string }) {
  return (
    <g>
      <rect x={-1.4} y={-18} width={2.8} height={18} fill="#8fae6e" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 5} cy={-18 + Math.sin((a * Math.PI) / 180) * 5} r={4} fill={color} />
      ))}
      <circle cx={0} cy={-18} r={2.6} fill="#ffd27a" />
    </g>
  );
}

export function GrassTuft({ hue = '#86b96f' }: { hue?: string }) {
  return (
    <g stroke={hue} strokeWidth={2.4} strokeLinecap="round" fill="none">
      <path d="M0 0 q-3 -10 -6 -14" />
      <path d="M0 0 q0 -12 0 -18" />
      <path d="M0 0 q3 -10 7 -15" />
    </g>
  );
}

export function Cloud({ s = 1, fill = '#ffffff' }: { s?: number; fill?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={0} rx={46} ry={26} fill={fill} />
      <ellipse cx={-38} cy={8} rx={30} ry={20} fill={fill} />
      <ellipse cx={40} cy={9} rx={32} ry={20} fill={fill} />
      <ellipse cx={6} cy={14} rx={50} ry={16} fill={fill} />
    </g>
  );
}

export function Bird() {
  return (
    <g stroke="#7d6c58" strokeWidth={2.4} fill="none" strokeLinecap="round">
      <path d="M-9 0 Q-4 -6 0 0" />
      <path d="M0 0 Q4 -6 9 0" />
    </g>
  );
}

// a small NPC kid playing (used in the kindergarten scene)
export function KidNPC({ color = '#7fb4d8' }: { color?: string }) {
  return (
    <g>
      <rect x={-9} y={-30} width={18} height={22} rx={8} fill={color} />
      <circle cx={0} cy={-38} r={9} fill="#f1c8a0" />
      <path d="M-7 -44 q7 -7 14 0" fill="#4a3b30" />
      <rect x={-7} y={-9} width={5} height={10} rx={2.5} fill="#5a4a39" />
      <rect x={2} y={-9} width={5} height={10} rx={2.5} fill="#5a4a39" />
    </g>
  );
}
