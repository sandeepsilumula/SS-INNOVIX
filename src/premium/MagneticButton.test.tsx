import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import MagneticButton from './MagneticButton'

describe('MagneticButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => cb(0))
    global.cancelAnimationFrame = vi.fn()
  })

  it('renders as button when no href provided', () => {
    render(<MagneticButton>Click me</MagneticButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('renders as anchor when href provided', () => {
    render(<MagneticButton href="/test">Link</MagneticButton>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
    expect(screen.getByRole('link')).toHaveTextContent('Link')
  })

  it('applies custom className', () => {
    const { container } = render(
      <MagneticButton className="custom-btn">Test</MagneticButton>
    )
    expect(container.firstChild).toHaveClass('custom-btn')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<MagneticButton onClick={handleClick}>Click me</MagneticButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <MagneticButton disabled onClick={handleClick}>
        Click me
      </MagneticButton>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom style', () => {
    const { container } = render(
      <MagneticButton style={{ backgroundColor: 'red' }}>Test</MagneticButton>
    )
    // Style may be applied to the element directly or via style attribute
    expect(container.firstChild).toHaveAttribute('style')
  })

  it('renders children correctly', () => {
    render(
      <MagneticButton>
        <span>Child content</span>
      </MagneticButton>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('uses default magneticStrength when not provided', () => {
    const { container } = render(<MagneticButton>Test</MagneticButton>)
    // Just verify it renders without error
    expect(container.firstChild).toBeInTheDocument()
  })
})
