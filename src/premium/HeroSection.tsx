'use client';

import { useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';
import NoiseOverlay from './NoiseOverlay';
import AnimatedSection3D from './AnimatedSection3D';
import { gsap } from 'gsap';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    if (h1Ref.current) {
      gsap.fromTo(
        '.reveal-word',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, delay: 0.5 }
      );
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-start justify-center">
      <AnimatedSection3D className="absolute inset-0 -z-10 w-full h-full object-cover">
        <video
          ref={videoRef}
          src="/herovideo.mp4"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(1.15) saturate(1.4) contrast(1.2)',
          }}
          autoPlay
          muted
          playsInline
          loop={false}
          aria-hidden="true"
        />
      </AnimatedSection3D>

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-void-black) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Content with scroll-triggered entrance animation */}
      <AnimatedSection delay={0.1} className="relative z-10 max-w-7xl w-full px-6 pt-8 lg:pt-12 pb-24 lg:pb-40">

        {/* Brand lockup — semantic div (not h1; the heading is below) */}
        <div
          className="flex flex-col leading-none mb-6"
          style={{ fontFamily: 'var(--font-flexing)' }}
          aria-label="S&S Innovix"
        >
          <span
            className="block"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              color: 'var(--color-accent-primary)',
              lineHeight: '1',
              letterSpacing: '-0.02em',
              textShadow: 'var(--shadow-glow-teal)',
            }}
          >
            S&S
          </span>

          <span
            className="block"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              color: 'var(--color-pure-white)',
              lineHeight: '0.95',
              letterSpacing: '-0.02em',
              textShadow: 'var(--shadow-glow-teal-lg)',
            }}
          >
            INNOVIX
          </span>
        </div>

        {/* Tagline */}
        <p
          className="font-mono text-lg sm:text-xl tracking-widest uppercase text-lamp-cream/70 mb-10"
          data-stagger-item
          data-delay="1"
          style={{ letterSpacing: '0.15em' }}
        >
          {'>'}_ DIGITAL DEVELOPMENT AGENCY
        </p>

        {/* Headline */}
        <h1
          ref={h1Ref}
          className="font-display font-light text-fluid-5xl lg:text-fluid-7xl xl:text-fluid-8xl lh-tight tracking-tight text-white mb-6"
          data-stagger-item
          data-delay="2"
        >
          <span className="reveal-word inline-block">Your</span>{' '}
          <span className="reveal-word inline-block">vision,</span>{' '}
          <span className="reveal-word inline-block">made</span>{' '}
          <em className="font-serif italic font-medium text-lamp-cream">
            <span className="reveal-word inline-block">reality</span>
          </em>
        </h1>

        {/* Subcopy */}
        <p
          className="font-body font-normal text-fluid-lg lg:text-fluid-xl lh-relaxed text-white/60 max-w-xl mb-12"
          data-stagger-item
          data-delay="3"
        >
          We craft digital experiences that transform ambitious ideas into market-defining products. Strategy, design, and engineering — unified under one roof.
        </p>

        {/* Dual CTA */}
        <div
          className="flex flex-wrap items-center gap-4"
          data-stagger-item
          data-delay="4"
        >
          <MagneticButton
            variant="primary"
            href="#contact"
            className="w-auto"
          >
            Start a project
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href="#work"
            className="w-auto"
          >
            View our work
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-6 lg:bottom-16 scroll-cue"
          data-stagger-item
          data-delay="5"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40"
          >
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </div>
      </AnimatedSection>
    </section>
  );
}