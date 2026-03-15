import React, { useState } from 'react';
import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import BottomSheet from '../components/shared/BottomSheet';
import { homeAccountData } from '../data/mockData';
import { formatEuro } from '../data/formatters';
import { useToast } from '../hooks/useToast';
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

  const { showToast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendInvite = () => {
    setShowSuccess(true);
    showToast({ type: 'success', message: 'Access shared successfully' });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    history.push(`/account/${id}`);
  };

  const permissionStyles: Record<string, { icon: string; bg: string; color: string }> = {
    'View balance & transactions': { icon: 'receipt_long', bg: 'var(--pfm-palette-blue-extra-soft)', color: 'var(--pfm-palette-blue-strong)' },
    'Transaction limit': { icon: 'credit_card', bg: 'var(--pfm-palette-green-extra-soft)', color: 'var(--pfm-palette-green-strong)' },
    'Manage cards': { icon: 'credit_card', bg: 'var(--pfm-illustration-extra-soft)', color: 'var(--pfm-action-primary-bg)' },
    'View account insights': { icon: 'auto_awesome', bg: 'var(--pfm-palette-purple-extra-soft)', color: 'var(--pfm-palette-purple-strong)' },
    'Spend from this account': { icon: 'payments', bg: 'var(--pfm-palette-green-extra-soft)', color: 'var(--pfm-palette-green-strong)' },
    'Initiate transfers': { icon: 'swap_horiz', bg: 'var(--pfm-palette-blue-extra-soft)', color: 'var(--pfm-palette-blue-strong)' },
    'Manage scheduled payments': { icon: 'schedule', bg: 'var(--pfm-palette-orange-extra-soft)', color: 'var(--pfm-palette-orange-strong)' },
    'View statements & documents': { icon: 'description', bg: 'var(--pfm-illustration-extra-soft)', color: 'var(--pfm-action-primary-bg)' },
  };

  return (
    <IonPage>
      <ScreenHeader title="Review summary" closeButton />
      <IonContent className="page-content">
        <div className="review-summary">

          {/* Shared with banner */}
          <div className="review-summary__banner">
            <div className="review-summary__banner-icon">
              <span className="material-symbols-rounded" style={{ fontSize: 24, color: 'var(--pfm-palette-orange-strong)' }}>volunteer_activism</span>
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
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-palette-blue-strong)' }}>account_balance</span>
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
                    background: permissionStyles[perm.title]?.bg || 'var(--pfm-illustration-extra-soft)',
                  }}
                >
                  <span className="material-symbols-rounded" style={{
                    fontSize: 20,
                    color: permissionStyles[perm.title]?.color || 'var(--pfm-action-primary-bg)',
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

        </div>

        {/* Success Bottom Sheet */}
        <BottomSheet isOpen={showSuccess} onClose={handleSuccessClose}>
          <div className="review-summary__success">
            <div className="review-summary__success-illustration">
              <div className="review-summary__success-circle">
                <span className="material-symbols-rounded" style={{ fontSize: 64, color: 'var(--pfm-palette-orange-strong)' }}>volunteer_activism</span>
              </div>
            </div>
            <h2 className="review-summary__success-title">Granted access shared!</h2>
            <p className="review-summary__success-desc">
              {contactName} has now access to your checking account. We'll let you know once {contactName.split(' ')[0]} accepts the invite.
            </p>
          </div>
        </BottomSheet>
      </IonContent>
      <IonFooter translucent className="review-summary__footer-ionic">
        <IonToolbar>
          <div className="review-summary__footer">
            <button className="review-summary__send-btn" onClick={handleSendInvite}>
              Send invite
            </button>
            <button className="review-summary__edit-btn" onClick={() => history.goBack()}>
              Edit details
            </button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ReviewSummaryPage;
