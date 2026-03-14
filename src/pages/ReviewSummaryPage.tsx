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

  const permissionIcons: Record<string, string> = {
    'View balance & transactions': '📋',
    'Transaction limit': '💳',
    'Manage cards': '💳',
    'View account insights': '✨',
    'Spend from this account': '💰',
    'Initiate transfers': '🔄',
    'Manage scheduled payments': '⏰',
    'View statements & documents': '📄',
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
            <div className="review-summary__banner-icon">🤝</div>
            <div className="review-summary__banner-text">
              <span className="typo-callout-semibold">You've shared an account with</span>
              <span className="typo-callout-semibold">{contactName}</span>
            </div>
          </div>

          {/* Account details */}
          <div className="review-summary__section">
            <div className="review-summary__section-label">Account details</div>
            <div className="review-summary__account-row">
              <div className="review-summary__account-icon">🏦</div>
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
                <div className="review-summary__perm-icon">
                  {permissionIcons[perm.title] || '✅'}
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
                <span style={{ fontSize: 64 }}>🤝</span>
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
