import { type ReactNode, useEffect, useRef } from 'react';
import { animate } from 'motion';
import { computeMagneticOffset } from '../utils/portfolioMath';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
}

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 150,
  damping: 25,
  mass: 0.1,
};

export function MagneticButton({
  children,
  strength = 0.8,
  maxDistance = 100,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentAnim: ReturnType<typeof animate> | undefined;
    let rafId = 0;

    const cancelPending = () => {
      currentAnim?.stop();
      currentAnim = undefined;
      cancelAnimationFrame(rafId);
    };

    const reset = () => {
      cancelPending();
      wrapper.style.borderColor = 'transparent';
      wrapper.style.backgroundColor = 'transparent';
      if (mq.matches) {
        content.style.transform = 'translate(0px, 0px)';
      } else {
        currentAnim = animate(content, { x: 0, y: 0 }, SPRING_CONFIG);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (mq.matches) {
        reset();
        return;
      }
      const { x, y } = computeMagneticOffset(
        wrapper.getBoundingClientRect(),
        e.clientX,
        e.clientY,
        strength,
        maxDistance
      );
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        currentAnim?.stop();
        currentAnim = animate(content, { x, y }, SPRING_CONFIG);
        wrapper.style.borderColor = '#761b36';
        wrapper.style.backgroundColor = 'rgb(118 27 54 / 20%)';
      });
    };

    const onMediaChange = () => {
      if (mq.matches) reset();
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', reset);
    mq.addEventListener('change', onMediaChange);

    return () => {
      cancelPending();
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', reset);
      mq.removeEventListener('change', onMediaChange);
    };
  }, [strength, maxDistance]);

  return (
    <div
      className="magnetic-wrapper"
      ref={wrapperRef}
      data-strength={strength}
      data-max-distance={maxDistance}
    >
      <div className="magnetic-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
