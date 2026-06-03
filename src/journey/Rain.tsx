import { useEffect, useRef, type RefObject } from 'react';

/**
 * Gentle rain on a canvas. Intensity (0..1) is read each frame from `intensityRef`
 * so the engine can fade rain in/out with the weather. Skipped under reduced motion.
 */
export function Rain({
  intensityRef,
  reduced,
}: {
  intensityRef: RefObject<number>;
  reduced: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const MAX = 150;
    type Drop = { x: number; y: number; len: number; v: number };
    const drops: Drop[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (): Drop => ({
      x: Math.random() * (w + 60) - 30,
      y: Math.random() * -h,
      len: 9 + Math.random() * 12,
      v: 5.5 + Math.random() * 4,
    });

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const draw = () => {
      const intensity = Math.max(0, Math.min(1, intensityRef.current ?? 0));
      // ramp up only past ~0.4 mood, smooth
      const t = Math.max(0, (intensity - 0.4) / 0.6);
      const want = Math.floor(MAX * t * t);
      while (drops.length < want) drops.push(spawn());
      if (drops.length > want) drops.length = want;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(189,206,222,${0.18 + 0.4 * t})`;
      ctx.lineWidth = 1.1;
      ctx.lineCap = 'round';
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.stroke();
        d.y += d.v;
        d.x -= 0.7;
        if (d.y > h + 20) {
          d.y = -20;
          d.x = Math.random() * (w + 60) - 30;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [intensityRef, reduced]);

  if (reduced) return null;
  return <canvas ref={ref} className="rain" aria-hidden />;
}
