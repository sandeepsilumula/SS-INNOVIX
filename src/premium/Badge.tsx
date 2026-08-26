import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block border border-lamp-cream/30 bg-transparent text-lamp-cream font-label-md tracking-widest px-3 py-1 ${className}`}
    >
      {children}
    </span>
  );
}