import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import NumericKeypad from '../components/shared/NumericKeypad';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { useToast } from '../hooks/useToast';
import { useHaptics } from '../hooks/useHaptics';
import './SendMoneyPage.css';

const SendMoneyPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const haptics = useHaptics();
  const [amount, setAmount] = useState('0');
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

  return (
    <IonPage>
      <ScreenHeader title="Send money" closeButton onBackAction={() => history.goBack()} />
      <IonContent className="page-content">

        {/* Amount Display */}
        <div className="send-amount">
          <div className="send-amount__display">
            <span className={`send-amount__text ${hasAmount ? 'send-amount__text--active' : ''}`}>
              €{displayAmount}
            </span>
            <div className={`send-amount__cursor ${hasAmount ? 'send-amount__cursor--active' : ''}`} />
          </div>
        </div>

        {/* From Account + Note */}
        <div className="send-options">
          <button className="send-options__row" onClick={() => showToast({ type: 'info', message: 'Account picker coming soon' })}>
            <div className="send-options__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="18" height="10" rx="1.5" stroke="var(--pfm-text-secondary)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="send-options__label">From: John's main account</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="send-options__divider" />
          <div className="send-options__note">
            <span className="send-options__note-text">Add a note</span>
          </div>
        </div>

        {/* Select Recipient CTA */}
        {hasAmount && (
          <div style={{ padding: '0 16px 16px' }}>
            <button className="send-btn" onClick={() => setShowConfirm(true)}>Select recipient</button>
          </div>
        )}

        {/* Keypad */}
        <div style={{ padding: '0 var(--pfm-page-padding)' }}>
          <NumericKeypad onKey={handleKey} onDelete={handleDelete} />
        </div>
        <ConfirmDialog
          isOpen={showConfirm}
          title="Confirm payment"
          message={`Send €${displayAmount} from John's main account?`}
          confirmLabel="Send"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowConfirm(false);
            haptics.success();
            showToast({ type: 'success', message: 'Payment sent successfully' });
            setAmount('0');
          }}
          onCancel={() => setShowConfirm(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default SendMoneyPage;
