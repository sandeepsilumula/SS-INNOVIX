import { useEffect, useState } from 'react';

const SITE_NAME = 'S&S Innovix';

export default function PageIntro() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setComplete(true);
      return;
    }

    const t1 = setTimeout(() => setComplete(true), 2600);

    return () => {
      clearTimeout(t1);
    };
  }, []);

  if (complete) return null;

  return (
    <div className="intro-layer fixed inset-0 z-60 flex flex-col items-center justify-center bg-voidBlack" role="presentation">
      {/* Progress bar - bottom edge, full width */}
      <div className="intro-progress-bar absolute bottom-0 left-0 w-full h-[2px] bg-lamp-cream" />

      {/* Brand logo block - fade-in 800ms ease-fluid, then slide-up 600ms ease-fluid 2s delay */}
      <div
        className="intro-logo flex items-center justify-center w-20 h-20 border border-lamp-cream/40 mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(245,245,240,0.08), rgba(245,245,240,0.12))',
          animation: 'intro-logo-pulse 1.5s ease-in-out infinite',
        }}
      >
        <span className="text-2xl font-medium tracking-[-0.02em] text-lamp-cream">S&S</span>
      </div>

      {/* Site name – letter stagger */}
      <div className="flex overflow-hidden">
        {SITE_NAME.split('').map((char, i) => (
          <span
            key={i}
            className="intro-letter inline-block text-white text-xl sm:text-2xl font-medium tracking-[-0.02em]"
            style={{ animationDelay: `${1.2 + i * 0.05}s` }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </div>
    </div>
  );
}