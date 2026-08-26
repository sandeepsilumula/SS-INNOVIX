'use client';

import { useRef, useState, useEffect } from 'react';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}

export default function NumberTicker({
  value,
  suffix = '',
  label,
  className = '',
  duration = 2000,
}: NumberTickerProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              setDisplayValue(value);
              setHasAnimated(true);
            } else {
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutExpo
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setDisplayValue(Math.round(eased * value));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setDisplayValue(value);
                  setHasAnimated(true);
                }
              };

              requestAnimationFrame(animate);
            }
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, hasAnimated, duration]);

  const formattedValue = displayValue.toLocaleString();

  return (
    <div ref={counterRef} className={className}>
      <div className="flex items-baseline gap-1">
        <span className="font-display-lg text-white">
          {formattedValue}
        </span>
        <span className="font-display-lg text-lamp-cream/90">
          {suffix}
        </span>
      </div>
      <div className="mt-3 font-label-md text-white/40">
        {label}
      </div>
    </div>
  );
}