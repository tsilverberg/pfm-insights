import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import NumericKeypad from '../components/shared/NumericKeypad';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { useToast } from '../hooks/useToast';
import { useHaptics } from '../hooks/useHaptics';
import './TransferPage.css';

const accounts = [
  { id: 'acc-1', name: "John's main account", balance: 2864.66 },
  { id: 'acc-2', name: 'Savings account', balance: 12450.00 },
  { id: 'acc-3', name: 'Joint account', balance: 5230.80 },
];

const TransferPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const haptics = useHaptics();
  const [amount, setAmount] = useState('0');
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleKey = (key: string) => {
    if (key === '.' && amount.includes('.')) return;
    if (amount === '0' && key !== '.') {
      setAmount(key);
    } else {
      const parts = amount.split('.');
      if (parts[1] && parts[1].length >= 2) return;
      setAmount(amount + key);
    }
  };

  const handleDelete = () => {
    if (amount.length <= 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const displayAmountRaw = amount === '0'
    ? '0.00'
    : amount.includes('.')
      ? amount + '0'.repeat(Math.max(0, 2 - (amount.split('.')[1]?.length || 0)))
      : amount + '.00';
  const displayAmount = displayAmountRaw.replace('.', ',');

  const hasAmount = amount !== '0';
  const fromAccount = accounts[fromIndex];
  const toAccount = accounts[toIndex];

  const handleSwap = () => {
    setFromIndex(toIndex);
    setToIndex(fromIndex);
    haptics.light();
  };

  const cycleFrom = () => {
    let next = (fromIndex + 1) % accounts.length;
    if (next === toIndex) next = (next + 1) % accounts.length;
    setFromIndex(next);
  };

  const cycleTo = () => {
    let next = (toIndex + 1) % accounts.length;
    if (next === fromIndex) next = (next + 1) % accounts.length;
    setToIndex(next);
  };

  return (
    <IonPage>
      <ScreenHeader title="Transfer" closeButton />
      <IonContent className="page-content">

        {/* Amount Display */}
        <div className="transfer-amount">
          <div className="transfer-amount__display">
            <span className={`transfer-amount__text ${hasAmount ? 'transfer-amount__text--active' : ''}`}>
              &euro;{displayAmount}
            </span>
            <div className={`transfer-amount__cursor ${hasAmount ? 'transfer-amount__cursor--active' : ''}`} />
          </div>
        </div>

        {/* From / To Accounts */}
        <div className="transfer-accounts">
          <button className="transfer-accounts__row" onClick={cycleFrom}>
            <div className="transfer-accounts__icon transfer-accounts__icon--from">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="transfer-accounts__info">
              <span className="transfer-accounts__label">From</span>
              <span className="transfer-accounts__name">{fromAccount.name}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="transfer-accounts__swap-wrap">
            <div className="transfer-accounts__divider" />
            <button className="transfer-accounts__swap" onClick={handleSwap} aria-label="Swap accounts">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
              </svg>
            </button>
            <div className="transfer-accounts__divider" />
          </div>

          <button className="transfer-accounts__row" onClick={cycleTo}>
            <div className="transfer-accounts__icon transfer-accounts__icon--to">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="transfer-accounts__info">
              <span className="transfer-accounts__label">To</span>
              <span className="transfer-accounts__name">{toAccount.name}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Add a note */}
        <div className="transfer-note">
          <span className="transfer-note__text">Add a note</span>
        </div>

        {/* Transfer CTA */}
        {hasAmount && (
          <div style={{ padding: '0 16px 16px' }}>
            <button className="transfer-btn" onClick={() => setShowConfirm(true)}>Transfer</button>
          </div>
        )}

        {/* Keypad */}
        <div style={{ padding: '0 var(--pfm-page-padding)' }}>
          <NumericKeypad onKey={handleKey} onDelete={handleDelete} />
        </div>

        <ConfirmDialog
          isOpen={showConfirm}
          title="Confirm transfer"
          message={`Transfer \u20AC${displayAmount} from ${fromAccount.name} to ${toAccount.name}?`}
          confirmLabel="Transfer"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowConfirm(false);
            haptics.success();
            showToast({ type: 'success', message: 'Transfer completed successfully' });
            setAmount('0');
          }}
          onCancel={() => setShowConfirm(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default TransferPage;
