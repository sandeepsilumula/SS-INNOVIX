'use client';
import { useRef, useEffect } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  href,
  className = '',
  disabled,
  onClick,
  children,
}: ButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = href ? anchorRef.current : buttonRef.current;
    if (!el) return;
    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const r = el.getBoundingClientRect();
      const x = (me.clientX - (r.left + r.width / 2)) * 0.1;
      const y = (me.clientY - (r.top + r.height / 2)) * 0.1;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.style.transition = 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)';
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [href]);

  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer';
  const styles = {
    primary: 'bg-lamp-cream text-void-black hover:bg-pure-white',
    ghost: 'bg-transparent border border-white/20 text-pure-white hover:border-lamp-cream/50',
    outline: 'bg-transparent border-2 border-lamp-cream/30 text-lamp-cream hover:bg-lamp-cream/10',
  };

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={`${base} ${styles[variant]} ${className}`.trim()}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${base} ${styles[variant]} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}