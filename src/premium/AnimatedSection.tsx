'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  parallaxLayers?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  parallaxLayers = 3,
  className = '',
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is preferred, skip all animations and show content immediately
    if (prefersReducedMotion) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      section.style.visibility = 'visible';
      return;
    }

    // Initialize parallax layers
    const layers = Array.from({ length: parallaxLayers }, (_, i) => {
      const layer = document.createElement('div');
      layer.style.position = 'absolute';
      layer.style.top = '0';
      layer.style.left = '0';
      layer.style.width = '100%';
      layer.style.height = '100%';
      layer.style.zIndex = String(parallaxLayers - i);
      section.appendChild(layer);
      return layer;
    });

    const animateParallax = (progress: number) => {
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        gsap.to(layer, { y: -progress * speed * 100, ease: 'none' });
      });
    };

    let scrollTrigger: { kill: () => void } | null = null;
    try {
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: ({ progress }) => animateParallax(progress),
      });
    } catch (e) {
      // ScrollTrigger may fail in test environments
    }

    // Entrance animation for the entire section
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: delay / 1000,
      ease: 'power3.out',
    });

    // Exit animation using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            gsap.to(section, {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: 'power3.in',
              onComplete: () => {
                section.style.visibility = 'hidden';
              },
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(section);

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      try {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      } catch (e) {
        // ScrollTrigger may fail in test environments
      }
      layers.forEach((layer) => {
        if (layer && section.contains(layer)) {
          section.removeChild(layer);
        }
      });
      observer.disconnect();
    };
  }, [delay, parallaxLayers]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
}