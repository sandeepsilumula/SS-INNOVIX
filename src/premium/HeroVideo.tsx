import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Video configuration
    video.playbackRate = 0.5;
    video.loop = false;
    video.muted = true; // Enforced mute

    // Attempt to play video
    const attemptPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — audio will start on first user interaction
      });
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    // Unified GSAP timeline for video and text
    const tl = gsap.timeline({ paused: true });

    // Video plays through to near the end (at 0.5x speed = slow cinematic pace)
    // We scrub video.currentTime to the end so text reveals at video completion
    const VIDEO_DURATION = 8.0; // estimated full video duration at 0.5x
    const REVEAL_TIME = VIDEO_DURATION - 1.5; // reveal starts 1.5s before video ends

    tl.to(video, {
      currentTime: REVEAL_TIME,
      duration: REVEAL_TIME,
      ease: 'power2.out',
    })
    // Cinematic slow-motion reveal: ALL THREE ELEMENTS TOGETHER at the end
    .fromTo(
      [line1Ref.current, line2Ref.current, subheadingRef.current],
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2.8, // slow cinematic duration
        ease: 'power4.out',
        stagger: 0.08, // tiny stagger for organic feel
      },
      '<' // start at same time as video scrub completes (at REVEAL_TIME)
    );

    // Start timeline when video begins playing
    const handlePlay = () => {
      tl.play();
      video.removeEventListener('playing', handlePlay);
    };
    video.addEventListener('playing', handlePlay);

    // Fallback: start timeline if video doesn't fire 'playing' within 2s
    const fallbackTimer = setTimeout(() => {
      video.removeEventListener('playing', handlePlay);
      tl.play();
    }, 2000);

    // Cleanup
    return () => {
      video.removeEventListener('playing', handlePlay);
      clearTimeout(fallbackTimer);
      // Clear GSAP timelines on unmount
      tl.kill();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Full-screen background video */}
      <video muted
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        style={{ filter: 'brightness(4)' }}
        autoPlay
        playsInline
        preload="auto"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
      </video>

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,black_70%)]" />

      {/* Centered content */}
      <div className="relative z-10 text-center px-6">
        <h1
          id="hero-title"
          className="select-none"
        >
          {/* Line 1: "S&S" — Shrofa */}
          <div
            ref={line1Ref}
            className="font-shrofa"
            style={{
              fontFamily: 'Shrofa, sans-serif',
              fontSize: 'clamp(4.5rem, 8vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '0.05em',
              color: 'var(--color-pure-white)',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
            }}
          >
            {'S&S'.split('').map((char, i) => (
              <span key={`l1-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
          {/* Line 2: "INNOVIX" — Shrofa */}
          <div
            ref={line2Ref}
            className="font-shrofa"
            style={{
              fontFamily: 'Shrofa, sans-serif',
              fontSize: 'clamp(5.5rem, 10vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '0.12em',
              color: 'var(--color-pure-white)',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
            }}
          >
            {'INNOVIX'.split('').map((char, i) => (
              <span key={`l2-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
        </h1>
        <p
          ref={subheadingRef}
          className="mt-10 max-w-2xl mx-auto font-flexing"
          style={{
            fontFamily: '"Flexing Demo", sans-serif',
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '0.05em',
            color: 'var(--color-fg-tertiary)',
            textShadow: '0 0 6px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.5)',
          }}
          >
          We Build Digital Products That Move Businesses Forward
        </p>
      </div>
    </section>
  );
};

export default HeroVideo;