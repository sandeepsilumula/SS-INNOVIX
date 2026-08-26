'use client';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverElevation?: boolean;
}

export default function Card({
  className = '',
  children,
  hoverElevation = false,
}: CardProps) {
  const shell = 'relative bg-voidBlack/5 ring-1 ring-white/5 p-1.5 rounded-[2rem]';
  const core = 'relative bg-charcoal/80 rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]';
  const hover = hoverElevation ? 'hover:-translate-y-1 hover:shadow-lg transition-transform duration-500' : '';

  return (
    <div className={`${shell} ${hover} ${className}`.trim()}>
      <div className={core}>{children}</div>
    </div>
  );
}