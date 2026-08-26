'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePointerVelocity } from './hooks/usePointerVelocity';
import { useSpring, springPresets } from './hooks/useSpring';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  style?: React.CSSProperties;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled,
  onClick,
  style,
}) => {
  const isAnchor = !!href;
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconWrapperRef = useRef<HTMLSpanElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Track prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { track, getVelocity, clear } = usePointerVelocity();
  const { animateSpring, cancelAnimations } = useSpring();

  const getActiveElement = useCallback(() =>
    isAnchor ? anchorRef.current : buttonRef.current, [isAnchor]);

  // Magnetic effect with spring physics (interruptible, velocity-aware)
  useEffect(() => {
    // Skip magnetic animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const button = getActiveElement();
    if (!button || disabled) return;

    const magneticEffect = (e: Event) => {
      if (disabled) return;

      const me = e as MouseEvent;
      const { left: btnLeft, top: btnTop, width: btnWidth, height: btnHeight } =
        button.getBoundingClientRect();

      // Track velocity for handoff on leave
      track(me.clientX, me.clientY);

      const x = me.clientX - (btnLeft + btnWidth / 2);
      const y = me.clientY - (btnTop + btnHeight / 2);

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 150;
      const pullStrength = Math.max(0, 1 - distance / maxDistance);

      // Use spring for interruptible magnetic pull
      // Cancels any in-flight animation automatically
      cancelAnimations(button);
      animateSpring(button, {
        x: x * pullStrength * 0.15,
        y: y * pullStrength * 0.15,
      }, springPresets.ui);
    };

    const leaveEffect = () => {
      if (disabled) return;

      getVelocity();
      clear();

      // Spring back to center with release velocity handoff
      // Apple: "When a gesture ends, the animation must continue at the finger's exact velocity"
      cancelAnimations(button);
      animateSpring(button, { x: 0, y: 0 }, springPresets.momentum);
    };

    button.addEventListener('mousemove', magneticEffect as EventListener);
    button.addEventListener('mouseleave', leaveEffect as EventListener);
    button.addEventListener('touchmove', magneticEffect as EventListener, { passive: true });
    button.addEventListener('touchend', leaveEffect as EventListener);

    return () => {
      button.removeEventListener('mousemove', magneticEffect);
      button.removeEventListener('mouseleave', leaveEffect);
      cancelAnimations(button);
    };
  }, [isAnchor, disabled, getActiveElement, track, getVelocity, clear, animateSpring, cancelAnimations, prefersReducedMotion]);

  // Trailing icon hover animation (spring-based)
  useEffect(() => {
    // Skip icon animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    if (!iconWrapperRef.current) return;
    const iconEl = iconWrapperRef.current;
    const parentEl = getActiveElement();
    if (!parentEl) return;

    const handleMouseEnter = () => {
      animateSpring(iconEl, {
        x: 4,
        y: -1,
        scale: 1.05,
      }, springPresets.snappy);
    };

    const handleMouseLeave = () => {
      animateSpring(iconEl, {
        x: 0,
        y: 0,
        scale: 1,
      }, springPresets.snappy);
    };

    parentEl.addEventListener('mouseenter', handleMouseEnter);
    parentEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentEl.removeEventListener('mouseenter', handleMouseEnter);
      parentEl.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimations(iconEl);
    };
  }, [isAnchor, getActiveElement, animateSpring, cancelAnimations, prefersReducedMotion]);

  // Cleanup on unmount/disabled change
  useEffect(() => {
    return () => {
      const button = getActiveElement();
      if (button) cancelAnimations(button);
      if (iconWrapperRef.current) cancelAnimations(iconWrapperRef.current);
    };
  }, [getActiveElement, cancelAnimations]);

  const baseStyles = `
    inline-flex items-center justify-center gap-3
    rounded-full px-8 py-4
    font-label-md tracking-widest
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void-black)]
  `.trim();

  const variantStyles = {
    primary: `
      bg-[var(--color-lamp-cream)] text-[var(--color-void-black)]
      hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(245,245,240,0.25)]
      active:scale-[0.98]
    `.trim(),
    ghost: `
      border border-white/20 text-white
      hover:border-white/40 hover:bg-white/5
      active:scale-[0.98]
    `.trim(),
  };

  const iconWrapperStyles = `
    w-9 h-9 rounded-full bg-black/5
    flex items-center justify-center
  `.trim();

  if (isAnchor) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className} magnetic-btn interactive-premium`}
        onClick={onClick}
        style={style}
        aria-disabled={disabled}
      >
        <span className="flex items-center justify-center">{children}</span>
        <span
          ref={iconWrapperRef}
          className={iconWrapperStyles}
          aria-hidden="true"
        >
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${className} magnetic-btn interactive-premium`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      <span className="flex items-center justify-center">{children}</span>
      <span
        ref={iconWrapperRef}
        className={iconWrapperStyles}
        aria-hidden="true"
      >
        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
      </span>
    </button>
  );
};

export default MagneticButton;