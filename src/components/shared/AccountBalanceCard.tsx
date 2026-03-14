import React from 'react';
import type { Account } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './AccountBalanceCard.css';

interface AccountBalanceCardProps {
  account: Account;
}

const AccountIcon: React.FC<{ type: Account['type'] }> = ({ type }) => (
  <div className="balance-card__icon">
    {type === 'checking' ? (
      <svg width="24" height="24" viewBox="0 0 19 18" fill="none">
        <path d="M18 4.28V2C18 0.9 17.1 0 16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V13.72C18.59 13.37 19 12.74 19 12V6C19 5.26 18.59 4.63 18 4.28ZM17 6V12H10V6H17ZM2 16V2H16V4H10C8.9 4 8 4.9 8 6V12C8 13.1 8.9 14 10 14H16V16H2Z" fill="#3A495D" />
        <path d="M13 10.5C13.8284 10.5 14.5 9.82843 14.5 9C14.5 8.17157 13.8284 7.5 13 7.5C12.1716 7.5 11.5 8.17157 11.5 9C11.5 9.82843 12.1716 10.5 13 10.5Z" fill="#3A495D" />
      </svg>
    ) : type === 'savings' ? (
      <svg width="24" height="24" viewBox="0 0 19 18" fill="none">
        <path d="M18 4.28V2C18 0.9 17.1 0 16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V13.72C18.59 13.37 19 12.74 19 12V6C19 5.26 18.59 4.63 18 4.28ZM17 6V12H10V6H17ZM2 16V2H16V4H10C8.9 4 8 4.9 8 6V12C8 13.1 8.9 14 10 14H16V16H2Z" fill="#3A495D" />
        <path d="M13 10.5C13.8284 10.5 14.5 9.82843 14.5 9C14.5 8.17157 13.8284 7.5 13 7.5C12.1716 7.5 11.5 8.17157 11.5 9C11.5 9.82843 12.1716 10.5 13 10.5Z" fill="#3A495D" />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="#3A495D" />
      </svg>
    )}
  </div>
);

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ account }) => {
  const [euros, cents] = formatEuro(account.balance).split(',');

  return (
    <div className="balance-card">
      <AccountIcon type={account.type} />
      <div className="balance-card__label">
        {account.name} ····{account.lastFour}
      </div>
      <div className="balance-card__amount">
        <span className="balance-card__euros">{euros},</span>
        <span className="balance-card__cents">{cents}</span>
      </div>
    </div>
  );
};

export default AccountBalanceCard;
