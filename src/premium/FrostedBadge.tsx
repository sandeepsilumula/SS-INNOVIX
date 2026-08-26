interface FrostedBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function FrostedBadge({ children, className = '' }: FrostedBadgeProps) {
  return (
    <span
      className={`relative inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-white backdrop-blur-2xl saturate-150 bg-white/10 ring-1 ring-white/10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-[rgba(255,255,255,0.12)] before:to-transparent before:rounded-full ${className}`}
      style={{
        backdropFilter: 'blur(var(--glass-blur-xl)) saturate(var(--glass-saturate))',
        WebkitBackdropFilter: 'blur(var(--glass-blur-xl)) saturate(var(--glass-saturate))',
        backgroundColor: 'rgba(245, 245, 240, 0.04)',
        borderColor: 'rgba(245, 245, 240, 0.15)',
      }}
    >
      {children}
    </span>
  );
}