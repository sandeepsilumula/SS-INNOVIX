'use client';

import AnimatedSection from './AnimatedSection';
import DoubleBezelCard from './DoubleBezelCard';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We immerse in your business — stakeholders, users, constraints, aspirations. Technical architecture decisions are made here, not retrofitted later.',
    features: [
      'Stakeholder workshops & user research',
      'Technical architecture & stack selection',
      'Project roadmap & milestone definition',
      'Risk assessment & mitigation planning',
    ],
    quote: '"Clarity at the start prevents chaos at the end."',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    alt: 'Discovery workshop',
    textLeft: true,
  },
  {
    number: '02',
    title: 'Design & Systems',
    description:
      "Design systems, not pages. Component libraries with documented tokens, accessibility baked in, motion choreographed. Consistency scales; one-offs don't.",
    features: [
      'Design system & component library',
      'Interactive prototypes (Figma)',
      'Motion & micro-interaction specs',
      'Accessibility audit (WCAG 2.1 AA)',
    ],
    quote: '"Systems outlast sprints. Components outlive redesigns."',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    alt: 'Design system work',
    textLeft: false,
  },
  {
    number: '03',
    title: 'Development & Quality',
    description:
      'Type-safe, tested, observable code. Trunk-based development, automated gates, preview deployments on every PR. Production is just another environment.',
    features: [
      'TypeScript strict mode, ESLint, Prettier',
      'Unit + integration + E2E test suite',
      'Preview deployments per PR',
      'Observability: logs, metrics, traces',
    ],
    quote: '"Code is read more than written. Write for the next maintainer."',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
    alt: 'Code development',
    textLeft: true,
  },
  {
    number: '04',
    title: 'Launch & Evolve',
    description:
      'Zero-downtime deployments, feature flags, gradual rollouts. Post-launch we stay — monitoring, iterating, scaling. Retainers keep velocity compounding.',
    features: [
      'Blue-green / canary deployments',
      'Feature flags & gradual rollout',
      'Performance monitoring & alerting',
      'Ongoing retainer partnership',
    ],
    quote: '"Launch is the beginning. Evolution is the product."',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    alt: 'Launch monitoring',
    textLeft: false,
  },
];

export default function ProcessSection() {
  return (
    <AnimatedSection delay={0.1} className="relative py-24 lg:py-40 bg-[var(--color-void-black)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20" data-stagger-item data-delay="1">
          <p className="font-mono text-xs tracking-wider uppercase text-smoke mb-4">
            How we work
          </p>
          <h2 className="font-display font-medium tracking-tight text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl lh-tight">
            Our{' '}
            <em className="font-serif italic font-medium text-lamp-cream">
              process
            </em>{' '}
            , refined
          </h2>
        </div>

        {/* Process Steps - Alternating layout */}
        <div className="relative space-y-16 lg:space-y-24">
          {/* Vertical connector line behind steps */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden lg:block pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, var(--color-accent-primary) 15%, var(--color-accent-primary) 85%, transparent 100%)',
              opacity: 0.25,
            }}
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.number}
              className={`
                relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start
                ${step.textLeft ? '' : 'lg:[grid-template-areas:_\"visual_text\"_]'}
              `}
              data-stagger-item
              data-delay={index + 2}
            >
              {/* Connector node dot at center */}
              <div
                className="absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full hidden lg:block"
                style={{
                  background: 'var(--color-accent-primary)',
                  boxShadow: '0 0 12px rgba(84, 179, 194, 0.6)',
                }}
                aria-hidden="true"
              />
              {/* Text Column */}
              <div
                className={`
                  ${step.textLeft ? 'lg:order-1' : 'lg:order-2'}
                  text-left lg:text-right
                `}
              >
                <div className="flex items-center gap-4 mb-6 lg:justify-end">
                  {step.textLeft ? (
                    <>
                      <span className="font-display font-medium text-3xl md:text-4xl tracking-tight text-white/30">
                        {step.number}
                      </span>
                      <div className="w-24 h-px bg-gradient-to-r from-lamp-cream to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-px bg-gradient-to-r from-transparent to-lamp-cream" />
                      <span className="font-display font-medium text-3xl md:text-4xl tracking-tight text-white/30">
                        {step.number}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-display font-medium text-2xl lg:text-3xl tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0 lg:mr-auto">
                  {step.description}
                </p>
                <ul className="space-y-3 text-white/50 lg:text-right">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 lg:justify-end">
                      <span className="w-2 h-2 rounded-full bg-lamp-cream flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Column - DoubleBezelCard variant="media" */}
              <div
                className={`
                  group relative
                  ${step.textLeft ? 'lg:order-2' : 'lg:order-1'}
                `}
              >
                <DoubleBezelCard variant="media" hoverElevation={true} className="aspect-square lg:aspect-[4/3]">
                  <div className="relative w-full h-full overflow-hidden rounded-[1.625rem]">
                    <img
                      src={step.imageUrl}
                      alt={step.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    {/* Vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void-black)]/60 via-transparent to-transparent" />
                    {/* Bottom quote overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white/70 text-sm leading-relaxed font-sans">
                      {step.quote}
                    </div>
                  </div>
                </DoubleBezelCard>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}