import { motion, useScroll, useSpring } from 'framer-motion';

/** Fixed film overlays: grain + CRT scanlines + vignette. Pure CSS, GPU-cheap. */
export function FilmOverlays() {
  return (
    <>
      <div className="fx-vignette" aria-hidden />
      <div className="fx-grain" aria-hidden />
      <div className="fx-scan" aria-hidden />
    </>
  );
}

/** Top scroll-progress bar in phosphor lime, smoothed with a spring. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9100] h-[2px] w-full origin-left bg-accent"
    />
  );
}
