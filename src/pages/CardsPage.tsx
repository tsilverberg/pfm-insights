import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import CardCarousel from '../components/shared/CardCarousel';
import DetailRow from '../components/shared/DetailRow';
import TabPills from '../components/shared/TabPills';
import TransactionList from '../components/shared/TransactionList';
import CoachMomentCard from '../components/shared/CoachMomentCard';
import { useToast } from '../hooks/useToast';
import { creditCardsData, homeTransactionsData } from '../data/mockData';

const CardsPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [txTab, setTxTab] = useState('Latest');
  const [showCoach, setShowCoach] = useState(true);
  const card = creditCardsData[activeCardIdx];

  return (
    <IonPage>
      <ScreenHeader title="Cards" onBackAction={() => history.goBack()} rightLabel="New card" rightVariant="pill" onRightAction={() => showToast({ type: 'info', message: 'New card order coming soon' })} />
      <IonContent className="page-content">
        <div>

          {/* Card Carousel */}
          <div className="section-module overflow-visible">
            <CardCarousel cards={creditCardsData} onCardChange={setActiveCardIdx} />
          </div>

          {/* Points */}
          <div className="section-module">
            <button
              className="btn-raised btn-raised--sm"
              style={{ width: '100%' }}
              onClick={() => history.push('/cards/points')}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, marginRight: 6 }}>stars</span>
              View card points & rewards
            </button>
          </div>

          {/* Card Details */}
          <div className="section-module">
            <div className="flex-between mb-4">
              <span className="section-module__title">Details</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} aria-label="Card settings" onClick={() => showToast({ type: 'info', message: 'Card settings coming soon' })}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--pfm-text-secondary)" />
                </svg>
              </button>
            </div>
            <div>
              <DetailRow
                label="Pay from"
                value={card.payFrom}
                onClick={() => showToast({ type: 'info', message: 'Account picker coming soon' })}
                icon={
                  <div style={{
                    width: 20, height: 20, borderRadius: 4,
                    background: 'var(--pfm-illustration-extra-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="8" width="18" height="10" rx="1.5" stroke="var(--pfm-text-secondary)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                }
                hasChevron
              />
              <DetailRow label="Holder" value={card.holderName} />
              <DetailRow
                label="Card number"
                value={`.... .... .... ${card.lastFour}`}
                maskedValue={`....${card.lastFour}`}
                showToggle
              />
              <DetailRow label="Expiry" value={card.expiry} />
              <DetailRow label="CVC" value={card.cvc} />
              <DetailRow
                label="Pin number"
                value="1234"
                maskedValue="...."
                showToggle
              />
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="section-module">
            <div className="section-module__title mb-16">Latest transactions</div>
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
              <button className="btn-raised" style={{ height: 32 }} onClick={() => history.push('/search')}>View all</button>
            </div>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardsPage;
