import React, { useRef } from 'react';
import { IonModal } from '@ionic/react';
import { Account } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './AccountSelectorSheet.css';

interface AccountSelectorSheetProps {
  isOpen: boolean;
  onDismiss: () => void;
  accounts: Account[];
  selectedAccountId: string;
  onSelect: (accountId: string) => void;
}

const accountTypeLabels: Record<Account['type'], string> = {
  checking: 'Checking Account',
  savings: 'Savings Account',
  investment: 'Investment Account',
};

const AccountSelectorSheet: React.FC<AccountSelectorSheetProps> = ({
  isOpen,
  onDismiss,
  accounts,
  selectedAccountId,
  onSelect,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const handleSelect = (accountId: string) => {
    onSelect(accountId);
  };

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      breakpoints={[0, 0.5, 0.75]}
      initialBreakpoint={0.5}
      backdropBreakpoint={0}
      className="account-selector-modal"
      handle={true}
      handleBehavior="cycle"
      role="dialog"
      aria-modal={true}
      aria-label="Select Account"
    >
      <div className="account-selector__inner">
        <div className="account-selector__header">
          <div className="account-selector__title typo-headline">Select Account</div>
          <button className="account-selector__close" onClick={onDismiss} type="button" aria-label="Close">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="account-selector__list">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="account-selector__row"
              onClick={() => handleSelect(account.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(account.id); } }}
            >
              <div className="account-selector__icon-circle">
                <span className="material-symbols-rounded">account_balance_wallet</span>
              </div>
              <div className="account-selector__text">
                <div className="account-selector__name typo-callout-semibold">
                  {account.name} ····{account.lastFour}
                </div>
                <div className="account-selector__type typo-footnote color-secondary">
                  {accountTypeLabels[account.type]}
                </div>
              </div>
              <div className="account-selector__balance typo-callout-semibold">
                {formatEuro(account.balance)}
              </div>
              {account.id === selectedAccountId && (
                <div className="account-selector__check">
                  <span className="material-symbols-rounded">check_circle</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </IonModal>
  );
};

export default AccountSelectorSheet;
