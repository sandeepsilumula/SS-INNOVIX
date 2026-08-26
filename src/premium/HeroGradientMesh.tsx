'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface HeroGradientMeshProps {
  // No props needed for now
}

const HeroGradientMesh: React.FC<HeroGradientMeshProps> = () => {
  const meshRef = useRef<HTMLDivElement>(null);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Skip animation, just render static fallback
      return;
    }

    const el = meshRef.current;
    if (!el) return;

    // Try to initialize Three.js
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(el.clientWidth, el.clientHeight);
      el.appendChild(renderer.domElement);

      // Create a particle system
      const particleCount = 1500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        // Color: teal/cyan to match the theme
        color.setHSL(0.5, 0.7, 0.5); // HSL for teal/cyan
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 5;

      // Use ScrollTrigger to animate camera position and particle rotation
      gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0 to 1
            // Move camera from 5 to 0 based on progress
            camera.position.z = 5 * (1 - progress);
            // Rotate the particle system
            particles.rotation.y = progress * Math.PI * 2;
            particles.rotation.x = progress * Math.PI * 0.5;
          },
        });
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup
      return () => {
        gsap.context(() => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        });
        renderer.dispose();
        if (el.contains(renderer.domElement)) {
          el.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      // If WebGL is not available or any error occurs, fallback to Canvas 2D
      console.warn('Three.js failed to initialize, falling back to Canvas 2D:', error);
      setIsWebGL(false);
    }
  }, []);

  // Fallback content for non-WebGL browsers
  if (!isWebGL) {
    return (
      <div
        ref={meshRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(245,245,240,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 20%, rgba(245,245,240,0.03) 0%, transparent 50%)
          `,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    );
  }

  // When WebGL is available, we don't set a background; the Three.js canvas will be the content
  return (
    <div
      ref={meshRef}
      className="absolute inset-0 pointer-events-none"
      // No background style here; the Three.js canvas will cover it
    />
  );
};

export default HeroGradientMesh;