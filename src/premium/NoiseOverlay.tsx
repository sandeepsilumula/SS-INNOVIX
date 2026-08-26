'use client';

import { useEffect, useState } from 'react';

export default function NoiseOverlay() {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setShouldRender(!mediaQuery.matches);
    setShouldRender(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!shouldRender) return null;

  const noiseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  `;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,${btoa(noiseSvg)}")`,
        backgroundSize: '256px 256px',
        backgroundRepeat: 'repeat',
      }}
      aria-hidden="true"
    />
  );
}