'use client';

import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type SkeletonLoaderProps = {
  count?: number;
  height?: number | string;
  width?: string | number;
  containerClassName?: string;
  borderRadius?: number;
  highlightColor?: string;
  baseColor?: string;
  ariaLabel?: string;
};

/**
 * Accessible skeleton loader component with ARIA live regions
 * Renders placeholder content while async data loads
 */
export default function SkeletonLoader({
  count = 1,
  height = 20,
  width = '100%',
  containerClassName = '',
  borderRadius = 4,
  highlightColor = 'var(--color-lamp-cream)',
  baseColor = 'var(--color-graphite)',
  ariaLabel = 'Loading content',
}: SkeletonLoaderProps) {
  const skeletons = useMemo(() => {
    return Array.from({ length: count }, (_, i) => (
      <Skeleton
        key={i}
        height={height}
        width={width}
        borderRadius={borderRadius}
        highlightColor={highlightColor}
        baseColor={baseColor}
        aria-hidden="true"
      />
    ));
  }, [count, height, width, borderRadius, highlightColor, baseColor]);

  return (
    <div
      className={containerClassName}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      {skeletons}
    </div>
  );
}