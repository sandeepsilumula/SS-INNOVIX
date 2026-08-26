'use client';

import AnimatedSection from './AnimatedSection';
import DoubleBezelCard from './DoubleBezelCard';
import { useRef, useEffect } from 'react';

const sandeepImg = new URL('../assets/Profile images/Sandeep.png', import.meta.url).href;
const sumithImg = new URL('../assets/Profile images/Sumith.jpeg', import.meta.url).href;

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const max = 6;
      el.style.transform = `perspective(1000px) rotateX(${-dy * max}deg) rotateY(${dx * max}deg) scale(1.01)`;
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [reduced]);

  return <div ref={ref} className={`transition-transform duration-500 ease-out-expo ${className || ''}`}>{children}</div>;
}

const TEAM_MEMBERS = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Lead Engineer',
    bio: 'Ex-Stripe, AWS. 15+ years building distributed systems. Writes the architecture docs others reference.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    alt: 'Sarah Chen - Founder & Lead Engineer',
  },
  {
    name: 'Marcus Webb',
    role: 'Design Lead',
    bio: 'Ex-Airbnb, Figma. Design systems at scale. Believes type is the strongest brand signal.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    alt: 'Marcus Webb - Design Lead',
  },
  {
    name: 'Sandeep Silumula',
    role: 'Backend Architect',
    bio: 'Ex-Netflix, Datadog. PostgreSQL internals, observability, platform engineering. Hates unnecessary complexity.',
    imageUrl: sandeepImg,
    alt: 'Sandeep Silumua - Backend Architect',
  },
  {
    name: 'Sumith Shirodkar',
    role: 'Frontend Lead',
    bio: 'Ex-Vercel, Shopify. React performance, animation choreography, Core Web Vitals obsessive.',
    imageUrl: sumithImg,
    alt: 'Sumith Shirodkar - Frontend Lead',
  },
];

const TEAM_STATS = [
  { value: '12', label: 'Senior Engineers' },
  { value: '8', label: 'Avg Years Exp' },
  { value: '47+', label: 'Projects Shipped' },
  { value: '94%', label: 'Client Retention' },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative py-24 lg:py-40"
      style={{ background: 'var(--color-void-black)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-16 md:mb-20">
            <p className="font-display font-medium text-xs tracking-wider uppercase text-smoke mb-4">
              The people
            </p>
            <h2 className="font-display font-light tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
              Small team, <em className="font-body italic font-medium text-lamp-cream">outsized</em> impact
            </h2>
            <p className="font-display font-normal text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Senior engineers and designers who've shipped at scale. No juniors learning on your budget.
            </p>
          </div>
        </AnimatedSection>

        {/* Team Grid - 4 columns */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <TiltCard className="team-card">
                <DoubleBezelCard
                  key={member.name}
                  variant="charcoal"
                  hoverElevation
                >
                  <article className="group">
                    <div className="relative aspect-[3/4] rounded-[1.625rem] overflow-hidden mb-6 bg-charcoal">
                      <img
                        src={member.imageUrl}
                        alt={member.alt}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          filter: 'grayscale(100%) contrast(115%) brightness(90%)',
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-display font-medium text-lg tracking-tight mb-1">
                        {member.name}
                      </h3>
                      <p className="font-display font-normal text-sm text-lamp-cream tracking-wider uppercase mb-2">
                        {member.role}
                      </p>
                      <p className="font-display font-normal text-sm text-white/50 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                </DoubleBezelCard>
              </TiltCard>
            ))}
          </div>
        </AnimatedSection>

        {/* Team stats / summary */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {TEAM_STATS.map((stat) => (
              <DoubleBezelCard
                key={stat.label}
                variant="charcoal"
                className="text-center p-6"
              >
                <div className="font-display font-light text-5xl lg:text-6xl tracking-tight text-lamp-cream mb-2">
                  {stat.value}
                </div>
                <div className="font-display font-normal text-white/50 text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </DoubleBezelCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}