import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import SectionModule from '../components/shared/SectionModule';
import ProgressBar from '../components/shared/ProgressBar';
import SpotlightCard from '../components/shared/SpotlightCard';
import {
  getCategoryMonthlyBreakdown,
  getCategoryWeeklyBreakdown,
  getTransactionsForCategory,
  getCategorySpendingByMember,
  getCategoryPersonalAverage,
  getCategoryCohortAverage,
  getCategoryDisplayInfo,
  householdMembers,
} from '../data/pfmData';
import { formatEuro } from '../data/formatters';
import { BUDGET_THRESHOLD_WARNING, BUDGET_THRESHOLD_DANGER } from '../data/constants';
import './CategoryDetailPage.css';

const CATEGORY_TIPS: Record<string, { title: string; description: string; icon: string }> = {
  Housing: { title: 'Review your utilities', description: 'Compare energy providers annually — switching could save €200-400/year on your housing costs.', icon: 'home' },
  Groceries: { title: 'Plan meals ahead', description: 'A weekly meal plan can cut grocery spending by 15-20%. Try batch cooking on Sundays.', icon: 'restaurant_menu' },
  Dining: { title: 'Cook more at home', description: 'Replacing 2 restaurant meals per week with home cooking could save you ~\u20AC120/month.', icon: 'skillet' },
  Transport: { title: 'Try carpooling', description: 'Sharing rides 3 days a week could halve your fuel costs. Check local carpool apps.', icon: 'directions_car' },
  Entertainment: { title: 'Audit your subscriptions', description: 'Review streaming services you rarely use. Cancelling one could save \u20AC10-15/month.', icon: 'subscriptions' },
  Shopping: { title: 'Use a 48-hour rule', description: 'Wait 48 hours before non-essential purchases. Most impulse buys feel less urgent after a pause.', icon: 'timer' },
  'Coffee & Snacks': { title: 'Brew at home', description: 'Making coffee at home 3 days a week instead of buying out could save \u20AC45/month.', icon: 'coffee' },
};

const CategoryDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const categoryName = decodeURIComponent(name);

  const displayInfo = getCategoryDisplayInfo(categoryName);
  const icon = displayInfo.icon;
  const spent = displayInfo.spent;
  const limit = displayInfo.limit ?? 0;
  const ratio = limit > 0 ? spent / limit : 0;

  // Status determination
  let statusLabel = 'On track';
  let statusClass = 'cat-detail__status--on-track';
  let progressColor = 'var(--pfm-status-success)';
  if (ratio >= BUDGET_THRESHOLD_DANGER) {
    statusLabel = 'Over budget';
    statusClass = 'cat-detail__status--danger';
    progressColor = 'var(--pfm-status-error)';
    if (ratio < 1) {
      statusLabel = 'Watch spending';
      statusClass = 'cat-detail__status--warning';
      progressColor = 'var(--pfm-status-warning)';
    }
  } else if (ratio >= BUDGET_THRESHOLD_WARNING) {
    statusLabel = 'Watch spending';
    statusClass = 'cat-detail__status--warning';
    progressColor = 'var(--pfm-status-warning)';
  }

  // Monthly trend data
  const monthlyData = getCategoryMonthlyBreakdown(categoryName);
  const maxMonthly = Math.max(...monthlyData.map(d => d.amount), 1);

  // Weekly data
  const weeklyData = getCategoryWeeklyBreakdown(categoryName);
  const maxWeekly = Math.max(...weeklyData.map(w => w.amount), 1);

  // Transactions
  const transactions = getTransactionsForCategory(categoryName);

  // Household split
  const memberSpending = getCategorySpendingByMember(categoryName);
  const totalMemberSpending = memberSpending.reduce((s, m) => s + m.amount, 0);

  // Peer comparison
  const personalAvg = getCategoryPersonalAverage(categoryName);
  const cohortAvg = getCategoryCohortAverage(categoryName);
  const diffPct = cohortAvg > 0 ? Math.round(((personalAvg - cohortAvg) / cohortAvg) * 100) : 0;
  const isBetter = personalAvg <= cohortAvg;

  // Improvement tip
  const showTip = ratio >= BUDGET_THRESHOLD_WARNING;
  const tip = CATEGORY_TIPS[categoryName];

  return (
    <IonPage>
      <ScreenHeader title={categoryName} showBack />
      <IonContent className="page-content" fullscreen>
        <div style={{ paddingTop: 16 }}>

          {/* Section 1: Category Header */}
          <div className="cat-detail__header">
            <span className="cat-detail__icon" aria-hidden="true">{icon}</span>
            <h1 className="cat-detail__name">{categoryName}</h1>
            {limit > 0 && (
              <>
                <p className="cat-detail__spent-label">
                  {formatEuro(spent)} <span className="cat-detail__of-limit">of {formatEuro(limit)}</span>
                </p>
                <div className="cat-detail__progress-wrap">
                  <ProgressBar value={spent} max={limit} color={progressColor} height={12} />
                </div>
                <span className={`cat-detail__status ${statusClass}`}>{statusLabel}</span>
              </>
            )}
          </div>

          {/* Section 2: Monthly Trend */}
          <SectionModule title="Monthly trend">
            <div className="cat-detail__monthly-chart">
              {monthlyData.map((d, i) => {
                const barHeight = Math.max((d.amount / maxMonthly) * 100, 3);
                const isCurrent = i === monthlyData.length - 1;
                return (
                  <div className="cat-detail__month-bar" key={d.month}>
                    <span className="cat-detail__bar-amount">{formatEuro(d.amount)}</span>
                    <div
                      className={`cat-detail__bar ${isCurrent ? 'cat-detail__bar--current' : ''}`}
                      style={{ height: `${barHeight}%` }}
                    />
                    <span className="cat-detail__bar-label">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </SectionModule>

          {/* Section 3: Weekly Breakdown */}
          <SectionModule title="This month by week">
            <div className="cat-detail__weekly">
              {weeklyData.map(w => {
                const barWidth = Math.max((w.amount / maxWeekly) * 100, 3);
                return (
                  <div className="cat-detail__week-row" key={w.week}>
                    <span className="cat-detail__week-label">{w.week}</span>
                    <div className="cat-detail__week-bar-wrap">
                      <div
                        className="cat-detail__week-bar"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="cat-detail__week-amount">{formatEuro(w.amount)}</span>
                  </div>
                );
              })}
            </div>
          </SectionModule>

          {/* Section 4: Recent Transactions */}
          <SectionModule title="Recent transactions">
            {transactions.length === 0 ? (
              <p className="cat-detail__empty">No transactions this month</p>
            ) : (
              <div className="cat-detail__tx-list">
                {transactions.map(tx => (
                  <div className="cat-detail__tx-row" key={tx.id}>
                    <span className="cat-detail__tx-icon" aria-hidden="true">{tx.categoryIcon}</span>
                    <div className="cat-detail__tx-info">
                      <span className="cat-detail__tx-name">{tx.name}</span>
                      <span className="cat-detail__tx-date">{tx.date}</span>
                    </div>
                    <span className="cat-detail__tx-amount">{formatEuro(Math.abs(tx.amount))}</span>
                  </div>
                ))}
              </div>
            )}
          </SectionModule>

          {/* Section 5: Household Split */}
          <SectionModule title="Who's spending?">
            <div className="cat-detail__members">
              {memberSpending.map(ms => {
                const member = householdMembers.find(m => m.id === ms.memberId);
                if (!member) return null;
                const pct = totalMemberSpending > 0 ? Math.round((ms.amount / totalMemberSpending) * 100) : 0;
                return (
                  <div className="cat-detail__member-row" key={ms.memberId}>
                    <span className="cat-detail__member-avatar" aria-hidden="true">{member.avatar}</span>
                    <div className="cat-detail__member-info">
                      <div className="cat-detail__member-top">
                        <span className="cat-detail__member-name">{member.name}</span>
                        <span className="cat-detail__member-amount">{formatEuro(ms.amount)} ({pct}%)</span>
                      </div>
                      <div className="cat-detail__member-bar-wrap">
                        <div
                          className="cat-detail__member-bar"
                          style={{ width: `${pct}%`, backgroundColor: member.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionModule>

          {/* Section 6: Peer Comparison */}
          <SectionModule title="How you compare">
            <div className="cat-detail__compare">
              <div className="cat-detail__compare-row">
                <span className="cat-detail__compare-label">Your 6-month average</span>
                <span className="cat-detail__compare-value">{formatEuro(personalAvg)}</span>
              </div>
              <div className="cat-detail__compare-row">
                <span className="cat-detail__compare-label">Similar households</span>
                <span className="cat-detail__compare-value">{formatEuro(cohortAvg)}</span>
              </div>
              <div className={`cat-detail__compare-indicator ${isBetter ? 'cat-detail__compare-indicator--better' : 'cat-detail__compare-indicator--worse'}`}>
                <span className="cat-detail__compare-emoji" aria-hidden="true">
                  {isBetter ? '✅' : '⚠️'}
                </span>
                <span className="cat-detail__compare-text">
                  You spend {Math.abs(diffPct)}% {isBetter ? 'less' : 'more'} than similar households
                </span>
              </div>
            </div>
          </SectionModule>

          {/* Section 7: Improvement Actions */}
          {showTip && tip && (
            <SectionModule title="Tips to save">
              <SpotlightCard
                title={tip.title}
                description={tip.description}
                impact={3}
                icon={tip.icon}
                accentColor="var(--pfm-action-primary-bg)"
              />
            </SectionModule>
          )}

          <div style={{ height: 32 }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CategoryDetailPage;
