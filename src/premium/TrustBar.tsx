'use client';

import DoubleBezelCard from './DoubleBezelCard';
import FrostedBadge from './FrostedBadge';
import AnimatedSection from './AnimatedSection';

const TRUST_LOGOS = [
  { number: '01', name: 'Meridian Capital' },
  { number: '02', name: 'Apex Ventures' },
  { number: '03', name: 'Northlight Studios' },
  { number: '04', name: 'Cedar & Oak' },
  { number: '05', name: 'Baker & Vine' },
  { number: '06', name: 'Sterling Health' },
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      className="relative py-16 border-y border-white/10 bg-[var(--color-bg-primary)]"
      style={{ backgroundColor: 'var(--color-void-black)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label - centered eyebrow */}
        <AnimatedSection delay={0.1}>
          <p className="text-center text-xs font-medium tracking-widest uppercase text-white/40 mb-12">
            Trusted by industry leaders
          </p>
        </AnimatedSection>

        {/* Static grid */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TRUST_LOGOS.map((logo, index) => (
              <AnimatedSection key={logo.name} delay={0.1 + index * 0.1} className="h-full">
                <DoubleBezelCard variant="charcoal" hoverElevation={false} className="h-full flex flex-col items-center justify-center p-6 md:p-8">
                  <div className="flex flex-col items-center text-center">
                    <FrostedBadge className="mb-4">
                      {logo.number}
                    </FrostedBadge>
                    <span className="text-base md:text-lg font-medium tracking-tight text-white/80">
                      {logo.name}
                    </span>
                  </div>
                </DoubleBezelCard>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Subtle divider line */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}