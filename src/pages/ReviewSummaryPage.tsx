import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import BottomSheet from '../components/shared/BottomSheet';
import { homeAccountData } from '../data/mockData';
import { formatEuro } from '../data/formatters';
import './ReviewSummaryPage.css';

const ReviewSummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contactName = decodeURIComponent(params.get('contactName') || '');
  const relationship = decodeURIComponent(params.get('relationship') || '');

  let enabledPermissions: { title: string; detail: string }[] = [];
  try {
    enabledPermissions = JSON.parse(decodeURIComponent(params.get('permissions') || '[]'));
  } catch { /* empty */ }

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendInvite = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    history.push(`/account/${id}`);
  };

  const permissionStyles: Record<string, { icon: string; bg: string; color: string }> = {
    'View balance & transactions': { icon: 'receipt_long', bg: '#DFE7FF', color: '#0047AB' },
    'Transaction limit': { icon: 'credit_card', bg: '#E2F5EC', color: '#0A5A2B' },
    'Manage cards': { icon: 'credit_card', bg: '#E1E8EF', color: '#3A495D' },
    'View account insights': { icon: 'auto_awesome', bg: '#E8DCF8', color: '#491091' },
    'Spend from this account': { icon: 'payments', bg: '#E2F5EC', color: '#0A5A2B' },
    'Initiate transfers': { icon: 'swap_horiz', bg: '#DFE7FF', color: '#0047AB' },
    'Manage scheduled payments': { icon: 'schedule', bg: '#FDE8D0', color: '#B35C00' },
    'View statements & documents': { icon: 'description', bg: '#E1E8EF', color: '#3A495D' },
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="review-summary">
          <div className="review-summary__header">
            <button className="review-summary__close" onClick={() => history.goBack()} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="var(--pfm-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <h1 className="review-summary__title">Review summary</h1>
            <div style={{ width: 24 }} />
          </div>

          {/* Shared with banner */}
          <div className="review-summary__banner">
            <div className="review-summary__banner-icon">
              <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#B35C00' }}>volunteer_activism</span>
            </div>
            <div className="review-summary__banner-text">
              <span className="typo-callout-semibold">You've shared an account with</span>
              <span className="typo-callout-semibold">{contactName}</span>
            </div>
          </div>

          {/* Account details */}
          <div className="review-summary__section">
            <div className="review-summary__section-label">Account details</div>
            <div className="review-summary__account-row">
              <div className="review-summary__account-icon" style={{ background: 'var(--pfm-palette-blue-extra-soft)' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#0047AB' }}>account_balance</span>
              </div>
              <div className="review-summary__account-info">
                <span className="typo-callout-semibold">Checking account</span>
                <span className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)' }}>****{homeAccountData.lastFour}</span>
              </div>
              <span className="typo-callout-semibold">{formatEuro(homeAccountData.balance)}</span>
            </div>
          </div>

          {/* Permissions */}
          <div className="review-summary__section">
            <div className="review-summary__section-label">Permissions</div>
            {enabledPermissions.map((perm) => (
              <div key={perm.title} className="review-summary__perm-row">
                <div
                  className="review-summary__perm-icon"
                  style={{
                    background: permissionStyles[perm.title]?.bg || '#E1E8EF',
                  }}
                >
                  <span className="material-symbols-rounded" style={{
                    fontSize: 20,
                    color: permissionStyles[perm.title]?.color || '#3A495D',
                  }}>
                    {permissionStyles[perm.title]?.icon || 'check_circle'}
                  </span>
                </div>
                <div className="review-summary__perm-info">
                  <span className="typo-callout-regular">{perm.title}</span>
                  <span className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)' }}>{perm.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="review-summary__footer">
            <button className="review-summary__send-btn" onClick={handleSendInvite}>
              Send invite
            </button>
            <button className="review-summary__edit-btn" onClick={() => history.goBack()}>
              Edit details
            </button>
          </div>
        </div>

        {/* Success Bottom Sheet */}
        <BottomSheet isOpen={showSuccess} onClose={handleSuccessClose}>
          <div className="review-summary__success">
            <div className="review-summary__success-illustration">
              <div className="review-summary__success-circle">
                <span className="material-symbols-rounded" style={{ fontSize: 64, color: '#B35C00' }}>volunteer_activism</span>
              </div>
            </div>
            <h2 className="review-summary__success-title">Granted access shared!</h2>
            <p className="review-summary__success-desc">
              {contactName} has now access to your checking account. We'll let you know once {contactName.split(' ')[0]} accepts the invite.
            </p>
          </div>
        </BottomSheet>
      </IonContent>
    </IonPage>
  );
};

export default ReviewSummaryPage;
