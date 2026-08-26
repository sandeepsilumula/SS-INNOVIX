'use client';

import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import AnimatedSection from './AnimatedSection';

const trustSignals = [
  'Direct to founders, no account managers',
  'NDA-ready for sensitive briefs',
  'Fixed-scope or retainer options',
];

export default function CTASection() {
  return (
    <AnimatedSection delay={0.2} className="min-h-[60vh] flex items-center justify-center py-24 lg:py-40 relative bg-voidBlack overflow-hidden">
      {/* Atmospheric background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, var(--color-lamp-cream) / 0.1 0%, transparent 70%),
            radial-gradient(ellipse at bottom center, var(--color-lamp-cream) / 0.06 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full px-6 text-center">
        <div className="reveal-stagger">
          {/* Eyebrow */}
          <p
            data-stagger-item
            data-delay="1"
            className="font-display font-normal text-sm lg:text-base tracking-widest uppercase text-lamp-cream/70 mb-6"
          >
            Ready to begin
          </p>

          {/* Headline */}
          <h2
            data-stagger-item
            data-delay="2"
            className="font-display font-light text-4xl lg:text-6xl xl:text-7xl leading-[1.04] text-white mb-8"
          >
            <span className="cta-underline-sweep inline-block">
              Let&apos;s build{' '}
              <em className="font-serif italic text-lamp-cream">something</em>{' '}
              real
            </span>
          </h2>

          {/* Subcopy */}
          <p
            data-stagger-item
            data-delay="3"
            className="font-display font-normal text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            We partner with ambitious teams to design and ship premium digital products.
            No middlemen, no handoff friction — just outcomes.
          </p>

          {/* Primary CTA */}
          <div data-stagger-item data-delay="4" className="mb-16">
            <MagneticButton
              href="#contact"
              variant="primary"
              className="px-12 py-6 text-lg"
              style={{ fontSize: '1.125rem' }}
            >
              Start a project
            </MagneticButton>
          </div>

          {/* Trust signals */}
          <div
            data-stagger-item
            data-delay="5"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base"
            role="list"
            aria-label="Trust signals"
          >
            {trustSignals.map((signal, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-lamp-cream/80"
                role="listitem"
              >
                <Check
                  className="w-5 h-5 flex-shrink-0 text-lamp-cream"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span className="font-display font-normal">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}