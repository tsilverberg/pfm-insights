import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders preset: no-transactions', () => {
    render(<EmptyState preset="no-transactions" />);
    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
    expect(screen.getByText(/transactions will appear/)).toBeInTheDocument();
  });

  it('renders preset: no-accounts', () => {
    render(<EmptyState preset="no-accounts" />);
    expect(screen.getByText('No accounts')).toBeInTheDocument();
  });

  it('renders preset: no-goals', () => {
    render(<EmptyState preset="no-goals" />);
    expect(screen.getByText('No goals set')).toBeInTheDocument();
  });

  it('renders preset: no-results', () => {
    render(<EmptyState preset="no-results" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders preset: no-notifications', () => {
    render(<EmptyState preset="no-notifications" />);
    expect(screen.getByText('All caught up')).toBeInTheDocument();
  });

  it('renders custom title and description overriding preset', () => {
    render(
      <EmptyState preset="no-transactions" title="Custom Title" description="Custom desc" />
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom desc')).toBeInTheDocument();
  });

  it('renders custom icon, title, description without preset', () => {
    render(<EmptyState icon="star" title="Starred" description="No starred items" />);
    expect(screen.getByText('star')).toBeInTheDocument();
    expect(screen.getByText('Starred')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = vi.fn();
    render(
      <EmptyState preset="no-goals" actionLabel="Create Goal" onAction={onAction} />
    );
    const button = screen.getByText('Create Goal');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('does not render action button when only actionLabel is provided', () => {
    render(<EmptyState preset="no-goals" actionLabel="Create Goal" />);
    expect(screen.queryByText('Create Goal')).not.toBeInTheDocument();
  });
});
