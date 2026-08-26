'use client';

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'accent';
}

export default function Badge({
  className = '',
  children,
  variant = 'default',
}: BadgeProps) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider font-visuelt';
  const styles = variant === 'accent'
    ? 'bg-lamp-cream/10 text-lamp-cream border border-lamp-cream/20'
    : 'text-lamp-cream border border-white/10 backdrop-blur-md';

  return <span className={`${base} ${styles} ${className}`.trim()}>{children}</span>;
}