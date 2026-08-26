import ScrollProgress from './premium/ScrollProgress';
import HeroSection from './premium/HeroSection';
import NoiseOverlay from './premium/NoiseOverlay';
import PageIntro from './premium/PageIntro';
import TrustBar from './premium/TrustBar';
import ServicesSection from './premium/ServicesSection';
import CaseStudiesSection from './premium/CaseStudiesSection';
import ProcessSection from './premium/ProcessSection';
import TeamSection from './premium/TeamSection';
import CTASection from './premium/CTASection';
import ContactForm from './premium/ContactForm';
import GlassNav from './premium/GlassNav';
import Footer from './premium/Footer';

export default function InnovixLanding() {
  return (
    <>
      {/* Skip to content link — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-medium focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-void-black)]"
      >
        Skip to main content
      </a>

      {/* 1. NoiseOverlay — fixed, z-50 */}
      <NoiseOverlay />

      {/* 2. GlassNav — fixed, z-40 with ScrollProgress inside */}
      <GlassNav />
      <ScrollProgress />

      {/* 3. PageIntro — fixed, z-60 */}
      <PageIntro />

      {/* 4. Hero Section — full viewport cinematic */}
      <HeroSection />

      {/* Main content landmark — all page sections from Hero through Contact Form */}
      <main id="main-content">
        {/* 5. Trust Bar — static logo grid */}
        <TrustBar />

        {/* 6. Services Section — elevated charcoal cards with frosted badges (id="services") */}
        <ServicesSection />

        {/* 7. Case Studies Section — cinematic media cards with bottom-left overlay (id="work") */}
        <CaseStudiesSection />

        {/* 8. Process Section — editorial alternating blocks (id="process") */}
        <ProcessSection />

        {/* 9. Team Section — clean portraits with role (id="team") */}
        <TeamSection />

        {/* 10. CTA Section — centered conversion block */}
        <CTASection />

        {/* 11. Contact Form — id="contact" for nav linking */}
        <ContactForm />

        {/* 12. Footer */}
        <Footer />
      </main>
    </>
  );
}
