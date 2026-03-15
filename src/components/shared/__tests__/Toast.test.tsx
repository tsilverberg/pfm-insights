import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toast from '../Toast';
import type { ToastMessage } from '../../../hooks/useToast';

const makeToast = (overrides: Partial<ToastMessage> = {}): ToastMessage => ({
  id: 'test-1',
  type: 'success',
  message: 'Action completed',
  ...overrides,
});

describe('Toast', () => {
  it('renders success toast with correct icon and message', () => {
    render(<Toast toast={makeToast()} onDismiss={() => {}} />);
    expect(screen.getByText('Action completed')).toBeInTheDocument();
    expect(screen.getByText('check_circle')).toBeInTheDocument();
  });

  it('renders error toast icon', () => {
    render(<Toast toast={makeToast({ type: 'error' })} onDismiss={() => {}} />);
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('renders warning toast icon', () => {
    render(<Toast toast={makeToast({ type: 'warning' })} onDismiss={() => {}} />);
    expect(screen.getByText('warning')).toBeInTheDocument();
  });

  it('renders info toast icon', () => {
    render(<Toast toast={makeToast({ type: 'info' })} onDismiss={() => {}} />);
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('calls onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn();
    render(<Toast toast={makeToast()} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByText('close'));
    expect(onDismiss).toHaveBeenCalledWith('test-1');
  });

  it('renders optional action button', () => {
    const onAction = vi.fn();
    const toast = makeToast({
      action: { label: 'Undo', onClick: onAction },
    });
    render(<Toast toast={toast} onDismiss={() => {}} />);
    const button = screen.getByText('Undo');
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('does not render action button when no action provided', () => {
    render(<Toast toast={makeToast()} onDismiss={() => {}} />);
    expect(screen.queryByText('Undo')).not.toBeInTheDocument();
  });

  it('applies entering class by default', () => {
    const { container } = render(<Toast toast={makeToast()} onDismiss={() => {}} />);
    expect(container.querySelector('.toast--entering')).toBeInTheDocument();
  });

  it('applies exiting class when exiting prop is true', () => {
    const { container } = render(
      <Toast toast={makeToast()} onDismiss={() => {}} exiting />
    );
    expect(container.querySelector('.toast--exiting')).toBeInTheDocument();
  });
});
