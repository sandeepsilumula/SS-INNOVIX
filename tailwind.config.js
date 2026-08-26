/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Variable fonts with fallbacks
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk Variable', 'Space Grotesk', 'sans-serif'],
        emotion: ['Canela', 'serif'],
        plexi: ['Plexifont', 'sans-serif'],
        radicalis: ['Radicalis', 'serif'],
        shrofa: ['Shrofa', 'sans-serif'],
        flexing: ['Flexing Demo', 'sans-serif'],
      },
      // Fluid font sizes using clamp
      fontSize: {
        'fluid-xs': 'clamp(0.625rem, 0.57rem + 0.31vw, 0.875rem)',
        'fluid-sm': 'clamp(0.75rem, 0.68rem + 0.36vw, 1rem)',
        'fluid-md': 'clamp(0.875rem, 0.78rem + 0.45vw, 1.125rem)',
        'fluid-lg': 'clamp(1rem, 0.88rem + 0.56vw, 1.25rem)',
        'fluid-xl': 'clamp(1.125rem, 0.98rem + 0.67vw, 1.375rem)',
        'fluid-2xl': 'clamp(1.25rem, 1.08rem + 0.83vw, 1.625rem)',
        'fluid-3xl': 'clamp(1.5rem, 1.28rem + 1.09vw, 2rem)',
        'fluid-4xl': 'clamp(1.75rem, 1.48rem + 1.35vw, 2.375rem)',
        'fluid-5xl': 'clamp(2rem, 1.69rem + 1.56vw, 2.75rem)',
        'fluid-6xl': 'clamp(2.375rem, 1.96rem + 2.08vw, 3.375rem)',
        'fluid-7xl': 'clamp(2.75rem, 2.23rem + 2.6vw, 4rem)',
        'fluid-8xl': 'clamp(3rem, 2.4rem + 3vw, 4.5rem)',
      },
      // Line height scale
      lineHeight: {
        'tight': '1.05',
        'snug': '1.15',
        'normal': '1.45',
        'relaxed': '1.6',
        'loose': '1.75',
        'dynamic': 'clamp(1.45, 1.5 - 0.1 * (100vw - 320px) / (1920 - 320), 1.65)',
      },
      // Letter spacing scale
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.03em',
        'normal': '-0.02em',
        'wide': '-0.01em',
        'wider': '0.02em',
        'widest': '0.04em',
      },
      colors: {
        voidBlack: '#000000',
        pureWhite: '#ffffff',
        charcoal: '#202020',
        graphite: '#333333',
        lampCream: '#f5f5f0',
        smoke: '#999999',
        'ember-orange': '#ff6436',
        onyx: '#161616',
        stone: '#7b7a7c',
        paper: '#f8f8f8',
      },
    },
  },
  plugins: [],
}