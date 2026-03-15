import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  preset?: 'no-transactions' | 'no-accounts' | 'no-goals' | 'no-results' | 'no-notifications';
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const PRESETS: Record<string, { icon: string; title: string; description: string }> = {
  'no-transactions': {
    icon: 'receipt_long',
    title: 'No transactions yet',
    description: 'Your transactions will appear here once you start spending',
  },
  'no-accounts': {
    icon: 'account_balance',
    title: 'No accounts',
    description: 'Link your accounts to get started',
  },
  'no-goals': {
    icon: 'flag',
    title: 'No goals set',
    description: 'Set savings goals to track your progress',
  },
  'no-results': {
    icon: 'search_off',
    title: 'No results found',
    description: 'Try adjusting your search or filters',
  },
  'no-notifications': {
    icon: 'notifications_none',
    title: 'All caught up',
    description: 'You have no new notifications',
  },
};

const EmptyState: React.FC<EmptyStateProps> = ({
  preset,
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const defaults = preset ? PRESETS[preset] : undefined;

  const resolvedIcon = icon || defaults?.icon || 'info';
  const resolvedTitle = title || defaults?.title || '';
  const resolvedDescription = description || defaults?.description || '';

  return (
    <div className="empty-state">
      <div className="empty-state__icon-circle">
        <span className="material-symbols-rounded">{resolvedIcon}</span>
      </div>
      {resolvedTitle && (
        <div className="empty-state__title typo-headline">{resolvedTitle}</div>
      )}
      {resolvedDescription && (
        <div className="empty-state__description typo-subhead-regular color-secondary">
          {resolvedDescription}
        </div>
      )}
      {actionLabel && onAction && (
        <div className="empty-state__action">
          <button className="btn-outline" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
