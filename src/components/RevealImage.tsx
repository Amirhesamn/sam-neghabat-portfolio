import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Image that reveals via an animated clip-path mask on scroll, sits in a duotone
 * wash until hovered (then shifts to full colour + zoom), and can parallax.
 * Falls back to picsum if the primary (Unsplash) source fails to load.
 */
export function RevealImage({
  src,
  fallbackSeed,
  alt,
  className = '',
  imgClassName = '',
  parallax = false,
  flat = false,
  w = 1200,
  h = 900,
}: {
  src: string;
  fallbackSeed: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: boolean;
  flat?: boolean;
  w?: number;
  h?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [errored, setErrored] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const finalSrc = errored
    ? `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}/${w}/${h}`
    : src;

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        style={parallax && !reduced ? { y, scale: 1.18 } : undefined}
        className={`h-full w-full object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] ${
          flat ? '' : 'duotone group-hover:filter-none'
        } ${imgClassName}`}
      />
      {/* scanline sheen */}
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))] opacity-60" />
      <span className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-20 bg-accent" />
    </motion.div>
  );
}
