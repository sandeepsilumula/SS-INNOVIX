'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  yOffset = 30,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    gsap.fromTo(containerRef.current, { autoAlpha: 0, y: yOffset }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=80px',
        toggleActions: 'play none none none',
      },
    });
  }, [containerRef, yOffset]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: 'auto' }}>
      {children}
    </div>
  );
}