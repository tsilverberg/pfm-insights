import React, { useState, useRef } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import UserAvatarHeader from '../components/shared/UserAvatarHeader';
import AccountBalanceCard from '../components/shared/AccountBalanceCard';
import QuickActionsRow from '../components/shared/QuickActionsRow';
import TabPills from '../components/shared/TabPills';
import TransactionList from '../components/shared/TransactionList';
import CoachMomentCard from '../components/shared/CoachMomentCard';
import PocketGoalCard from '../components/shared/PocketGoalCard';
import ChildAccountCard from '../components/shared/ChildAccountCard';
import DotIndicator from '../components/shared/DotIndicator';
import {
  homeAccountData,
  homeQuickActions,
  homeTransactionsData,
  homePocketsData,
  homeChildAccountData,
} from '../data/mockData';

const HomePage: React.FC = () => {
  const history = useHistory();
  const [txTab, setTxTab] = useState('Latest');
  const [showCoach, setShowCoach] = useState(true);
  const [childIdx, setChildIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChildScroll = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / homeChildAccountData.length));
      setChildIdx(Math.min(idx, homeChildAccountData.length - 1));
    }
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div style={{ paddingTop: 16 }}>
          {/* Header with avatar + action icons */}
          <UserAvatarHeader />

          {/* Account Selector */}
          <div style={{ padding: '0 var(--pfm-page-padding)' }}>
            <button
              onClick={() => history.push('/accounts')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                border: '1px solid var(--pfm-border-subtle)',
                borderRadius: 8,
                background: 'white',
                cursor: 'pointer',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--pfm-text-secondary)',
              }}
            >
              <span>John's main account</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" fill="var(--pfm-text-secondary)" />
              </svg>
            </button>
          </div>

          {/* Account Balance Hero */}
          <div className="section-module" style={{ textAlign: 'center' }}>
            <AccountBalanceCard account={homeAccountData} />
            <div style={{ marginTop: 32 }}>
              <QuickActionsRow actions={homeQuickActions.map((a) =>
                a.id === 'more' ? { ...a, route: `/account/${homeAccountData.id}/more` } : a
              )} />
            </div>
          </div>

          {/* Transactions Section */}
          <div className="section-module">
            <div className="section-module__title">Transactions</div>
            <div className="section-module__content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <TabPills
                    options={['Latest', 'Upcoming', 'Subscriptions']}
                    active={txTab}
                    onChange={setTxTab}
                  />
                  <TransactionList groups={homeTransactionsData} />
                  {showCoach && (
                    <CoachMomentCard
                      title=""
                      body="Your largest expense this week was online shopping, mostly from Amazon."
                      onClose={() => setShowCoach(false)}
                    />
                  )}
                </div>
                <button className="btn-raised" style={{ height: 32 }}>View all</button>
              </div>
            </div>
          </div>

          {/* Pockets Section */}
          <div className="section-module">
            <div className="section-module__title">Pockets</div>
            <div className="section-module__content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {homePocketsData.map((pocket) => (
                  <PocketGoalCard key={pocket.id} pocket={pocket} />
                ))}
                <button className="btn-raised" style={{ height: 32 }}>View all</button>
              </div>
            </div>
          </div>

          {/* Child's Account Section */}
          <div className="section-module" style={{ borderBottom: 'none', paddingRight: 0 }}>
            <div className="section-module__title">Your child's account</div>
            <div className="section-module__subtitle" style={{ marginTop: 2 }}>
              Manage and monitor your child's account activity
            </div>
            <div className="section-module__content">
              <div
                ref={scrollRef}
                onScroll={handleChildScroll}
                style={{
                  display: 'flex',
                  gap: 8,
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: 4,
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
                {homeChildAccountData.map((child) => (
                  <div key={child.id} style={{ scrollSnapAlign: 'start', cursor: 'pointer' }} onClick={() => history.push(`/child-account/${child.id}`)}>
                    <ChildAccountCard child={child} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <DotIndicator count={homeChildAccountData.length} active={childIdx} />
              </div>
            </div>
          </div>

          <div style={{ height: 120 }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
