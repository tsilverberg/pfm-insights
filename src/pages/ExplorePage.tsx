import React from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import CoachIcon from '../components/shared/CoachIcon';
import { useToast } from '../hooks/useToast';
import './ExplorePage.css';

const ExplorePage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();

  const headerActions = [
    { label: 'Cards', icon: <span className="material-symbols-rounded" style={{ fontSize: 22 }}>credit_card</span>, onClick: () => history.push('/cards') },
    { label: 'Coach', icon: <CoachIcon size={22} />, onClick: () => showToast({ type: 'info', message: 'Coach coming soon' }) },
  ];

  return (
  <IonPage>
    <AppHeader title="Explore" actions={headerActions} />
    <IonContent className="page-content">
      <IonRefresher slot="fixed" onIonRefresh={(e) => setTimeout(() => e.detail.complete(), 800)}>
        <IonRefresherContent />
      </IonRefresher>
      <div>
        {/* Quick Actions */}
        <div className="page-pad pt-16">
          <div className="explore__grid">
            {[
              { label: 'Budgets', icon: '📊', desc: 'Track spending limits' },
              { label: 'Goals', icon: '🎯', desc: 'Save for what matters' },
              { label: 'Reports', icon: '📈', desc: 'Monthly summaries' },
              { label: 'Rewards', icon: '🎁', desc: 'Cashback & offers' },
            ].map((action) => (
              <button key={action.label} className="card-bordered explore__grid-card" onClick={() => showToast({ type: 'info', message: `${action.label} coming soon` })} style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div className="explore__grid-icon">{action.icon}</div>
                <div className="typo-callout-semibold mb-4">{action.label}</div>
                <div className="typo-footnote color-tertiary">{action.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div className="page-pad mt-24">
          <h2 className="typo-headline mb-12">Discover</h2>
          <div className="card-bordered">
            {[
              { title: 'Savings booster', subtitle: 'Earn 3.5% on your savings account', tag: 'New' },
              { title: 'Round-up investing', subtitle: 'Invest spare change from every purchase', tag: 'Popular' },
              { title: 'Bill splitting', subtitle: 'Split expenses with friends instantly', tag: '' },
            ].map((item) => (
              <div key={item.title} className="explore__discover-item" onClick={() => showToast({ type: 'info', message: `${item.title} coming soon` })} style={{ cursor: 'pointer' }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showToast({ type: 'info', message: `${item.title} coming soon` }); } }}>
                <div style={{ flex: 1 }}>
                  <div className="flex-row gap-8">
                    <span className="typo-callout-regular">{item.title}</span>
                    {item.tag && <span className="explore__tag">{item.tag}</span>}
                  </div>
                  <div className="typo-footnote color-tertiary mt-2">{item.subtitle}</div>
                </div>
                <span className="material-symbols-rounded color-tertiary" style={{ fontSize: 20 }}>chevron_right</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="page-pad mt-24">
          <h2 className="typo-headline mb-12">Tips for you</h2>
          <div className="card-bordered explore__tip-card">
            <div className="typo-callout-semibold mb-4">Reduce subscription costs</div>
            <div className="typo-footnote color-secondary explore__tip-desc">
              You're spending €89/month on subscriptions. We found 2 that overlap — you could save up to €15/month.
            </div>
            <button className="btn-outline w-full mt-12" onClick={() => showToast({ type: 'info', message: 'Subscription review coming soon' })}>Review subscriptions</button>
          </div>
        </div>

        <div className="bottom-spacer" />
      </div>
    </IonContent>
  </IonPage>
  );
};

export default ExplorePage;
