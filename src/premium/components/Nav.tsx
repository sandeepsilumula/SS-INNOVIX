'use client';
import { useState, useEffect, useCallback } from 'react';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center justify-between">
          <a href="/" className="font-visuelt font-medium text-sm tracking-wider uppercase text-lamp-cream">
            S&S Innovix
          </a>
          <button onClick={toggle} className="text-pure-white p-2" aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1.5 ${open ? '-rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-voidBlack/90 backdrop-blur-3xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="font-visuelt font-light text-4xl text-pure-white hover:text-lamp-cream"
                style={{ animation: `fadeInUp 600ms ${i * 100 + 200}ms var(--ease-spring) both` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}