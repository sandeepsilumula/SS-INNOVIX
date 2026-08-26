'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, springPresets } from './hooks/useSpring';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
];

const scrollToSection = (href: string) => {
  const id = href.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export default function GlassNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileNavLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtaRef = useRef<HTMLAnchorElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  const { animateSpring, cancelAnimations } = useSpring();

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll-spy: track which section is in view, slide active pill
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.replace('#', '')))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let bestIdx = -1;
        let bestRatio = -1;
        entries.forEach((entry) => {
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx === -1) return;
          const ratio = entry.intersectionRatio ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0 && bestRatio > 0) setActiveIndex(bestIdx);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Slide pill under active link using measured offsets
  useEffect(() => {
    const pill = pillRef.current;
    const link = linkRefs.current[activeIndex];
    if (!pill || !link) return;

    const navEl = navRef.current;
    if (!navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    const targetX = linkRect.left - navRect.left;
    const targetW = linkRect.width;

    if (reducedMotion) {
      pill.style.transform = `translateX(${targetX}px)`;
      pill.style.width = `${targetW}px`;
      return;
    }

    animateSpring(pill, {
      transform: `translateX(${targetX}px)`,
      width: targetW,
    }, { ...springPresets.ui, duration: 0.4 });
  }, [activeIndex, reducedMotion, animateSpring]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    scrollToSection(href);
    closeMenu();
  }, [closeMenu]);

  // Mobile menu animation with springs (interruptible)
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = Array.from(mobileNavLinksRef.current).filter(Boolean) as HTMLElement[];
    const cta = mobileCtaRef.current;

    if (!overlay || links.length === 0) return;

    if (isOpen) {
      // Enter animation - from current presentation value
      animateSpring(overlay, { opacity: 1 }, springPresets.ui);

      links.forEach((link, i) => {
        // Set initial state for enter
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.clipPath = 'inset(100% 0 0 0)';

        animateSpring(
          link,
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
          { ...springPresets.ui, duration: 0.5, delay: i * 0.06 }
        );
      });

      if (cta) {
        cta.style.opacity = '0';
        cta.style.transform = 'translateY(30px)';
        cta.style.clipPath = 'inset(100% 0 0 0)';

        animateSpring(
          cta,
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
          { ...springPresets.ui, duration: 0.5, delay: links.length * 0.06 }
        );
      }
    } else {
      // Exit animation - from current presentation value (interruptible)
      animateSpring(overlay, { opacity: 0 }, springPresets.ui);

      links.forEach((link) => {
        animateSpring(
          link,
          { opacity: 0, y: -30, clipPath: 'inset(100% 0 0 0)' },
          { ...springPresets.ui, duration: 0.3 }
        );
      });

      if (cta) {
        animateSpring(
          cta,
          { opacity: 0, y: -30, clipPath: 'inset(100% 0 0 0)' },
          { ...springPresets.ui, duration: 0.3 }
        );
      }
    }

    // Overlay pointer events
    overlay.style.pointerEvents = isOpen ? 'auto' : 'none';

    return () => {
      if (overlay) cancelAnimations(overlay);
      links.forEach((link) => cancelAnimations(link));
      if (cta) cancelAnimations(cta);
    };
  }, [isOpen, reducedMotion, animateSpring, cancelAnimations]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-1/2 -translate-x-1/2 z-40
          mt-6 mx-auto w-max
          rounded-full p-[6px]
          bg-[var(--glass-opacity-nav)]
          ring-1 ring-[var(--color-border-subtle)]
          backdrop-blur-2xl
          transition-all duration-300 ease-[var(--ease-out-expo)]
          ${scrolled ? 'bg-[var(--glass-opacity-nav-scrolled)] ring-[var(--color-border-muted)]' : ''}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`
            relative flex items-center gap-6
            px-8 py-3
            rounded-full
            bg-[var(--glass-opacity-inner-bg)]
            backdrop-blur-2xl
            ring-1 ring-inset ring-[var(--glass-opacity-inner-ring)]
          `}
        >
          <a
            href="#top"
            className="flex items-center gap-2 font-label-md tracking-widest text-white hover:text-[var(--color-accent-primary)] transition-colors duration-200 ease-out"
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#top');
              closeMenu();
            }}
          >
            <span className="text-xl font-medium tracking-[-0.02em]">S&S</span>
          </a>

          <div className="hidden md:flex items-center gap-1 relative">
            {/* Sliding active pill */}
            <div
              ref={pillRef}
              className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
              style={{
                background: 'var(--glass-opacity-inner-bg-strong)',
                boxShadow: '0 0 12px rgba(84, 179, 194, 0.3), inset 0 0 1px rgba(84, 179, 194, 0.4)',
                border: '1px solid var(--color-border-subtle)',
                width: 0,
              }}
              aria-hidden="true"
            />
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                ref={(el) => (linkRefs.current[i] = el)}
                href={link.href}
                className={`
                  relative px-4 py-2 z-10
                  font-label-sm tracking-widest
                  ${i === activeIndex ? 'text-white' : 'text-white/70 hover:text-white'}
                  transition-colors duration-200 ease-out
                `}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(i);
                  handleNavClick(link.href);
                }}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center ml-2">
            <a
              href="#contact"
              className={`
                relative inline-flex items-center justify-center gap-2
                px-6 py-2.5
                font-label-md tracking-widest
                bg-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]
                text-[var(--color-void-black)]
                rounded-full
                transition-all duration-300 ease-[var(--ease-out-expo)]
                hover:bg-[var(--color-accent-dark)] hover:border-[var(--color-accent-dark)]
                hover:shadow-[0_0_20px_rgba(84,179,194,0.3)]
                active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void-black)]
              `}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              style={{ textDecoration: 'none' }}
            >
              Get Started
            </a>
          </div>

          <button
            ref={hamburgerRef}
            className="md:hidden flex flex-col items-center justify-center gap-4 p-2"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            <span
              className={`
                w-6 h-[2px] bg-white origin-center
                transition-all duration-300 ease-[var(--ease-out-expo)]
                ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}
              `}
              aria-hidden="true"
            />
            <span
              className={`
                w-6 h-[2px] bg-white origin-center
                transition-all duration-300 ease-[var(--ease-out-expo)]
                ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}
              `}
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          ref={overlayRef}
          id="mobile-nav"
          className={`
            fixed inset-0 z-40 md:hidden
            flex flex-col items-center justify-center gap-8
            bg-[var(--glass-opacity-overlay)] backdrop-blur-2xl
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'opacity 300ms ease-out',
          }}
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              ref={(el) => (mobileNavLinksRef.current[index] = el)}
              href={link.href}
              className={`
                text-2xl sm:text-3xl font-label-md tracking-widest
                text-white/70 hover:text-white
                transition-colors duration-200 ease-out
              `}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            ref={mobileCtaRef}
            href="#contact"
            className={`
              mt-4 inline-flex items-center justify-center gap-2
              px-8 py-3.5
              font-label-md tracking-widest
              bg-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]
              text-[var(--color-void-black)]
              rounded-full
              transition-all duration-300 ease-[var(--ease-out-expo)]
              hover:bg-[var(--color-accent-dark)] hover:border-[var(--color-accent-dark)]
              hover:shadow-[0_0_20px_rgba(84,179,194,0.3)]
              active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void-black)]
            `}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            style={{ textDecoration: 'none' }}
          >
            Get Started
          </a>
        </div>
      </nav>
    </>
  );
}