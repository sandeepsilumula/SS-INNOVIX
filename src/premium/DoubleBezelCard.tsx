'use client';

export type DoubleBezelVariant = 'charcoal' | 'glass' | 'media';

export interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: DoubleBezelVariant;
  hoverElevation?: boolean;
}

const variantStyles: Record<DoubleBezelVariant, string> = {
  charcoal: 'bg-[var(--color-bg-secondary)]',
  glass: 'bg-white/5 backdrop-blur-xl ring-1 ring-white/10',
  media: 'bg-transparent',
};

export default function DoubleBezelCard({
  children,
  className = '',
  variant = 'charcoal',
  hoverElevation = true,
}: DoubleBezelCardProps) {
  const innerStyle = variantStyles[variant];

  return (
    <div
      className={`
        group relative
        rounded-[2rem] p-1.5
        bg-[rgba(0,0,0,0.03)] ring-1 ring-[var(--color-border-subtle)]
        transition-transform duration-500 ease-[var(--ease-out-expo)]
        transition-shadow duration-500 ease-[var(--ease-out-expo)]
        ${hoverElevation ? 'hover:-translate-y-[4px] hover:shadow-[0_0_0_1px_rgba(245,245,240,0.15),0_12px_50px_rgba(245,245,240,0.12),0_4px_20px_rgba(0,0,0,0.5)]' : ''}
        ${className}
      `.trim()}
    >
      <div
        className={`
          relative rounded-[1.625rem] overflow-hidden
          ${innerStyle}
        `.trim()}
      >
        {/* Inner top highlight */}
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}