import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import InnovixLanding from './InnovixLanding'

// Mock all premium components
vi.mock('./premium/PageIntro', () => ({
  default: () => <div data-testid="page-intro">PageIntro</div>,
}))

vi.mock('./premium/AnimatedSection', () => ({
  default: ({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <div data-testid="animated-section" className={className} data-delay={delay}>
      {children}
    </div>
  ),
}))

vi.mock('./premium/NumberTicker', () => ({
  default: ({ value, suffix, label }: { value: number; suffix?: string; label: string }) => (
    <div data-testid="number-ticker">
      <span>{value}{suffix}</span>
      <span>{label}</span>
    </div>
  ),
}))

vi.mock('./premium/MagneticButton', () => ({
  default: ({ children, href, className, ...props }: any) => (
    <a href={href} className={className} data-testid="magnetic-button" {...props}>
      {children}
    </a>
  ),
}))

vi.mock('./premium/HeroSection', () => ({
  default: () => (
    <section data-testid="hero-section">
      <h1 data-testid="hero-heading">
        <span>S&S</span>
        <span>INNOVIX</span>
      </h1>
    </section>
  ),
}))

vi.mock('./premium/TrustBar', () => ({
  default: () => <div data-testid="trust-bar">Trust Bar</div>,
}))

vi.mock('./premium/ServicesSection', () => ({
  default: () => <div data-testid="services-section">Services Section</div>,
}))

vi.mock('./premium/CaseStudiesSection', () => ({
  default: () => (
    <section data-testid="case-studies-section">
      <h2>Case Studies</h2>
      <div data-testid="case-study-card">
        <h3>Baker & Vine — Hospitality Platform</h3>
      </div>
      <div data-testid="case-study-card">
        <h3>Apex Fitness — Brand Launch</h3>
      </div>
      <div data-testid="case-study-card">
        <h3>Cedar & Oak — E-Commerce Revamp</h3>
      </div>
      <div data-testid="case-study-card">
        <h3>Northlight Docs — SaaS Dashboard</h3>
      </div>
    </section>
  ),
}))

vi.mock('./premium/ProcessSection', () => ({
  default: () => <div data-testid="process-section">ProcessSection</div>,
}))

vi.mock('./premium/TeamSection', () => ({
  default: () => <div data-testid="team-section">TeamSection</div>,
}))


vi.mock('./premium/ContactForm', () => ({
  default: () => <div data-testid="contact-form">ContactForm</div>,
}))

vi.mock('./premium/ScrollProgress', () => ({
  default: () => <div data-testid="scroll-progress" style={{ position: 'fixed', top: 0, left: 0, height: '2px', width: '100%' }} />,
}))

vi.mock('./premium/GlassNav', () => ({
  default: () => <nav data-testid="glass-nav">GlassNav</nav>,
}))

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn()
  thresholds = []
  root = null
  rootMargin = ''

  constructor() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('InnovixLanding', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<InnovixLanding />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders ScrollProgress component', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('scroll-progress')).toBeInTheDocument()
  })

  it('renders PageIntro component', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('page-intro')).toBeInTheDocument()
  })

  it('renders hero section', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('hero-heading')).toBeInTheDocument()
  })

  it('renders Trust Bar section', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('trust-bar')).toBeInTheDocument()
  })

  it('renders Services section', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('services-section')).toBeInTheDocument()
  })

  it('renders Case Studies section', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('case-studies-section')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
  })

  it('renders case studies', () => {
    render(<InnovixLanding />)
    expect(screen.getAllByTestId('case-study-card').length).toBeGreaterThanOrEqual(4)
  })

  it('renders ProcessSection', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('process-section')).toBeInTheDocument()
  })

  it('renders TeamSection', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('team-section')).toBeInTheDocument()
  })

  it('renders ContactForm', () => {
    render(<InnovixLanding />)
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  it('renders footer with brand', () => {
    render(<InnovixLanding />)
    expect(screen.getByText('Premier Digital Products')).toBeInTheDocument()
  })

  it('renders social links in footer', () => {
    render(<InnovixLanding />)
    // Social links are in footer with aria-labels, not visible text
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})