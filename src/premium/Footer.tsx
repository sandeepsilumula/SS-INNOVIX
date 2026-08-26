'use client';

import AnimatedSection from './AnimatedSection';

const FOOTER_NAV = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'mailto:hello@ssinnovix.com',
    label: 'Email',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const LEGAL_LINKS = [
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'Terms' },
  { href: '#', label: 'Cookie Policy' },
];

export default function Footer() {
  return (
    <footer className="relative py-16 lg:py-20 border-t border-white/10 bg-[var(--color-void-black)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Marquee tagline */}
        <AnimatedSection delay={0} className="mb-6">
          <div className="relative overflow-hidden hidden lg:block">
            <div
              className="flex items-center gap-8 whitespace-nowrap"
              style={{
                animation: 'marquee 20s linear infinite',
              }}
            >
              {[1, 2].map((i) => (
                <span key={i} className="text-xs tracking-widest font-mono text-lamp-cream/60 px-4">
                  Premium digital products • Crafted for impact • Built to last • Trusted by innovators •
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Three-zone layout */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left: Brand */}
            <div className="text-center md:text-left">
              <p className="text-lamp-cream text-sm font-medium tracking-wider uppercase mb-2">
                S&S Innovix
              </p>
              <p className="text-white/40 text-sm">
                Premier Digital Products
              </p>
              <p className="text-white/30 text-xs mt-4 tracking-wide">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            {/* Center: Navigation */}
            <nav
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
              aria-label="Footer navigation"
            >
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 hover:text-lamp-cream text-sm font-medium tracking-wide uppercase transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Social Icons */}
            <div className="flex items-center justify-center gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-lamp-cream transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Divider & Legal */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs tracking-wide">
              Built with editorial craft and production-grade code.
            </p>
            <div className="flex items-center gap-6 text-white/30 text-xs tracking-wide">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}