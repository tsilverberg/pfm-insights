import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { formatEuro } from '../data/formatters';
import {
  allAccountsOverview,
  allAccountsData,
  allPocketsData,
  familyAccountsData,
} from '../data/mockData';
import { useToast } from '../hooks/useToast';
import './AccountSelectorPage.css';

const pocketIconMap: Record<string, React.ReactNode> = {
  car: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  ),
  travel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  ),
  savings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" />
    </svg>
  ),
};

const AccountSelectorPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="account-selector">
          {/* Header */}
          <div className="account-selector__header">
            <button className="account-selector__close" onClick={() => history.goBack()} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="var(--pfm-text-primary)" />
              </svg>
            </button>
            <span className="account-selector__title">All accounts</span>
            <button className="account-selector__search" aria-label="Search" onClick={() => showToast({ type: 'info', message: 'Account search coming soon' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="var(--pfm-text-secondary)" />
              </svg>
            </button>
          </div>

          {/* Overview */}
          <div className="account-selector__section">
            <div className="account-selector__section-title">Overview</div>
            <div className="account-selector__overview-card">
              <div className="account-selector__overview-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </div>
              <span className="account-selector__overview-label">All accounts</span>
              <span className="account-selector__overview-amount">{formatEuro(allAccountsOverview.totalBalance)}</span>
            </div>
          </div>

          {/* Accounts */}
          <div className="account-selector__section">
            <div className="account-selector__section-title">Accounts</div>
            {allAccountsData.map((acc, idx) => (
              <button
                key={acc.id}
                className={`account-selector__card${idx === 0 ? ' account-selector__card--selected' : ''}`}
                onClick={() => {
                  history.push(`/account/${acc.id}`);
                }}
              >
                <div className={`account-selector__card-icon account-selector__card-icon--${idx === 2 ? 'shared' : acc.type}`}>
                  {idx === 2 ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  )}
                </div>
                <div className="account-selector__card-text">
                  <div className="account-selector__card-name">{acc.name}</div>
                  <div className="account-selector__card-last-four">
                    <span>****{acc.lastFour}</span>
                  </div>
                </div>
                <span className="account-selector__card-balance">{formatEuro(acc.balance)}</span>
                {idx === 2 && (
                  <img src="/assets/icons/avatar-elly.png" alt="" className="account-selector__card-avatar" />
                )}
              </button>
            ))}
          </div>

          {/* Pockets */}
          <div className="account-selector__section">
            <div className="account-selector__section-title">Pockets</div>
            {allPocketsData.map((pocket) => (
              <button
                key={pocket.id}
                className="account-selector__pocket-card"
                onClick={() => history.push('/pockets')}
              >
                <div className="account-selector__pocket-icon" style={{ background: pocket.iconBg, color: pocket.progressColor }}>
                  {pocketIconMap[pocket.icon] || pocketIconMap.savings}
                </div>
                <div className="account-selector__card-text">
                  <div className="account-selector__card-name">{pocket.name}</div>
                  <div className="account-selector__pocket-goal">Goal {formatEuro(pocket.targetAmount)}</div>
                </div>
                <span className="account-selector__card-balance">{formatEuro(pocket.currentAmount)}</span>
              </button>
            ))}
          </div>

          {/* Family */}
          <div className="account-selector__section">
            <div className="account-selector__section-title">Family</div>
            {familyAccountsData.map((child) => (
              <button
                key={child.id}
                className="account-selector__family-card"
                onClick={() => history.push(`/child-account/${child.id}`)}
              >
                <img src={child.avatarUrl} alt={child.name} className="account-selector__family-avatar" />
                <div className="account-selector__card-text">
                  <div className="account-selector__card-name">{child.name}</div>
                  <div className="account-selector__card-last-four">****{child.lastFour}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className="account-selector__family-balance">{formatEuro(child.balance)}</span>
                  {child.statusLabel && (
                    <span className={`account-selector__badge account-selector__badge--error`}>
                      {child.statusLabel}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Add account button */}
          <button className="account-selector__add-btn" onClick={() => showToast({ type: 'info', message: 'Add account coming soon' })}>+ Add an account</button>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountSelectorPage;
