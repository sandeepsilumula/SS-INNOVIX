'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef<number>();
  const progressRef = useRef<HTMLDivElement>(null);

  // Track prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, don't animate the progress bar
    if (prefersReducedMotion) {
      return;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      const clamped = Math.min(1, Math.max(0, scrollPercent));
      setProgress(clamped);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${clamped})`;
      }

      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-30 bg-gradient-to-r from-lamp-cream to-lamp-cream/20"
      style={{ transform: `scaleX(${progress})`, transformOrigin: 'left center' }}
      ref={progressRef}
      aria-hidden="true"
    />
  );
}