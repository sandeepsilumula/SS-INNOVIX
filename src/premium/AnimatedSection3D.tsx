"use client";
import { useRef, useEffect } from "react";

interface AnimatedSection3DProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
}

export default function AnimatedSection3D({
  children,
  className = "",
  layers = 3,
}: AnimatedSection3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "none";
          el.style.opacity = "0";
          el.style.transform = "perspective(1000px) translateY(40px)";
          requestAnimationFrame(() => {
            el.style.transition =
              "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), " +
              "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.opacity = "1";
            el.style.transform = "perspective(1000px) translateY(0)";
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [layers]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}