import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkeletonLoader from '../SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders text variant', () => {
    const { container } = render(<SkeletonLoader variant="text" />);
    expect(container.querySelector('.skeleton--text')).toBeInTheDocument();
  });

  it('renders circle variant', () => {
    const { container } = render(<SkeletonLoader variant="circle" />);
    expect(container.querySelector('.skeleton--circle')).toBeInTheDocument();
  });

  it('renders card variant', () => {
    const { container } = render(<SkeletonLoader variant="card" />);
    expect(container.querySelector('.skeleton--card')).toBeInTheDocument();
  });

  it('renders chart variant with grid lines', () => {
    const { container } = render(<SkeletonLoader variant="chart" />);
    expect(container.querySelector('.skeleton--chart')).toBeInTheDocument();
    expect(container.querySelectorAll('.skeleton--chart__grid-line')).toHaveLength(5);
  });

  it('renders list-row variant with circle and text lines', () => {
    const { container } = render(<SkeletonLoader variant="list-row" />);
    expect(container.querySelector('.skeleton--list-row')).toBeInTheDocument();
    expect(container.querySelector('.skeleton--list-row__line-primary')).toBeInTheDocument();
    expect(container.querySelector('.skeleton--list-row__line-secondary')).toBeInTheDocument();
  });

  it('renders multiple items when count > 1', () => {
    const { container } = render(<SkeletonLoader variant="text" count={3} />);
    expect(container.querySelector('.skeleton-group')).toBeInTheDocument();
    expect(container.querySelectorAll('.skeleton--text')).toHaveLength(3);
  });

  it('does not wrap in skeleton-group when count is 1', () => {
    const { container } = render(<SkeletonLoader variant="text" count={1} />);
    expect(container.querySelector('.skeleton-group')).not.toBeInTheDocument();
  });

  it('applies custom width and height to text variant', () => {
    const { container } = render(<SkeletonLoader variant="text" width={200} height={16} />);
    const el = container.querySelector('.skeleton--text') as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('16px');
  });

  it('applies string width values', () => {
    const { container } = render(<SkeletonLoader variant="text" width="80%" />);
    const el = container.querySelector('.skeleton--text') as HTMLElement;
    expect(el.style.width).toBe('80%');
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonLoader variant="text" className="my-custom" />);
    expect(container.querySelector('.my-custom')).toBeInTheDocument();
  });
});
