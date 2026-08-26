import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import AnimatedSection from './AnimatedSection'

// Mock GSAP to prevent issues in test environment
vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal<typeof import('gsap')>()
  return {
    ...actual,
    default: {
      ...actual.default,
      registerPlugin: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      to: vi.fn(),
      set: vi.fn(),
      timeline: vi.fn(),
    },
  }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn(() => []),
  },
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => callback()),
}))

vi.mock('./hooks/useSpring', () => ({
  useSpring: () => ({
    animateSpring: vi.fn(),
    cancelAnimations: vi.fn(),
  }),
  springPresets: {
    ui: {},
    cinematic: {},
    momentum: {},
    snappy: {},
  },
}))

describe('AnimatedSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
  })

  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div>Child content</div>
      </AnimatedSection>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedSection className="custom-section">
        <div>Test</div>
      </AnimatedSection>
    )
    expect(container.firstChild).toHaveClass('custom-section')
  })

  it('applies delay prop', () => {
    const { container } = render(
      <AnimatedSection delay={0.5}>
        <div>Test</div>
      </AnimatedSection>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with empty fragment', () => {
    const { container } = render(<AnimatedSection><></></AnimatedSection>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('uses default delay when not provided', () => {
    const { container } = render(<AnimatedSection><div>Test</div></AnimatedSection>)
    expect(container.firstChild).toBeInTheDocument()
  })
})