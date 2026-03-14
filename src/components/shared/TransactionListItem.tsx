import React from 'react';
import type { Transaction } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './TransactionListItem.css';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  const { name, description, category, amount, logoUrl, initials, isPositive } = transaction;
  const displayAmount = isPositive ? `+\u202F${formatEuro(amount)}` : `-\u202F${formatEuro(Math.abs(amount))}`;

  return (
    <div className="tx-item">
      <div className="tx-item__icon">
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
      <div className="tx-item__text">
        <div className="tx-item__name">
          {name}
          {description && <span className="tx-item__desc"> {description}</span>}
        </div>
        <div className="tx-item__category">{category}</div>
      </div>
      <div className={`tx-item__amount ${isPositive ? 'tx-item__amount--positive' : ''}`}>
        {displayAmount}
      </div>
    </div>
  );
};

export default TransactionListItem;
