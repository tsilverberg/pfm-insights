import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import QuickActionsRow from '../components/shared/QuickActionsRow';
import AccountListItem from '../components/shared/AccountListItem';
import TabPills from '../components/shared/TabPills';
import TransactionList from '../components/shared/TransactionList';
import CoachMomentCard from '../components/shared/CoachMomentCard';
import CardCarousel from '../components/shared/CardCarousel';
import PocketGoalCard from '../components/shared/PocketGoalCard';
import ChildAccountCard from '../components/shared/ChildAccountCard';
import DotIndicator from '../components/shared/DotIndicator';
import DonutChart from '../components/charts/DonutChart';
import { formatEuro } from '../data/formatters';
import {
  dashboardTotalBalance,
  dashboardAccountsData,
  homeQuickActions,
  homeTransactionsData,
  creditCardsData,
  homePocketsData,
  homeChildAccountData,
  spendCategoriesDonutData,
} from '../data/mockData';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const history = useHistory();
  const [txTab, setTxTab] = useState('Latest');
  const [showCoach, setShowCoach] = useState(true);
  const [childIdx, setChildIdx] = useState(0);

  /* Build quick actions with "More" wired to the first account's more page */
  const dashboardQuickActions = homeQuickActions.map((action) =>
    action.id === 'more' ? { ...action, route: `/account/acc-1/more` } : action
  );

  return (
    <IonPage>
      <IonContent className="page-content">
        {/* Dark Hero */}
        <div className="dashboard-hero">
          <div className="dashboard-hero__top-row" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 8 }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => history.push('/notifications')}
              aria-label="Notifications"
            >
              <svg width="22" height="22" viewBox="0 0 16 19.5" fill="white">
                <path d="M8 19.5C9.1 19.5 10 18.6 10 17.5H6C6 18.6 6.9 19.5 8 19.5ZM14 13.5V8.5C14 5.43 12.37 2.86 9.5 2.18V1.5C9.5 0.67 8.83 0 8 0C7.17 0 6.5 0.67 6.5 1.5V2.18C3.64 2.86 2 5.42 2 8.5V13.5L0 15.5V16.5H16V15.5L14 13.5ZM12 14.5H4V8.5C4 6.02 5.51 4 8 4C10.49 4 12 6.02 12 8.5V14.5Z" />
              </svg>
            </button>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => history.push('/account/acc-1/settings')}
              aria-label="Settings"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z" />
              </svg>
            </button>
          </div>
          <div className="dashboard-hero__selector">
            <span className="dashboard-hero__selector-text">All accounts</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dashboard-hero__balance">{formatEuro(dashboardTotalBalance)}</div>
          <div className="dashboard-hero__subtitle">Total available</div>
          <div style={{ paddingTop: 16 }}>
            <QuickActionsRow actions={dashboardQuickActions} />
          </div>
        </div>

        {/* Accounts */}
        <div className="section-module">
          <div className="section-module__title">Accounts</div>
          <div className="section-module__content">
            {dashboardAccountsData.map((acc) => (
              <AccountListItem
                key={acc.id}
                account={acc}
                onClick={() => history.push(`/account/${acc.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="section-module">
          <div className="section-module__title" style={{ marginBottom: 16 }}>Latest transactions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TabPills options={['Latest', 'Upcoming', 'Subscriptions']} active={txTab} onChange={setTxTab} />
            <TransactionList groups={homeTransactionsData} />
            {showCoach && (
              <CoachMomentCard
                title=""
                body="Your largest expense this week was online shopping, mostly from Amazon."
                onClose={() => setShowCoach(false)}
              />
            )}
            <button className="btn-raised" style={{ height: 32 }}>View all</button>
          </div>
        </div>

        {/* Cards */}
        <div className="section-module">
          <div className="section-module__title" style={{ marginBottom: 16 }}>Cards</div>
          <CardCarousel cards={creditCardsData} />
          <button className="btn-raised" style={{ height: 32, marginTop: 16 }}>View all</button>
        </div>

        {/* Insights */}
        <div className="section-module">
          <div className="section-module__title" style={{ marginBottom: 16 }}>Insights</div>
          <DonutChart segments={spendCategoriesDonutData.segments} title="January 2026" />
          <button
            className="btn-raised"
            style={{ height: 32, marginTop: 16 }}
            onClick={() => history.push('/insights')}
          >
            View all Insights
          </button>
        </div>

        {/* Pockets */}
        <div className="section-module">
          <div className="section-module__title" style={{ marginBottom: 16 }}>Pockets</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homePocketsData.map((pocket) => (
              <PocketGoalCard key={pocket.id} pocket={pocket} />
            ))}
          </div>
          <button className="btn-raised" style={{ height: 32, marginTop: 16 }}>View all</button>
        </div>

        {/* Child's Account */}
        <div className="section-module" style={{ borderBottom: 'none', paddingRight: 0 }}>
          <div className="section-module__title">Your child's account</div>
          <div className="section-module__subtitle" style={{ marginTop: 2 }}>
            Manage and monitor your child's account activity
          </div>
          <div className="section-module__content">
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
              {homeChildAccountData.map((child) => (
                <div key={child.id} style={{ scrollSnapAlign: 'start', cursor: 'pointer' }} onClick={() => history.push(`/child-account/${child.id}`)}>
                  <ChildAccountCard child={child} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingRight: 16 }}>
              <DotIndicator count={homeChildAccountData.length} active={childIdx} />
            </div>
          </div>
        </div>

        {/* Customize Dashboard CTA */}
        <div style={{ padding: '16px var(--pfm-page-padding) 32px' }}>
          <button className="btn-outline" style={{ width: '100%' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z" fill="currentColor" />
            </svg>
            Customize dashboard
          </button>
        </div>

        <div style={{ height: 120 }} />
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
