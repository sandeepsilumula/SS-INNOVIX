'use client';

import { useEffect } from 'react';

export default function ClientLogos() {
  const marqueeText = 'TRUSTED BY INDUSTRY LEADERS WORLDWIDE  ';
  const repeatCount = 8;

  // Inject marquee animation keyframes on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="py-16 px-6 bg-[var(--color-bg-tertiary)] overflow-hidden border-y border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="relative" aria-hidden="true">
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: 'marquee 30s linear infinite',
              width: 'max-content',
            }}
          >
            {Array.from({ length: repeatCount }).map((_, i) => (
              <span key={i} className="font-mono text-xs font-medium tracking-[-0.02em] text-gray-400 pr-16 select-none">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
