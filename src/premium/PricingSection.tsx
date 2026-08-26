'use client';

import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const TIERS: PricingTier[] = [
  {
    name: 'MVP',
    price: '$15,000',
    period: 'one-time',
    description: 'Validated concept → production-ready minimum viable product',
    featured: false,
    cta: 'Start MVP',
    features: [
      'Discovery & design sprint',
      'Core feature development',
      'Responsive web application',
      'Performance-optimized launch',
      '30-day post-launch support',
      'Source code & documentation',
    ],
  },
  {
    name: 'Growth',
    price: '$45,000',
    period: 'engagement',
    description: 'Full-scale product with advanced features and growth infrastructure',
    featured: true,
    cta: 'Start Engagement',
    features: [
      'Everything in MVP, plus:',
      'Custom design system & component library',
      'Advanced integrations (CRM, analytics, payments)',
      'User auth + role management',
      'Admin dashboard + CMS',
      '90-day comprehensive support',
      'Team training & handoff',
    ],
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: 'monthly retainer',
    description: 'Ongoing partnership for continuous iteration and expansion',
    featured: false,
    cta: 'Discuss Retainer',
    features: [
      'Continuous feature development',
      'A/B testing + optimization',
      'Dedicated engineering team',
      'Priority support (4h SLA)',
      'Analytics + growth reporting',
      'Scalability architecture reviews',
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-6 bg-[var(--color-bg-tertiary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16 text-center" delay={0.1}>
          <h2 className="font-display-lg text-white mb-4">
            Pricing
          </h2>
          <p className="font-body-md text-gray-300 max-w-2xl mx-auto">
            No hidden fees. No scope creep. Clear engagements with defined deliverables.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8" delay={0.2}>
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className={`relative p-8 border h-full transition-all duration-300 ${
                tier.featured
                  ? 'bg-charcoal border-lamp-cream/30'
                  : 'bg-charcoal border-graphite hover:border-lamp-cream/30'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-xs text-lamp-cream border border-lamp-cream/30">
                  Most Popular
                </div>
              )}

              
              <div className="mb-6">
                <h3 className="text-xl font-medium text-white mb-2 font-sans">{tier.name}</h3>
                <p className="font-body-md text-gray-300 mb-4">{tier.description}</p>
                <div className="font-display-lg text-white">{tier.price}</div>
              </div>

              <hr className="border-gray-700 mb-6" />

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 font-body-md text-gray-300">
                    <span className="text-lamp-cream mt-0.5 flex-shrink-0">→</span>
                    <span className={feature.startsWith('Everything') ? 'italic text-gray-300' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                href="#contact"
                variant={tier.featured ? 'primary' : 'ghost'}
                className="w-full"
              >
                {tier.cta}
              </MagneticButton>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <p className="font-body-md text-gray-300">
            All engagements include a 10-15% buffer for scope management and surprise discoveries.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
