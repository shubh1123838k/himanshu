import { useEffect, useRef } from 'react';
import { clamp } from '../utils/portfolioMath';

interface CustomCursorProps {
  reducedMotion: boolean;
}

export function CustomCursor({ reducedMotion }: CustomCursorProps) {
  const curRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const root = document.documentElement;
    const cur = curRef.current;
    const label = labelRef.current;
    const svg = svgRef.current;
    if (!cur || !label || !svg) return;

    root.classList.add('cc');

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const cursorTarget =
        e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      label.textContent =
        cursorTarget instanceof HTMLElement ? (cursorTarget.dataset.cursor ?? '') : '';
      label.style.opacity = cursorTarget ? '1' : '0';

      const nativeTarget =
        e.target instanceof Element
          ? e.target.closest('[data-native-cursor], input, textarea')
          : null;
      cur.style.opacity = nativeTarget ? '0' : '1';
    };

    const tick = () => {
      const dx = targetX - curX;
      curX += dx * 0.35;
      curY += (targetY - curY) * 0.35;
      cur.style.transform = `translate(${curX}px, ${curY}px)`;
      svg.style.transform = `rotate(${clamp(dx * 0.4, -12, 12)}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('cc');
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div id="cur" ref={curRef} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 20 24">
        <path
          d="M2 1.5v18l5-4.6 3.4 7.2 3-1.4-3.3-7H17z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span ref={labelRef} />
    </div>
  );
}
