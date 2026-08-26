'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { usePointerVelocity } from './hooks/usePointerVelocity';

/**
 * Premium cursor animation using spring physics.
 * Apple principle: "Springs are inherently interruptible and velocity-aware."
 *
 * - Dot (small, fast) follows pointer with snappy spring
 * - Ring (larger, slower) follows with UI spring for lag effect
 * - Morphs on interactive elements, press feedback on click
 * - Hides on touch-primary devices (mobile/tablet)
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { track, clear } = usePointerVelocity();
  const dotAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const ringAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Skip on touch-primary devices (mobile/tablet)
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchPrimary) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    // Hide system cursor so custom cursor is visible
    document.body.style.cursor = 'none';
    document.body.classList.add('cursor-none');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mouseX = -100;
    let mouseY = -100;

    // Spring-based position tracking
    // Apple principle: "Springs are inherently interruptible and velocity-aware."
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      track(e.clientX, e.clientY);

      if (reducedMotion) {
        dot.style.left = `${e.clientX - 6}px`;
        dot.style.top = `${e.clientY - 6}px`;
        ring.style.left = `${e.clientX - 20}px`;
        ring.style.top = `${e.clientY - 20}px`;
        return;
      }

      // Cancel any in-flight animations before starting new ones
      dotAnimRef.current?.stop();
      ringAnimRef.current?.stop();

      // Animate with springs — interruptible, starts from current presentation value
      dotAnimRef.current = animate(dot, {
        left: `${e.clientX - 6}px`,
        top: `${e.clientY - 6}px`,
      }, { type: 'spring', damping: 30, mass: 0.5, stiffness: 500 });

      ringAnimRef.current = animate(ring, {
        left: `${e.clientX - 20}px`,
        top: `${e.clientY - 20}px`,
      }, { type: 'spring', damping: 25, mass: 0.8, stiffness: 300 });
    };

    // Hover morphing with spring (Apple: "hint in the direction of the gesture")
    // Use transform:scale instead of width/height to avoid layout thrash
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], [href], input, textarea, select')) {
        // Ring: scale from 40px to 32px (0.8x), adjust position to keep centered
        const ringScale = 32 / 40;
        ring.style.transform = `scale(${ringScale})`;
        ring.style.borderColor = 'var(--color-accent-primary)';
        ring.style.opacity = '1';
        ring.style.left = `${mouseX - 20}px`;
        ring.style.top = `${mouseY - 20}px`;
        // Dot: scale from 12px to 8px (0.67x), change color
        const dotScale = 8 / 12;
        dot.style.transform = `scale(${dotScale})`;
        dot.style.background = 'var(--color-accent-primary)';
        dot.style.left = `${mouseX - 6}px`;
        dot.style.top = `${mouseY - 6}px`;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], [href], input, textarea, select')) {
        ring.style.transform = 'scale(1)';
        ring.style.borderColor = 'var(--color-lamp-cream)';
        ring.style.opacity = '0.6';
        ring.style.left = `${mouseX - 20}px`;
        ring.style.top = `${mouseY - 20}px`;
        dot.style.transform = 'scale(1)';
        dot.style.background = 'var(--color-lamp-cream)';
        dot.style.left = `${mouseX - 6}px`;
        dot.style.top = `${mouseY - 6}px`;
      }
    };

    // Click feedback — momentary press scale (Apple: "respond on pointer-down")
    const onMouseDown = () => {
      if (reducedMotion) return;
      dot.style.transform = 'scale(0.7)';
      ring.style.transform = 'scale(0.8)';
    };

    const onMouseUp = () => {
      if (reducedMotion) return;
      dot.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      dotAnimRef.current?.stop();
      ringAnimRef.current?.stop();
      clear();
      // Restore system cursor
      document.body.style.cursor = 'default';
      document.body.classList.remove('cursor-none');
    };
  }, [track, clear]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--color-lamp-cream)',
          boxShadow: '0 0 0 2px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.4)',
          transformOrigin: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.15s ease, transform 0.1s ease',
          // Start off-screen, hidden until first mousemove
          left: '-100px',
          top: '-100px',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '2px solid var(--color-accent-primary)',
          opacity: 1,
          transformOrigin: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 20px rgba(84, 179, 194, 0.5), 0 0 40px rgba(84, 179, 194, 0.3), inset 0 0 12px rgba(84, 179, 194, 0.2)',
          transition: 'border-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
          // Start off-screen, hidden until first mousemove
          left: '-100px',
          top: '-100px',
        }}
        aria-hidden="true"
      />
    </>
  );
}