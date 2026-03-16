import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import CoachSheet from '../components/shared/CoachSheet';
import { useToast } from '../hooks/useToast';
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
import { coachNudges } from '../data/coachData';
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
  const { showToast } = useToast();
  const [txTab, setTxTab] = useState('Latest');
  const [showCoach, setShowCoach] = useState(true);
  const [coachOpen, setCoachOpen] = useState(false);
  const [childIdx, setChildIdx] = useState(0);
  const nudge = coachNudges.find(n => n.tab === 'home' && n.insightType === 'nudge');

  const dashboardQuickActions = homeQuickActions.map((action) =>
    action.id === 'more' ? { ...action, route: `/account/acc-1/more` } : action
  );

  return (
    <IonPage>
      <IonContent className="page-content">
        {/* Back to Home */}
        <div style={{ padding: '54px 16px 0' }}>
          <button
            onClick={() => history.push('/home')}
            aria-label="Back to Home"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--pfm-action-primary-bg)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
            </svg>
            <span className="typo-callout-semibold">Home</span>
          </button>
        </div>
        {/* Hero */}
        <div className="dashboard-hero">
          <button className="dashboard-hero__selector" onClick={() => showToast({ type: 'info', message: 'Account filter coming soon' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span className="dashboard-hero__selector-text">All accounts</span>
            <span className="material-symbols-rounded color-secondary" style={{ fontSize: 20 }}>expand_more</span>
          </button>
          <div className="dashboard-hero__balance">{formatEuro(dashboardTotalBalance)}</div>
          <div className="dashboard-hero__subtitle">Total available</div>
          <div className="mt-16">
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
          <div className="section-module__title mb-16">Latest transactions</div>
          <div className="flex-col gap-16">
            <TabPills options={['Latest', 'Upcoming', 'Subscriptions']} active={txTab} onChange={setTxTab} />
            <TransactionList groups={homeTransactionsData} />
            {showCoach && nudge && (
              <CoachMomentCard
                title={nudge.title}
                body={nudge.body}
                ctaLabel={nudge.ctaLabel}
                onCta={() => setCoachOpen(true)}
                onClose={() => setShowCoach(false)}
              />
            )}
            <button className="btn-raised btn-raised--sm" onClick={() => history.push('/search')}>View all</button>
          </div>
        </div>

        {/* Cards */}
        <div className="section-module">
          <div className="section-module__title mb-16">Cards</div>
          <CardCarousel cards={creditCardsData} />
          <button className="btn-raised btn-raised--sm mt-16" onClick={() => history.push('/cards')}>View all</button>
        </div>

        {/* Insights */}
        <div className="section-module">
          <div className="section-module__title mb-16">Insights</div>
          <DonutChart segments={spendCategoriesDonutData.segments} title="January 2026" />
          <button
            className="btn-raised btn-raised--sm mt-16"
            onClick={() => history.push('/insights')}
          >
            View all Insights
          </button>
        </div>

        {/* Pockets */}
        <div className="section-module">
          <div className="section-module__title mb-16">Pockets</div>
          <div className="flex-col gap-8">
            {homePocketsData.map((pocket) => (
              <PocketGoalCard key={pocket.id} pocket={pocket} onClick={() => history.push('/pockets')} />
            ))}
          </div>
          <button className="btn-raised btn-raised--sm mt-16" onClick={() => history.push('/pockets')}>View all</button>
        </div>

        {/* Child's Account */}
        <div className="section-module dashboard__child-section">
          <div className="section-module__title">Your child's account</div>
          <div className="section-module__subtitle mt-2">
            Manage and monitor your child's account activity
          </div>
          <div className="section-module__content">
            <div className="scroll-x gap-8">
              {homeChildAccountData.map((child) => (
                <div key={child.id} className="dashboard__child-card" onClick={() => history.push(`/child-account/${child.id}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); history.push(`/child-account/${child.id}`); } }}>
                  <ChildAccountCard child={child} />
                </div>
              ))}
            </div>
            <div className="mt-16 page-pad">
              <DotIndicator count={homeChildAccountData.length} active={childIdx} />
            </div>
          </div>
        </div>

        {/* Customize Dashboard CTA */}
        <div className="dashboard__customize">
          <button className="btn-outline w-full" onClick={() => showToast({ type: 'info', message: 'Dashboard customization coming soon' })}>
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>settings</span>
            Customize dashboard
          </button>
        </div>

        <div className="bottom-spacer" />
      </IonContent>
      <CoachSheet isOpen={coachOpen} onClose={() => setCoachOpen(false)} context="/home" />
    </IonPage>
  );
};

export default DashboardPage;
