import React from 'react';
import type { Account } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './AccountListItem.css';

interface AccountListItemProps {
  account: Account;
  onClick?: () => void;
}

const AccountListItem: React.FC<AccountListItemProps> = ({ account, onClick }) => (
  <button className="list-row account-item" onClick={onClick}>
    <div className="list-row__icon account-item__icon">
      <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-text-secondary)' }}>account_balance_wallet</span>
    </div>
    <div className="list-row__text">
      <span className="typo-callout-semibold">{account.name}</span>
      <span className="typo-footnote color-secondary">····{account.lastFour}</span>
    </div>
    <span className="list-row__value typo-callout-semibold">{formatEuro(account.balance)}</span>
  </button>
);

export default AccountListItem;
