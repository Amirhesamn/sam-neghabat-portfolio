import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion';

/**
 * GPU-friendly custom cursor: a phosphor dot + a lagging ring driven by a single rAF loop.
 * - expands into a soft disc over buttons/links
 * - morphs into a blinking text caret over terminals/inputs ([data-cursor="text"])
 * - shows a mono label from [data-cursor-label]
 * Only renders on fine pointers; respects reduced-motion.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    document.body.classList.add('has-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let dx = mx;
    let dy = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      label.style.transform = `translate(${mx + 14}px, ${my + 14}px)`;
    };
    const onDown = () => ring.classList.add('down');
    const onUp = () => ring.classList.remove('down');

    const interactiveSel =
      'a, button, input, textarea, [role="button"], [data-cursor], .skill-chip, .proj-card';

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSel) as HTMLElement | null;
      if (!target) return;
      const mode = target.getAttribute('data-cursor');
      ring.classList.toggle('caret', mode === 'text');
      ring.classList.toggle('hover', mode !== 'text');
      const text = target.getAttribute('data-cursor-label');
      if (text) {
        label.textContent = text;
        label.classList.add('show');
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSel);
      if (!target) return;
      ring.classList.remove('hover', 'caret');
      label.classList.remove('show');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let raf = 0;
    const loop = () => {
      dx += (mx - dx) * 0.9;
      dy += (my - dy) * 0.9;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden />
      <div ref={dotRef} className="cur-dot" aria-hidden />
      <div ref={labelRef} className="cur-label" aria-hidden />
    </>
  );
}
