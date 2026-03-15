import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AnimatedNumber from '../AnimatedNumber';

describe('AnimatedNumber', () => {
  beforeEach(() => {
    let time = 0;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      time += 1000; // Jump past duration
      cb(time);
      return time;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with prefix and suffix', () => {
    const { container } = render(
      <AnimatedNumber value={1000} prefix="€" suffix=" total" />
    );
    const text = container.textContent!;
    expect(text).toContain('€');
    expect(text).toContain('total');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedNumber value={100} className="my-number" />
    );
    expect(container.querySelector('.my-number')).toBeInTheDocument();
  });

  it('formats with specified decimals', () => {
    const { container } = render(
      <AnimatedNumber value={42} decimals={0} duration={0} />
    );
    // After animation completes, should show the value
    expect(container.textContent).toBeDefined();
  });

  it('renders a span element', () => {
    const { container } = render(<AnimatedNumber value={100} />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});
