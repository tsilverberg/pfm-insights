import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from '../useToast';

const TestConsumer: React.FC = () => {
  const { showToast } = useToast();
  return (
    <div>
      <button onClick={() => showToast({ type: 'success', message: 'Done!' })}>
        Show Success
      </button>
      <button onClick={() => showToast({ type: 'error', message: 'Failed!', duration: 5000 })}>
        Show Error
      </button>
      <button onClick={() => showToast({ type: 'info', message: 'Info toast' })}>
        Show Info
      </button>
      <button onClick={() => showToast({ type: 'warning', message: 'Warning toast' })}>
        Show Warning
      </button>
    </div>
  );
};

describe('useToast / ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a toast when showToast is called', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Done!')).toBeInTheDocument();
  });

  it('auto-dismisses toast after duration', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Done!')).toBeInTheDocument();

    // Default 3000ms + 300ms exit animation
    act(() => vi.advanceTimersByTime(3300));
    expect(screen.queryByText('Done!')).not.toBeInTheDocument();
  });

  it('shows multiple toasts', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));

    expect(screen.getByText('Done!')).toBeInTheDocument();
    expect(screen.getByText('Failed!')).toBeInTheDocument();
  });

  it('throws when useToast is used outside ToastProvider', () => {
    const BrokenConsumer: React.FC = () => {
      useToast();
      return null;
    };

    // Suppress React error boundary console output
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<BrokenConsumer />)).toThrow(
      'useToast must be used within a ToastProvider'
    );
  });

  it('renders toast container with correct ARIA attributes', () => {
    const { container } = render(
      <ToastProvider>
        <div>App</div>
      </ToastProvider>
    );
    const toastContainer = container.querySelector('.toast-container');
    expect(toastContainer).toHaveAttribute('role', 'status');
    expect(toastContainer).toHaveAttribute('aria-live', 'polite');
  });
});
