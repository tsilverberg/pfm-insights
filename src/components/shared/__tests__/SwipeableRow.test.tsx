import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SwipeableRow from '../SwipeableRow';

describe('SwipeableRow', () => {
  it('renders children', () => {
    render(
      <SwipeableRow>
        <div>Row content</div>
      </SwipeableRow>
    );
    expect(screen.getByText('Row content')).toBeInTheDocument();
  });

  it('renders left action panel when leftAction provided', () => {
    render(
      <SwipeableRow
        leftAction={{ icon: 'label', label: 'Categorize', color: '#007AFF', onAction: () => {} }}
      >
        <div>Content</div>
      </SwipeableRow>
    );
    expect(screen.getByText('Categorize')).toBeInTheDocument();
  });

  it('renders right action panel when rightAction provided', () => {
    render(
      <SwipeableRow
        rightAction={{ icon: 'flag', label: 'Flag', color: '#FF3B30', onAction: () => {} }}
      >
        <div>Content</div>
      </SwipeableRow>
    );
    expect(screen.getByText('Flag')).toBeInTheDocument();
  });

  it('does not render action panels when no actions provided', () => {
    const { container } = render(
      <SwipeableRow>
        <div>Content</div>
      </SwipeableRow>
    );
    expect(container.querySelector('.swipeable-row__actions')).not.toBeInTheDocument();
  });

  it('calls onAction when action panel is clicked', () => {
    const onAction = vi.fn();
    render(
      <SwipeableRow
        rightAction={{ icon: 'flag', label: 'Flag', color: '#FF3B30', onAction }}
      >
        <div>Content</div>
      </SwipeableRow>
    );
    fireEvent.click(screen.getByText('Flag'));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('has content element with swipeable-row__content class', () => {
    const { container } = render(
      <SwipeableRow>
        <div>Content</div>
      </SwipeableRow>
    );
    expect(container.querySelector('.swipeable-row__content')).toBeInTheDocument();
  });
});
