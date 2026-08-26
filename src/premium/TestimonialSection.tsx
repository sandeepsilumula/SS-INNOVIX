'use client';

import AnimatedSection from './AnimatedSection';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "S&S Innovix rebuilt our entire platform from zero to production in 8 weeks. The result? 340% increase in user engagement within the first month.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechVista",
    metric: "340%",
    initials: "SC",
  },
  {
    quote: "Their attention to detail is unlike any agency I've worked with. Every animation, every transition — intentional. Our conversion rate jumped 210%.",
    author: "Marcus Webb",
    role: "VP Digital",
    company: "NexusCorp",
    metric: "210%",
    initials: "MW",
  },
  {
    quote: "They didn't just build us a website — they built us a competitive advantage. Revenue up 180% in Q1 after launch. Worth every penny.",
    author: "Priya Sharma",
    role: "CEO",
    company: "Quantum Labs",
    metric: "180%",
    initials: "PS",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="relative py-24 px-6 bg-[var(--color-bg-tertiary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16 text-center" delay={0.1}>
          <h2 className="font-display-lg text-white mb-4">
            What Our <span className="italic font-normal">Clients</span> Say
          </h2>
          <p className="font-body-md text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real results from real partnerships
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8" delay={0.2}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative">
              <div className="bg-charcoal border border-graphite p-8 h-full flex flex-col transition-all duration-300 hover:border-lamp-cream/30">
                {/* Metric */}
                <div className="font-display-lg text-lamp-cream mb-6">
                  {t.metric}
                </div>

                {/* Quote text */}
                <p className="font-body-md text-white/90 leading-relaxed mb-8 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
