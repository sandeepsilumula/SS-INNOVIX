'use client';

import { animate, AnimationPlaybackControls, AnimationOptions } from 'motion';
import { useRef, useCallback, useEffect } from 'react';

interface SpringOptions {
  damping?: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

interface UseSpringReturn {
  animateSpring: (
    element: HTMLElement,
    keyframes: Record<string, number | string>,
    options?: SpringOptions
  ) => AnimationPlaybackControls;
  cancelAnimations: (element?: HTMLElement) => void;
}

/**
 * Unified spring animation hook using Motion (framer-motion v12+).
 * Apple principle: "Think of animation as a conversation between you and the object, not something prescribed by the interface."
 *
 * Default params per Apple's Human Interface Guidelines:
 * - damping: 1.0 (critically damped, no overshoot) — default for UI
 * - duration: 0.4 (~400ms) — how quickly value reaches target
 * - For momentum-driven interactions: damping ~0.8, duration ~0.3
 *
 * Key feature: Animations start from the CURRENT presentation value (interruptible),
 * not the target value. Motion handles this automatically.
 */
export function useSpring(): UseSpringReturn {
  const activeAnimations = useRef<Map<HTMLElement, AnimationPlaybackControls>>(new Map());

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      activeAnimations.current.forEach((controls) => controls.stop());
      activeAnimations.current.clear();
    };
  }, []);

  const animateSpring = useCallback(
    (
      element: HTMLElement,
      keyframes: Record<string, number | string>,
      options: SpringOptions = {}
    ) => {
      // Stop any existing animation on this element (interruption)
      const existing = activeAnimations.current.get(element);
      if (existing) {
        existing.stop();
      }

      const { damping = 1.0, duration = 0.4, delay = 0, onComplete } = options;

      const controls = animate(element, keyframes, {
        type: 'spring',
        damping,
        duration,
        delay,
      } satisfies AnimationOptions);

      activeAnimations.current.set(element, controls);

      controls.finished.then(() => {
        activeAnimations.current.delete(element);
        onComplete?.();
      });

      return controls;
    },
    []
  );

  const cancelAnimations = useCallback((element?: HTMLElement) => {
    if (element) {
      const controls = activeAnimations.current.get(element);
      if (controls) {
        controls.stop();
        activeAnimations.current.delete(element);
      }
    } else {
      activeAnimations.current.forEach((controls) => controls.stop());
      activeAnimations.current.clear();
    }
  }, []);

  return { animateSpring, cancelAnimations };
}

/**
 * Preset spring configurations matching Apple's HIG
 * Note: Motion uses `duration` (not `response`) for spring timing.
 * Apple's "response" maps to Motion's "duration" approximately.
 */
export const springPresets = {
  /** Default UI: critically damped, graceful */
  ui: { damping: 1.0, duration: 0.4 },

  /** Momentum-driven (flick, throw, drag release): slight overshoot */
  momentum: { damping: 0.8, duration: 0.3 },

  /** Quick feedback (button press, toggle): snappy */
  snappy: { damping: 1.0, duration: 0.2 },

  /** Slow, deliberate (modal, sheet): more damping */
  deliberate: { damping: 1.0, duration: 0.5 },

  /** Cinematic slow: for focal imagery, hero moments — longer duration, no overshoot */
  cinematic: { damping: 1.0, duration: 1.5 },

  /** Reduced motion: near-instant cross-fade */
  reduced: { damping: 1.0, duration: 0.01 },
} as const;