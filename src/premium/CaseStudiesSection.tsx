'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { animate } from 'motion';
import AnimatedSection from './AnimatedSection';
import DoubleBezelCard from './DoubleBezelCard';
import FrostedBadge from './FrostedBadge';
import SkeletonLoader from './SkeletonLoader';
import { springPresets } from './hooks/useSpring';

const caseStudies = [
  {
    id: 'cs-1',
    badge: 'Web App',
    title: 'Baker & Vine — Hospitality Platform',
    description: 'Full-stack ordering system for a local restaurant group. 40% increase in online orders, zero-downtime launch.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
    alt: 'Baker & Vine hospitality platform',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind'],
    featured: false,
  },
  {
    id: 'cs-2',
    badge: 'Landing Page',
    title: 'Apex Fitness — Brand Launch',
    description: 'Landing page for a boutique fitness studio opening. 280+ memberships sold pre-launch, 98 Lighthouse score.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    alt: 'Apex Fitness brand launch landing page',
    techStack: ['Astro', 'React', 'GSAP', 'Tailwind', 'Vercel'],
    featured: false,
  },
  {
    id: 'cs-3',
    badge: 'E-Commerce',
    title: 'Cedar & Oak — E-Commerce Revamp',
    description: 'Performance overhaul of a local furniture store. 3.2x faster page loads, 27% lift in conversion rate.',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    alt: 'Cedar & Oak e-commerce revamp',
    techStack: ['Next.js', 'Shopify Headless', 'Sanity CMS', 'Vercel'],
    featured: false,
  },
  {
    id: 'cs-4',
    badge: 'Web App',
    title: 'Northlight Docs — SaaS Dashboard',
    description: 'Internal tooling for a legal document automation firm. 90% reduction in manual doc prep, sub-200ms API latency.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    alt: 'Northlight Docs SaaS dashboard',
    techStack: ['Remix', 'PostgreSQL', 'Prisma', 'tRPC', 'Playwright'],
    featured: true,
  },
];

export default function CaseStudiesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCaseStudies, setLoadedCaseStudies] = useState<Array<typeof caseStudies[number]>>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate async data fetch
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoadedCaseStudies(caseStudies);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Cinematic spring animation for image hover
  const handleMouseEnter = useCallback((id: string) => {
    const img = imageRefs.current.get(id);
    if (!img) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      img.style.transform = 'scale(1.05)';
      return;
    }

    animate(img, { scale: 1.05 }, springPresets.cinematic);
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    const img = imageRefs.current.get(id);
    if (!img) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      img.style.transform = 'scale(1)';
      return;
    }

    animate(img, { scale: 1 }, springPresets.cinematic);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 lg:py-40"
      style={{ background: 'var(--color-void-black)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-16 md:mb-20">
            <p className="font-visuelt font-weight-500 text-xs tracking-wider uppercase text-smoke mb-4">
              Selected work
            </p>
            <h2 className="font-visuelt font-weight-300 tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
              Case studies <em className="font-serif italic text-lamp-cream">shipped</em>
            </h2>
          </div>
        </AnimatedSection>

        {/* Case Studies Grid with Skeleton Loading */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading case studies"
          >
            <SkeletonLoader count={4} height={300} />
          </div>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {loadedCaseStudies.map((study, index) => (
                <DoubleBezelCard
                  key={study.id}
                  variant="media"
                  hoverElevation={true}
                  className={`
                    relative group rounded-xl overflow-hidden
                    ${study.featured ? 'lg:col-span-3 aspect-[16/9]' : 'aspect-[4/3]'}
                    [animation-delay:${(index + 1) * 100}ms]
                  `}
                >
                  <div className="relative w-full h-full overflow-hidden" onMouseEnter={() => handleMouseEnter(study.id)} onMouseLeave={() => handleMouseLeave(study.id)}>
                    {/* Full-bleed image with filter effects - cinematic spring hover */}
                    <img
                      ref={(el) => {
                        if (el) imageRefs.current.set(study.id, el);
                      }}
                      src={study.imageUrl}
                      alt={study.alt}
                      className="w-full h-full object-cover brightness-40 saturate-70 contrast-110 transition-none"
                      style={{
                        transformOrigin: 'center center',
                        willChange: 'transform',
                      }}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void-black)]/90 via-[var(--color-void-black)]/60 to-transparent pointer-events-none" />
                    {/* Frosted badge top-right */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <FrostedBadge className="px-3 py-1.5">
                        {study.badge}
                      </FrostedBadge>
                    </div>
                    {/* Bottom-left overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10 pointer-events-none">
                      <h3 className="font-visuelt font-weight-500 text-lg md:text-xl lg:text-2xl tracking-tight mb-3">
                        {study.title}
                      </h3>
                      <p className="font-visuelt font-weight-400 text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-xs lg:max-w-md mb-5">
                        {study.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {study.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-visuelt font-weight-500 tracking-wide uppercase bg-white/10 backdrop-blur-sm rounded-full text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DoubleBezelCard>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}