import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import UserAvatarHeader from '../components/shared/UserAvatarHeader';
import AccountBalanceCard from '../components/shared/AccountBalanceCard';
import QuickActionsRow from '../components/shared/QuickActionsRow';
import TabPills from '../components/shared/TabPills';
import TransactionList from '../components/shared/TransactionList';
import CoachMomentCard from '../components/shared/CoachMomentCard';
import PocketGoalCard from '../components/shared/PocketGoalCard';
import ChildAccountCard from '../components/shared/ChildAccountCard';
import DotIndicator from '../components/shared/DotIndicator';
import AccountSelectorSheet from '../components/shared/AccountSelectorSheet';
import {
  homeAccountData,
  homeQuickActions,
  homeTransactionsData,
  homePocketsData,
  homeChildAccountData,
  allAccountsData,
} from '../data/mockData';
import './HomePage.css';

const HomePage: React.FC = () => {
  const history = useHistory();
  const [txTab, setTxTab] = useState('Latest');
  const [showCoach, setShowCoach] = useState(true);
  const [childIdx, setChildIdx] = useState(0);
  const [showAccountSheet, setShowAccountSheet] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal();

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
        <IonRefresher slot="fixed" onIonRefresh={(e) => setTimeout(() => e.detail.complete(), 800)}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="pt-16" ref={revealRef}>
          <UserAvatarHeader />

          {/* Account Selector */}
          <div className="page-pad">
            <button
              onClick={() => setShowAccountSheet(true)}
              className="home__account-selector"
            >
              <span>John's main account</span>
              <span className="material-symbols-rounded color-secondary" style={{ fontSize: 16 }}>unfold_more</span>
            </button>
          </div>

          {/* Account Balance Hero */}
          <div className="section-module text-center">
            <AccountBalanceCard account={homeAccountData} />
            <div className="mt-24">
              <QuickActionsRow actions={homeQuickActions.map((a) =>
                a.id === 'more' ? { ...a, route: `/account/${homeAccountData.id}/more` } : a
              )} />
            </div>
          </div>

          {/* Transactions Section */}
          <div className="section-module reveal">
            <div className="section-module__title">Transactions</div>
            <div className="section-module__content">
              <div className="flex-col gap-24">
                <div className="flex-col gap-16">
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
                <button className="btn-raised btn-raised--sm" onClick={() => history.push('/search')}>View all</button>
              </div>
            </div>
          </div>

          {/* Pockets Section */}
          <div className="section-module reveal">
            <div className="section-module__title">Pockets</div>
            <div className="section-module__content">
              <div className="flex-col gap-8">
                {homePocketsData.map((pocket) => (
                  <PocketGoalCard key={pocket.id} pocket={pocket} onClick={() => history.push('/pockets')} />
                ))}
                <button className="btn-raised btn-raised--sm" onClick={() => history.push('/pockets')}>View all</button>
              </div>
            </div>
          </div>

          {/* Child's Account Section */}
          <div className="section-module home__child-section reveal">
            <div className="section-module__title">Your child's account</div>
            <div className="section-module__subtitle mt-2">
              Manage and monitor your child's account activity
            </div>
            <div className="section-module__content">
              <div
                ref={scrollRef}
                onScroll={handleChildScroll}
                className="scroll-x gap-8"
              >
                {homeChildAccountData.map((child) => (
                  <div key={child.id} className="home__child-card" onClick={() => history.push(`/child-account/${child.id}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); history.push(`/child-account/${child.id}`); } }}>
                    <ChildAccountCard child={child} />
                  </div>
                ))}
              </div>
              <div className="mt-16">
                <DotIndicator count={homeChildAccountData.length} active={childIdx} />
              </div>
            </div>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>

      <AccountSelectorSheet
        isOpen={showAccountSheet}
        onDismiss={() => setShowAccountSheet(false)}
        accounts={allAccountsData}
        selectedAccountId={homeAccountData.id}
        onSelect={(accountId) => {
          setShowAccountSheet(false);
          history.push(`/account/${accountId}`);
        }}
      />
    </IonPage>
  );
};

export default HomePage;
