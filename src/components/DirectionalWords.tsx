import { Fragment, type PointerEvent } from 'react';
import { getDirectionEdge } from '../utils/portfolioMath';

interface DirectionalWordsProps {
  text: string;
  className?: string;
  dataBuild?: 'box' | 'text';
}

export function DirectionalWords({
  text,
  className = 'ds',
  dataBuild,
}: DirectionalWordsProps) {
  const words = text.trim().split(/\s+/);

  const handleEnter = (e: PointerEvent<HTMLSpanElement>) => {
    const span = e.currentTarget;
    const ink = span.querySelector('i');
    if (!ink) return;
    const { origin, scale } = getDirectionEdge(span.getBoundingClientRect(), e.clientX, e.clientY);
    ink.style.transition = 'none';
    ink.style.transformOrigin = origin;
    ink.style.transform = `scale(${scale})`;
    void ink.offsetWidth;
    ink.style.transition = '';
    ink.style.transform = 'scale(1,1)';
    span.classList.add('on');
  };

  const handleLeave = (e: PointerEvent<HTMLSpanElement>) => {
    const span = e.currentTarget;
    const ink = span.querySelector('i');
    if (!ink) return;
    const { origin, scale } = getDirectionEdge(span.getBoundingClientRect(), e.clientX, e.clientY);
    ink.style.transformOrigin = origin;
    ink.style.transform = `scale(${scale})`;
    span.classList.remove('on');
  };

  return (
    <p className={className} aria-label={text} data-build={dataBuild}>
      {words.map((word, idx) => (
        <Fragment key={idx}>
          {idx > 0 ? ' ' : ''}
          <span
            className="dw"
            aria-hidden="true"
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
          >
            {word}
            <i />
          </span>
        </Fragment>
      ))}
    </p>
  );
}
