'use client';

import DoubleBezelCard from './DoubleBezelCard';
import FrostedBadge from './FrostedBadge';
import AnimatedSection from './AnimatedSection';

interface ServiceCardData {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  colSpan: string;
  rowSpan: string;
  lgColSpan: string;
}

const SERVICES: ServiceCardData[] = [
  {
    id: 'app-dev',
    badge: 'Application Development',
    title: 'Custom App Development',
    description:
      'Full-stack applications architected for scale. React, Node.js, TypeScript — production-grade from day one.',
    features: [
      'React / Next.js / TypeScript',
      'Node.js / PostgreSQL / Redis',
      'AWS / Docker / CI-CD',
      'Test coverage > 90%',
    ],
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    lgColSpan: 'lg:col-span-7',
  },
  {
    id: 'landing-pages',
    badge: 'Landing Pages',
    title: 'High-Performance Landing Pages',
    description:
      'Cinematic, conversion-focused pages that load instantly. Editorial design meets Core Web Vitals excellence.',
    features: [
      'Lighthouse 98+ scores',
      'GSAP / Lenis animations',
      'Edge deployment (Vercel/Cloudflare)',
      'A/B testing ready',
    ],
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    lgColSpan: 'lg:col-span-5',
  },
  {
    id: 'digital-products',
    badge: 'Digital Products',
    title: 'End-to-End Product Delivery',
    description:
      'From concept to launch and beyond. Strategy, design, development, and ongoing partnership for digital products that ship.',
    features: [
      'Discovery & technical strategy',
      'Design systems & component libraries',
      'Ongoing retainer partnerships',
      'Performance monitoring & SLA',
    ],
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    lgColSpan: 'lg:col-span-6',
  },
  {
    id: 'retainer',
    badge: 'Retainer Partnerships',
    title: 'Ongoing Retainer Support',
    description:
      'Long-term technical partnership. We maintain, optimize, and evolve your digital products so your team can focus on growth.',
    features: [
      'Dedicated engineering capacity',
      'Proactive monitoring & alerts',
      'Monthly strategy & roadmap sessions',
      'Priority response SLA',
    ],
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    lgColSpan: 'lg:col-span-6',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-40"
      style={{ background: 'var(--color-void-black)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Centered */}
        <AnimatedSection delay={0.1} className="mb-16 lg:mb-24">
          <div className="text-center" data-stagger-item data-delay="1">
            <p className="font-medium text-xs tracking-widest uppercase text-white/40 mb-4">
              What we do
            </p>
            <h2 className="font-display tracking-tight text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl lh-tight font-light">
              Services{' '}
              <em className="font-serif italic font-medium text-[var(--color-lamp-cream)]">
                crafted
              </em>{' '}
              for impact
            </h2>
          </div>
        </AnimatedSection>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.id} delay={0.2 + index * 0.1}>
              <article
                className={`${service.colSpan} ${service.rowSpan} ${service.lgColSpan}`}
                data-stagger-item
                data-delay={`${index + 1}`}
              >
                <DoubleBezelCard variant="charcoal" hoverElevation={true} className="h-full">
                  <div className="h-full flex flex-col p-8 md:p-10">
                    {/* Frosted Badge */}
                    <FrostedBadge className="mb-6 w-fit">
                      {service.badge}
                    </FrostedBadge>

                    {/* Title */}
                    <h3 className="font-display font-medium text-fluid-xl md:text-fluid-2xl lg:text-fluid-3xl lh-snug tracking-tight mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-white/60 lh-relaxed mb-8 flex-1 text-fluid-sm md:text-fluid-md">
                      {service.description}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-3 font-medium text-white/50 text-fluid-sm">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[var(--color-lamp-cream)] flex-shrink-0 mt-1.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DoubleBezelCard>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}