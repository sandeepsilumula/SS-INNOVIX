/**
 * S&S Innovix — Variable Font Configuration
 *
 * Font pairing strategy:
 * - Display: Space Grotesk (variable, geometric sans for headlines)
 * - Body: Inter (variable, highly readable with optical sizing)
 * - Mono: JetBrains Mono (variable, for code and technical text)
 *
 * Variable font features:
 * - font-optical-sizing: auto (adjusts letterforms for screen readability)
 * - font-variation-settings for fine-grained control
 * - Responsive optical sizing via CSS
 */

export const fontConfig = {
  display: {
    family: "'Space Grotesk', system-ui, sans-serif",
    weights: [300, 400, 500, 600, 700] as const,
    variable: '--font-display-var',
    fallback: 'system-ui, -apple-system, sans-serif',
  },
  body: {
    family: "'Inter', system-ui, sans-serif",
    weights: [300, 400, 500, 600, 700] as const,
    variable: '--font-body-var',
    fallback: 'system-ui, -apple-system, sans-serif',
  },
  mono: {
    family: "'JetBrains Mono', monospace",
    weights: [300, 400, 500, 600, 700] as const,
    variable: '--font-mono-var',
    fallback: "'Fira Code', 'Cascadia Code', monospace",
  },
} as const;

// Google Fonts URL for variable fonts with optical sizing
export const googleFontsUrl = [
  'https://fonts.googleapis.com/css2',
  '?family=Space+Grotesk:wght@300..700',
  '&family=Inter:wght@300..700',
  '&family=JetBrains+Mono:wght@300..700',
  '&display=swap',
  '&subset=latin',
].join('');

// Variable font CSS for @font-face fallback (if self-hosting needed)
export const variableFontCSS = `
  /* Space Grotesk - Variable Display Font */
  @font-face {
    font-family: 'Space Grotesk Variable';
    font-style: normal;
    font-weight: 300 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUXskPMBBSSJLm2E.woff2') format('woff2-variations');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* Inter - Variable Body Font */
  @font-face {
    font-family: 'Inter Variable';
    font-style: normal;
    font-weight: 300 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2') format('woff2-variations');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* JetBrains Mono - Variable Mono Font */
  @font-face {
    font-family: 'JetBrains Mono Variable';
    font-style: normal;
    font-weight: 300 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjOVGH.woff2') format('woff2-variations');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

// Typography scale with responsive line-heights
export const typographyScale = {
  // Display: Hero and major headlines
  'display-xl': {
    fontSize: 'clamp(3rem, 8vw, 7rem)',
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    fontWeight: 500,
  },
  'display-lg': {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.025em',
    fontWeight: 500,
  },
  'display-md': {
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    fontWeight: 500,
  },
  'display-sm': {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
    fontWeight: 500,
  },

  // Headlines: Section titles
  'headline-xl': {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    fontWeight: 600,
  },
  'headline-lg': {
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
    fontWeight: 600,
  },
  'headline-md': {
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
    fontWeight: 600,
  },
  'headline-sm': {
    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
    fontWeight: 600,
  },

  // Body: Readable paragraphs
  'body-xl': {
    fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
    lineHeight: 1.6,
    letterSpacing: '0',
    fontWeight: 400,
  },
  'body-lg': {
    fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
    lineHeight: 1.65,
    letterSpacing: '0',
    fontWeight: 400,
  },
  'body-md': {
    fontSize: '1rem',
    lineHeight: 1.7,
    letterSpacing: '0',
    fontWeight: 400,
  },
  'body-sm': {
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: '0.01em',
    fontWeight: 400,
  },

  // UI: Labels, buttons, captions
  'ui-xl': {
    fontSize: '1.125rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    fontWeight: 500,
  },
  'ui-lg': {
    fontSize: '1rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    fontWeight: 500,
  },
  'ui-md': {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.03em',
    fontWeight: 500,
  },
  'ui-sm': {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.04em',
    fontWeight: 600,
  },

  // Mono: Code and technical text
  'mono-lg': {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0',
    fontWeight: 400,
  },
  'mono-md': {
    fontSize: '0.875rem',
    lineHeight: 1.65,
    letterSpacing: '0',
    fontWeight: 400,
  },
  'mono-sm': {
    fontSize: '0.75rem',
    lineHeight: 1.7,
    letterSpacing: '0.02em',
    fontWeight: 400,
  },
} as const;

// Dynamic line-height adjustments based on viewport
export const fluidLineHeight = {
  tight: 'calc(1 + 0.3 * (1 - var(--viewport-width, 100vw) / 1200))',
  normal: 'calc(1.4 + 0.3 * (1 - var(--viewport-width, 100vw) / 1200))',
  relaxed: 'calc(1.6 + 0.4 * (1 - var(--viewport-width, 100vw) / 1200))',
} as const;
