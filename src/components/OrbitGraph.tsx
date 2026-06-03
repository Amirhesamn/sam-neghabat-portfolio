import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * A small dependency constellation: the active tech sits at the centre,
 * related tools orbit on a slowly rotating ring, connected by animated lines.
 */
export function OrbitGraph({
  center,
  nodes,
  color,
}: {
  center: string;
  nodes: string[];
  color: string;
}) {
  const reduced = useReducedMotion();
  const R = 78;
  const cx = 130;
  const cy = 130;

  return (
    <svg viewBox="0 0 260 260" className="h-full w-full" aria-hidden>
      {/* rings */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--color-line)" />
      <circle cx={cx} cy={cy} r={R - 26} fill="none" stroke="var(--color-line)" strokeDasharray="2 5" />

      <motion.g
        style={{ originX: '130px', originY: '130px' }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
      >
        {nodes.map((n, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          return (
            <g key={n}>
              <motion.line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={0.8}
                strokeOpacity={0.35}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={4}
                fill="var(--color-bg)"
                stroke={color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              />
              <text
                x={x}
                y={y - 9}
                textAnchor="middle"
                className="font-mono"
                style={{ fontSize: 8, letterSpacing: '0.06em', fill: 'var(--color-muted)' }}
              >
                {n}
              </text>
            </g>
          );
        })}
      </motion.g>

      {/* center node */}
      <circle cx={cx} cy={cy} r={20} fill="var(--color-surface)" stroke={color} strokeWidth={1.3} />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        className="font-mono"
        style={{ fontSize: 9, fill: color, letterSpacing: '0.04em' }}
      >
        {center}
      </text>
    </svg>
  );
}
