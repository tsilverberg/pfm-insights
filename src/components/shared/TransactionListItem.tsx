import React from 'react';
import type { Transaction } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import { useToast } from '../../hooks/useToast';
import SwipeableRow from './SwipeableRow';
import './TransactionListItem.css';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  const { showToast } = useToast();
  const { name, description, category, amount, logoUrl, initials, isPositive } = transaction;
  const displayAmount = isPositive ? `+\u202F${formatEuro(amount)}` : `-\u202F${formatEuro(Math.abs(amount))}`;

  return (
    <SwipeableRow
      leftAction={{ icon: 'flag', label: 'Flag', color: 'var(--pfm-status-warning, #FF9500)', onAction: () => showToast({ type: 'success', message: 'Transaction flagged' }) }}
      rightAction={{ icon: 'label', label: 'Categorize', color: 'var(--pfm-action-primary-bg, #1A6FEE)', onAction: () => showToast({ type: 'info', message: 'Categorize coming soon' }) }}
    >
      <div className="list-row">
        <div className="list-row__icon tx-item__icon">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name}
              className="tx-item__logo"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('tx-item__fallback--hidden');
              }}
            />
          ) : null}
          {logoUrl ? (
            <span className="tx-item__fallback tx-item__fallback--hidden">{initials || name.charAt(0)}</span>
          ) : (
            <span className="tx-item__fallback">{initials || name.charAt(0)}</span>
          )}
        </div>
        <div className="list-row__text">
          <span className="typo-subhead-semibold">
            {name}
            {description && <span className="tx-item__desc"> {description}</span>}
          </span>
          <span className="typo-footnote color-secondary">{category}</span>
        </div>
        <span className={`list-row__value typo-callout-semibold ${isPositive ? 'tx-item__amount--positive' : ''}`}>
          {displayAmount}
        </span>
      </div>
    </SwipeableRow>
  );
};

export default TransactionListItem;
