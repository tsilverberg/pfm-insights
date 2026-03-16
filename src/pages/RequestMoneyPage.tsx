import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import NumericKeypad from '../components/shared/NumericKeypad';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { useToast } from '../hooks/useToast';
import { useHaptics } from '../hooks/useHaptics';
import './RequestMoneyPage.css';

const RequestMoneyPage: React.FC = () => {
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
    if (amount.length <= 1) setAmount('0');
    else setAmount(amount.slice(0, -1));
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
      <ScreenHeader title="Request money" closeButton onBackAction={() => history.goBack()} />
      <IonContent className="page-content">

        {/* Amount Display */}
        <div className="request-amount">
          <div className="request-amount__display">
            <span className={`request-amount__text ${hasAmount ? 'request-amount__text--active' : ''}`}>
              €{displayAmount}
            </span>
            <div className={`request-amount__cursor ${hasAmount ? 'request-amount__cursor--active' : ''}`} />
          </div>
        </div>

        {/* To Account + Note */}
        <div className="request-options">
          <button className="request-options__row" onClick={() => showToast({ type: 'info', message: 'Account picker coming soon' })}>
            <div className="request-options__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="18" height="10" rx="1.5" stroke="var(--pfm-text-secondary)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="request-options__label">To: John's main account</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="request-options__divider" />
          <div className="request-options__note">
            <span className="request-options__note-text">Add a note</span>
          </div>
        </div>

        {/* CTAs */}
        {hasAmount && (
          <div className="request-cta-row">
            <button className="request-btn" onClick={() => setShowConfirm(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
              </svg>
              Send link
            </button>
            <button className="request-qr-btn" onClick={() => history.push('/qr')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="1" stroke="var(--pfm-text-primary)" strokeWidth="1.5" />
                <rect x="13" y="3" width="8" height="8" rx="1" stroke="var(--pfm-text-primary)" strokeWidth="1.5" />
                <rect x="3" y="13" width="8" height="8" rx="1" stroke="var(--pfm-text-primary)" strokeWidth="1.5" />
                <rect x="13" y="13" width="4" height="4" fill="var(--pfm-text-primary)" />
                <rect x="19" y="13" width="2" height="4" fill="var(--pfm-text-primary)" />
                <rect x="13" y="19" width="4" height="2" fill="var(--pfm-text-primary)" />
                <rect x="19" y="19" width="2" height="2" fill="var(--pfm-text-primary)" />
                <rect x="5.5" y="5.5" width="3" height="3" fill="var(--pfm-text-primary)" />
                <rect x="15.5" y="5.5" width="3" height="3" fill="var(--pfm-text-primary)" />
                <rect x="5.5" y="15.5" width="3" height="3" fill="var(--pfm-text-primary)" />
              </svg>
            </button>
          </div>
        )}

        {/* Keypad */}
        <div style={{ padding: '0 var(--pfm-page-padding)' }}>
          <NumericKeypad onKey={handleKey} onDelete={handleDelete} />
        </div>
        <ConfirmDialog
          isOpen={showConfirm}
          title="Confirm request"
          message={`Request €${displayAmount} to John's main account?`}
          confirmLabel="Send request"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowConfirm(false);
            haptics.success();
            showToast({ type: 'success', message: 'Request sent' });
            setAmount('0');
          }}
          onCancel={() => setShowConfirm(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RequestMoneyPage;
