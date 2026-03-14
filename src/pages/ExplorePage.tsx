import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

const ExplorePage: React.FC = () => (
  <IonPage>
    <IonContent className="page-content">
      <div style={{ paddingTop: 54 }}>
        {/* Header */}
        <div style={{ padding: '16px var(--pfm-page-padding)' }}>
          <h1 className="typo-title2-semibold" style={{ margin: 0 }}>Explore</h1>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 var(--pfm-page-padding)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Budgets', icon: '📊', desc: 'Track spending limits' },
              { label: 'Goals', icon: '🎯', desc: 'Save for what matters' },
              { label: 'Reports', icon: '📈', desc: 'Monthly summaries' },
              { label: 'Rewards', icon: '🎁', desc: 'Cashback & offers' },
            ].map((action) => (
              <div key={action.label} className="card-bordered" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{action.icon}</div>
                <div className="typo-callout-semibold" style={{ marginBottom: 2 }}>{action.label}</div>
                <div className="typo-footnote" style={{ color: 'var(--pfm-text-tertiary)' }}>{action.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div style={{ padding: '24px var(--pfm-page-padding) 0' }}>
          <h2 className="typo-headline-semibold" style={{ marginBottom: 12 }}>Discover</h2>
          <div className="card-bordered">
            {[
              { title: 'Savings booster', subtitle: 'Earn 3.5% on your savings account', tag: 'New' },
              { title: 'Round-up investing', subtitle: 'Invest spare change from every purchase', tag: 'Popular' },
              { title: 'Bill splitting', subtitle: 'Split expenses with friends instantly', tag: '' },
            ].map((item, i) => (
              <div key={item.title} style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: i < 2 ? '1px solid var(--pfm-divider-default)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="typo-callout-regular">{item.title}</span>
                    {item.tag && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        fontFamily: 'Lato, sans-serif',
                        color: '#0A5A2B',
                        background: '#DBECE2',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}>{item.tag}</span>
                    )}
                  </div>
                  <div className="typo-footnote" style={{ color: 'var(--pfm-text-tertiary)', marginTop: 2 }}>{item.subtitle}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pfm-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ padding: '24px var(--pfm-page-padding) 0' }}>
          <h2 className="typo-headline-semibold" style={{ marginBottom: 12 }}>Tips for you</h2>
          <div className="card-bordered" style={{ padding: 20 }}>
            <div className="typo-callout-semibold" style={{ marginBottom: 4 }}>Reduce subscription costs</div>
            <div className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)', lineHeight: '18px' }}>
              You're spending €89/month on subscriptions. We found 2 that overlap — you could save up to €15/month.
            </div>
            <button className="btn-outline" style={{ marginTop: 12, width: '100%' }}>Review subscriptions</button>
          </div>
        </div>

        <div style={{ height: 120 }} />
      </div>
    </IonContent>
  </IonPage>
);

export default ExplorePage;
