import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import TabPills from '../components/shared/TabPills';
import SpendingBarChart from '../components/shared/SpendingBarChart';
import TransactionList from '../components/shared/TransactionList';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import { formatEuro } from '../data/formatters';
import { childAccountDetailData, homeTransactionsData } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import './ChildAccountPage.css';

const ChildAccountPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const child = childAccountDetailData;
  const [requestTab, setRequestTab] = useState('Pending purchases');

  return (
    <IonPage>
      <ScreenHeader title="Child's Account" onBackAction={() => history.push('/home')} />
      <IonContent className="page-content">
        <div className="child-account">

          {/* Account Selector */}
          <div style={{ padding: '8px 16px' }}>
            <button className="child-account__selector" onClick={() => showToast({ type: 'info', message: 'Account switcher coming soon' })}>
              <span>Elly's Account</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Child Info */}
          <div className="child-account__child-info">
            <div className="child-account__avatar">EW</div>
            <div>
              <div className="child-account__child-name">{child.name}</div>
              <div className="child-account__child-age">{child.childAge}yo</div>
            </div>
          </div>

          {/* Balance */}
          <div className="child-account__balance-label">Account balance</div>
          <div className="child-account__balance">{formatEuro(child.balance)}</div>

          {/* Quick Actions */}
          <div className="child-account__quick-actions">
            <div className="child-account__quick-row">
              {[
                { label: 'Add money', icon: 'add_circle', variant: 'primary' },
                { label: 'Set limit', icon: 'payment', variant: 'secondary' },
                { label: 'Card', icon: 'card', variant: 'secondary' },
                { label: 'More', icon: 'more_horiz', variant: 'secondary' },
              ].map((action) => (
                <button key={action.label} className="child-account__quick-btn" onClick={() => showToast({ type: 'info', message: `${action.label} coming soon` })}>
                  <div className={`child-account__quick-icon child-account__quick-icon--${action.variant}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      {action.icon === 'add_circle' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />}
                      {action.icon === 'payment' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.87c0 1.73-1.33 2.85-3.12 3.17z" />}
                      {action.icon === 'card' && <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />}
                      {action.icon === 'more_horiz' && <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />}
                    </svg>
                  </div>
                  <span className="child-account__quick-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Approve / decline requests */}
          <div className="section-module">
            <div className="section-module__title mb-16">Approve / decline requests</div>
            <TabPills
              options={['Pending purchases', 'Spend over limit', 'Online purchases']}
              active={requestTab}
              onChange={setRequestTab}
            />
          </div>

          {/* At a Glance */}
          <div className="section-module">
            <div className="child-account__glance">
              <div className="child-account__glance-header">
                <div className="child-account__glance-title">At a glance</div>
                <button onClick={() => showToast({ type: 'info', message: 'Spending settings coming soon' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="Settings">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z" fill="var(--pfm-text-tertiary)" />
                  </svg>
                </button>
              </div>
              <div className="child-account__glance-subtitle">How's {child.name} spending..</div>
              <SpendingBarChart segments={child.spendingBreakdown} />
            </div>
          </div>

          {/* Parents */}
          <div className="section-module">
            <div className="section-module__title mb-16">Parents</div>
            <div className="child-account__parents">
              {child.parents.map((parent) => (
                <div key={parent.name} className="child-account__parent-row">
                  <div className="child-account__parent-avatar">
                    {parent.isYou ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="child-account__parent-name">
                      {parent.name}
                      {parent.isYou && <span style={{ fontWeight: 400, color: 'var(--pfm-text-tertiary)', marginLeft: 4 }}>({parent.role})</span>}
                    </span>
                    {!parent.isYou && (
                      <div className="child-account__parent-role">({parent.role})</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="section-module">
            <div className="section-module__title mb-16">Transactions</div>
            <TransactionList groups={homeTransactionsData} />
            <button className="btn-raised" style={{ height: 32, marginTop: 16 }} onClick={() => showToast({ type: 'info', message: 'Full transaction history coming soon' })}>View all</button>
            <div className="child-account__coach">
              <div className="child-account__coach-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                </svg>
              </div>
              <span className="child-account__coach-text">Mostly spent on Food this week</span>
            </div>
          </div>

          {/* Earnings */}
          <div className="section-module" style={{ borderBottom: 'none' }}>
            <div className="section-module__title mb-16">Earnings</div>
            <SettingsMenuItem icon="calendar" title="Weekly allowance" description="Set a weekly allowance" onClick={() => showToast({ type: 'info', message: 'Weekly allowance coming soon' })} />
            <SettingsMenuItem icon="star" title="Challenges" description="Create a rewardable challenge" onClick={() => showToast({ type: 'info', message: 'Challenges coming soon' })} />
            <button className="btn-raised" style={{ height: 32, marginTop: 16 }} onClick={() => showToast({ type: 'info', message: 'Full transaction history coming soon' })}>View all</button>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChildAccountPage;
