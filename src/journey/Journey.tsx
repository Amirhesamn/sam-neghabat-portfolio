import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { STATIONS, CONFIG, MAX_X } from './journey-data';
import { SCENE_H, GROUND_Y, FACTOR, FRAC } from './art/constants';
import { Building } from './art/Buildings';
import { Character } from './art/Character';
import { Sign } from './art/Sign';
import { Rain } from './Rain';
import { Tree, PineTree, Bush, Flower, GrassTuft, Cloud, KidNPC } from './art/Decor';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Journey() {
  const reduced = useReducedMotion();
  const [vbW, setVbW] = useState(1280);
  const [activeIdx, setActiveIdx] = useState(0);
  const [started, setStarted] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const fgRef = useRef<SVGGElement>(null);
  const cloudRef = useRef<SVGGElement>(null);
  const charBobRef = useRef<SVGGElement>(null);
  const gloomRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const cam = useRef(0);
  const target = useRef(0);
  const keyDir = useRef(0);
  const btnDir = useRef(0);
  const lastIdx = useRef(0);
  const rainI = useRef(0);
  const startedRef = useRef(false);

  // ---- responsive viewBox width (keeps aspect == container, no distortion) ----
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      setVbW(Math.round((w / h) * SCENE_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- decor (stable per width) ----
  const decor = useMemo(() => {
    const r = mulberry(1337);
    const fg: { x: number; kind: string; c: string; s: number }[] = [];
    for (let x = 120; x < MAX_X + vbW; x += 200 + r() * 150) {
      const k = r();
      fg.push({
        x,
        kind: k < 0.5 ? 'flower' : k < 0.74 ? 'grass' : 'bush',
        c: ['#f3a9c0', '#f6c66a', '#9bd0c0', '#f0a98b'][Math.floor(r() * 4)],
        s: 0.7 + r() * 0.5,
      });
    }
    const trees: { x: number; s: number; pine: boolean }[] = [];
    for (let x = 280; x < MAX_X * FACTOR.mid + vbW; x += 420 + r() * 240) {
      trees.push({ x, s: 0.8 + r() * 0.55, pine: r() < 0.4 });
    }
    const pines: { x: number; s: number }[] = [];
    for (let x = 160; x < MAX_X * FACTOR.far + vbW; x += 460 + r() * 220) {
      pines.push({ x, s: 0.6 + r() * 0.4 });
    }
    const clouds: { x: number; y: number; s: number; d: number }[] = [];
    for (let x = 0; x < MAX_X * 0.18 + vbW + 900; x += 440 + r() * 260) {
      clouds.push({ x, y: 60 + r() * 150, s: 0.7 + r() * 0.8, d: r() * 12 });
    }
    return { fg, trees, pines, clouds };
  }, [vbW]);

  // far hills path
  const hills = useMemo(() => {
    const r = mulberry(7);
    const span = MAX_X * FACTOR.far + vbW + 1400;
    const make = (baseY: number, amp: number, freq: number) => {
      let d = `M-800 ${SCENE_H} L-800 ${baseY}`;
      for (let x = -800; x <= span; x += 240) {
        const y = baseY + Math.sin(x * freq) * amp + r() * 12;
        d += ` L${x.toFixed(0)} ${y.toFixed(0)}`;
      }
      return d + ` L${span} ${SCENE_H} Z`;
    };
    return { back: make(452, 26, 0.006), front: make(498, 20, 0.009) };
  }, [vbW]);

  // ---- input ----
  useEffect(() => {
    const begin = () => {
      if (!startedRef.current) {
        startedRef.current = true;
        setStarted(true);
      }
    };
    const pressed = new Set<string>();
    const updKeys = () => {
      const fwd = pressed.has('ArrowRight') || pressed.has('d') || pressed.has('D');
      const back = pressed.has('ArrowLeft') || pressed.has('a') || pressed.has('A');
      keyDir.current = (fwd ? 1 : 0) + (back ? -1 : 0);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowLeft', 'a', 'A', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        pressed.add(e.key);
        updKeys();
        begin();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      pressed.delete(e.key);
      updKeys();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target.current = clamp(target.current + e.deltaY * 0.85, 0, MAX_X);
      begin();
    };
    let tx = 0;
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = tx - e.touches[0].clientX;
      const dy = ty - e.touches[0].clientY;
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      target.current = clamp(target.current + (dx + dy) * 1.7, 0, MAX_X);
      begin();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // ---- main loop ----
  useEffect(() => {
    const seg = CONFIG.segment;
    const n = STATIONS.length;
    const SPEED = 9;
    const EASE = reduced ? 0.26 : 0.1;
    let raf = 0;
    const loop = (now: number) => {
      target.current = clamp(target.current + (keyDir.current + btnDir.current) * SPEED, 0, MAX_X);
      cam.current += (target.current - cam.current) * EASE;
      if (Math.abs(target.current - cam.current) < 0.08) cam.current = target.current;
      const c = cam.current;

      farRef.current?.setAttribute('transform', `translate(${-c * FACTOR.far},0)`);
      midRef.current?.setAttribute('transform', `translate(${-c * FACTOR.mid},0)`);
      fgRef.current?.setAttribute('transform', `translate(${-c * FACTOR.fg},0)`);
      cloudRef.current?.setAttribute('transform', `translate(${-c * 0.18},0)`);

      // weather
      const p = c / seg;
      const i0 = clamp(Math.floor(p), 0, n - 1);
      const i1 = Math.min(i0 + 1, n - 1);
      const mood = lerp(STATIONS[i0].mood, STATIONS[i1].mood, p - i0);
      if (gloomRef.current) gloomRef.current.style.opacity = String(mood);
      if (sunRef.current) sunRef.current.style.opacity = String(clamp(1 - mood * 1.25, 0, 1));
      if (cloudRef.current) cloudRef.current.style.opacity = String(0.5 + 0.45 * mood);
      rainI.current = mood;

      if (!reduced && charBobRef.current) {
        const bob = Math.sin(now * 0.005) * 2.2;
        const tilt = Math.sin(now * 0.005) * 0.8;
        charBobRef.current.setAttribute('transform', `translate(0 ${bob}) rotate(${tilt})`);
      }

      const prog = MAX_X ? c / MAX_X : 0;
      if (fillRef.current) fillRef.current.style.width = `${prog * 100}%`;
      if (dotRef.current) dotRef.current.style.left = `${prog * 100}%`;

      const idx = clamp(Math.round(p), 0, n - 1);
      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        setActiveIdx(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const charX = FRAC.character * vbW;
  const active = STATIONS[activeIdx];
  const stage = active.character;

  const holdBtn = (dir: number) => ({
    onPointerDown: () => {
      btnDir.current = dir;
      if (!startedRef.current) {
        startedRef.current = true;
        setStarted(true);
      }
    },
    onPointerUp: () => (btnDir.current = 0),
    onPointerLeave: () => (btnDir.current = 0),
    onPointerCancel: () => (btnDir.current = 0),
  });

  return (
    <div className={`journey ${reduced ? '' : 'is-anim'}`} ref={wrapRef}>
      {/* sky */}
      <div className="sky" aria-hidden>
        <div className="sky__layer sky__sun" />
        <div className="sky__layer sky__gloom" ref={gloomRef} />
        <div className="sun" ref={sunRef}>
          <div className="sun__core" />
        </div>
      </div>

      {/* scene */}
      <svg className="scene" viewBox={`0 0 ${vbW} ${SCENE_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* far hills + distant pines + clouds */}
        <g ref={farRef}>
          <path d={hills.back} fill="#cfe6c4" />
          <path d={hills.front} fill="#bcdcb0" />
          {decor.pines.map((t, i) => (
            <g key={i} transform={`translate(${t.x},${GROUND_Y - 4})`} opacity={0.85}>
              <PineTree s={t.s} />
            </g>
          ))}
        </g>
        <g ref={cloudRef}>
          {decor.clouds.map((cl, i) => (
            <g key={i} className="cloud-sway" style={{ animationDelay: `${cl.d}s` }}>
              <g transform={`translate(${cl.x},${cl.y})`}>
                <Cloud s={cl.s} />
              </g>
            </g>
          ))}
        </g>

        {/* mid — buildings + trees */}
        <g ref={midRef}>
          {decor.trees.map((t, i) => (
            <g key={i} transform={`translate(${t.x},${GROUND_Y})`}>
              {t.pine ? <PineTree s={t.s} /> : <Tree s={t.s} />}
            </g>
          ))}
          {STATIONS.map((st, i) => (
            <g key={st.id} transform={`translate(${FRAC.building * vbW + i * CONFIG.segment * FACTOR.mid},${GROUND_Y})`}>
              <Building type={st.type} color={st.color} label={st.building} subtitle={st.subtitle} />
            </g>
          ))}
        </g>

        {/* foreground — ground, signs, plants, NPCs */}
        <g ref={fgRef}>
          <rect x={-3000} y={GROUND_Y} width={MAX_X + 8000} height={SCENE_H - GROUND_Y} fill="#bcd99f" />
          <rect x={-3000} y={GROUND_Y} width={MAX_X + 8000} height={10} fill="#a9cd8c" />
          <rect x={-3000} y={GROUND_Y + 40} width={MAX_X + 8000} height={26} fill="#e8d3a8" opacity={0.6} />
          {decor.fg.map((d, i) => (
            <g key={i} transform={`translate(${d.x},${GROUND_Y + 2}) scale(${d.s})`}>
              {d.kind === 'flower' ? <Flower color={d.c} /> : d.kind === 'grass' ? <GrassTuft /> : <Bush hue="#a8d39a" />}
            </g>
          ))}
          {STATIONS.map((st, i) =>
            st.type === 'kindergarten' ? (
              <g key={`npc-${st.id}`} transform={`translate(${FRAC.building * vbW + i * CONFIG.segment - 150},${GROUND_Y})`}>
                <KidNPC />
              </g>
            ) : null,
          )}
          {STATIONS.map((st, i) => (
            <g key={st.id} transform={`translate(${FRAC.sign * vbW + i * CONFIG.segment * FACTOR.fg},${GROUND_Y})`}>
              <Sign date={st.date} age={st.age} accent={st.color} />
            </g>
          ))}
        </g>

        {/* character — fixed on screen, world scrolls behind */}
        <g transform={`translate(${charX},${GROUND_Y})`}>
          <g ref={charBobRef}>
            <g key={stage} className="char-pop">
              <Character stage={stage} />
            </g>
          </g>
        </g>
      </svg>

      {/* rain */}
      <Rain intensityRef={rainI} reduced={reduced} />

      {/* top bar */}
      <div className="topbar">
        <a className="back" href="/" aria-label="Back to portfolio">← Portfolio</a>
        <span className="brand">
          <b>Sam</b>’s journey
        </span>
      </div>

      {/* current station */}
      <div className="station-pop swap" key={activeIdx} aria-live="polite">
        <div className="station-pop__name">{active.building}</div>
        {active.subtitle && <div className="station-pop__sub">{active.subtitle} · {active.date}</div>}
      </div>

      {/* HUD */}
      <div className="hud">
        <button className="nav-btn" aria-label="Go back in time" {...holdBtn(-1)}>‹</button>
        <div className="progress">
          <div className="progress__fill" ref={fillRef} />
          <div className="progress__dot" ref={dotRef} />
        </div>
        <button className="nav-btn" aria-label="Move forward in time" {...holdBtn(1)}>›</button>
      </div>

      {/* intro */}
      <div className={`intro ${started ? 'hide' : ''}`}>
        <div className="intro__card">
          <div className="intro__kicker">A little story</div>
          <h1 className="intro__title">My Journey</h1>
          <p className="intro__text">
            From the very first day to today — a gentle walk through the milestones, the schools, the
            jobs, the rainy years, and the sunshine that came back.
          </p>
          <button className="begin" onClick={() => { startedRef.current = true; setStarted(true); }}>
            Begin the walk →
          </button>
          <div className="intro__hint">
            <kbd>→</kbd> / scroll to walk · <kbd>←</kbd> to go back
          </div>
        </div>
      </div>
    </div>
  );
}
