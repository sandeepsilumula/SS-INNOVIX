'use client';

import { useRef, useCallback } from 'react';

interface VelocitySample {
  x: number;
  y: number;
  t: number;
}

interface PointerVelocityReturn {
  track: (clientX: number, clientY: number) => void;
  getVelocity: () => { x: number; y: number };
  clear: () => void;
}

/**
 * Tracks pointer velocity history for spring handoff.
 * Apple principle: "When a gesture ends, the animation must continue at the finger's exact velocity."
 *
 * Maintains a 100ms rolling window of samples for accurate velocity calculation.
 */
export function usePointerVelocity(): PointerVelocityReturn {
  const history = useRef<VelocitySample[]>([]);

  const track = useCallback((clientX: number, clientY: number) => {
    const now = performance.now();
    history.current.push({ x: clientX, y: clientY, t: now });
    // Keep only last 100ms of samples
    history.current = history.current.filter((v) => now - v.t < 100);
  }, []);

  const getVelocity = useCallback(() => {
    const h = history.current;
    if (h.length < 2) return { x: 0, y: 0 };
    const first = h[0];
    const last = h[h.length - 1];
    const dt = (last.t - first.t) / 1000; // seconds
    if (dt === 0) return { x: 0, y: 0 };
    return {
      x: (last.x - first.x) / dt,
      y: (last.y - first.y) / dt,
    };
  }, []);

  const clear = useCallback(() => {
    history.current = [];
  }, []);

  return { track, getVelocity, clear };
}