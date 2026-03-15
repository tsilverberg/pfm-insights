import React, { useState } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import MonthPicker from '../../components/shared/MonthPicker';
import ProgressBar from '../../components/shared/ProgressBar';
import SuccessBanner from '../../components/shared/SuccessBanner';
import CategoryBadge from '../../components/shared/CategoryBadge';
import CategoryListItem from '../../components/shared/CategoryListItem';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import RaisedButton from '../../components/shared/RaisedButton';
import DonutChart from '../../components/charts/DonutChart';
import { useMonthNavigation } from '../../hooks/useMonthNavigation';
import { useToast } from '../../hooks/useToast';
import { formatEuro, formatPercent } from '../../data/formatters';
import {
  monthlyGoalsData,
  needsCategoriesData,
  wantsCategoriesData,
  securityData,
  spendCategoriesDonutData,
} from '../../data/mockData';
import './MonthlyGoalsTab.css';

const MonthlyGoalsTab: React.FC = () => {
  const monthNav = useMonthNavigation();
  const { showToast } = useToast();
  const [showCoach, setShowCoach] = useState(true);
  const { snapshot } = monthlyGoalsData;

  return (
    <div>
      {/* Month Picker */}
      <div className="goals__month-picker">
        <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.goPrev} onNext={monthNav.goNext} />
      </div>

      {/* Monthly Snapshot */}
      <SectionModule title="Monthly snapshot">
        <div className="card-bordered">
          <div className="goals__snapshot-rows">
            {/* Needs row */}
            <div className="goals__snapshot-row">
              <div className="goals__snapshot-header">
                <span className="typo-body-regular">Needs</span>
                <span className="typo-footnote color-tertiary">
                  {formatPercent(snapshot.needs.goalPercent)} of income
                </span>
              </div>
              <ProgressBar value={snapshot.needs.spent} max={snapshot.needs.budget} color="#ED5EA6" height={12} />
              <div className="goals__snapshot-captions">
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.needs.spent)} spent</span>
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.needs.budget)} budget</span>
              </div>
            </div>

            {/* Wants row */}
            <div className="goals__snapshot-row">
              <div className="goals__snapshot-header">
                <span className="typo-body-regular">Wants</span>
                <span className="typo-footnote color-tertiary">
                  {formatPercent(snapshot.wants.goalPercent)} of income
                </span>
              </div>
              <ProgressBar value={snapshot.wants.spent} max={snapshot.wants.budget} color="#3A8C8C" height={12} />
              <div className="goals__snapshot-captions">
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.wants.spent)} spent</span>
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.wants.budget)} budget</span>
              </div>
            </div>

            {/* Security row */}
            <div className="goals__snapshot-row">
              <div className="goals__snapshot-header">
                <span className="typo-body-regular">Security</span>
                <span className="typo-footnote color-tertiary">
                  {formatPercent(snapshot.security.goalPercent)} of income
                </span>
              </div>
              <ProgressBar value={snapshot.security.spent} max={snapshot.security.budget} color="#0A5A2B" height={12} />
              <div className="goals__snapshot-captions">
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.security.spent)} spent</span>
                <span className="typo-footnote color-secondary">{formatEuro(snapshot.security.budget)} budget</span>
              </div>
            </div>
          </div>
          {monthlyGoalsData.isOnTrack && (
            <div className="mt-16">
              <SuccessBanner message="Your spending is on track this month" />
            </div>
          )}
        </div>
      </SectionModule>

      {/* Needs Section */}
      <section className="section-module">
        <div className="goals__category-title-row">
          <h2 className="section-module__title">Needs</h2>
          <CategoryBadge category="needs" label={`${formatEuro(needsCategoriesData.remaining)} left`} />
        </div>
        <div className="section-module__content">
          <div className="mt-16">
            <ProgressBar value={needsCategoriesData.totalSpent} max={needsCategoriesData.totalBudget} color="#ED5EA6" height={4} />
          </div>
          <div className="goals__bar-captions">
            <span className="typo-footnote color-secondary">{formatEuro(needsCategoriesData.totalSpent)} spent</span>
            <span className="typo-footnote color-secondary">{formatEuro(needsCategoriesData.totalBudget)} budget</span>
          </div>
          <div className="goals__category-list">
            {needsCategoriesData.categories.map((cat, i) => (
              <CategoryListItem
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                amount={cat.amount}
                txCount={cat.txCount}
                category="needs"
                showSeparator={i < needsCategoriesData.categories.length - 1}
              />
            ))}
          </div>
          <div className="mt-16">
            <RaisedButton label="Edit categories" onClick={() => showToast({ type: 'info', message: 'Category editor coming soon' })} />
          </div>
        </div>
      </section>

      {/* Wants Section */}
      <section className="section-module">
        <div className="goals__category-title-row">
          <h2 className="section-module__title">Wants</h2>
          <CategoryBadge category="wants" label={`${formatEuro(Math.abs(wantsCategoriesData.remaining))} over`} />
        </div>
        <div className="section-module__content">
          <div className="mt-16">
            <ProgressBar value={wantsCategoriesData.totalSpent} max={wantsCategoriesData.totalBudget} color="#3A8C8C" height={4} />
          </div>
          <div className="goals__bar-captions">
            <span className="typo-footnote color-secondary">{formatEuro(wantsCategoriesData.totalSpent)} spent</span>
            <span className="typo-footnote color-secondary">{formatEuro(wantsCategoriesData.totalBudget)} budget</span>
          </div>
          <div className="goals__category-list">
            {wantsCategoriesData.categories.map((cat, i) => (
              <CategoryListItem
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                amount={cat.amount}
                txCount={cat.txCount}
                category="wants"
                showSeparator={i < wantsCategoriesData.categories.length - 1}
              />
            ))}
          </div>
          {showCoach && (
            <div className="mt-16">
              <CoachMomentCard
                title="Over budget on wants"
                body="You've exceeded your wants budget by €150. Consider moving some dining expenses to next month."
                ctaLabel="Move money now"
                onCta={() => showToast({ type: 'info', message: 'Transfer feature coming soon' })}
                isAction
                onClose={() => setShowCoach(false)}
              />
            </div>
          )}
          <div className="mt-16">
            <RaisedButton label="Edit categories" onClick={() => showToast({ type: 'info', message: 'Category editor coming soon' })} />
          </div>
        </div>
      </section>

      {/* Spend Categories */}
      <SectionModule title="Spend categories">
        <DonutChart segments={spendCategoriesDonutData.segments} title="This month" />
      </SectionModule>

      {/* Security Section */}
      <SectionModule title="Security">
        <div className="card-bordered">
          <div className="goals__security-row">
            <div>
              <div className="typo-callout-regular color-primary">Transfer to savings</div>
              <div className="typo-footnote color-tertiary">Target: {formatEuro(securityData.targetSavings)}</div>
            </div>
            <div className="typo-callout-semibold">{formatEuro(securityData.savingsTransfer)}</div>
          </div>
        </div>
        <div className="mt-16">
          <RaisedButton label="Edit categories" onClick={() => showToast({ type: 'info', message: 'Category editor coming soon' })} />
        </div>
      </SectionModule>
    </div>
  );
};

export default MonthlyGoalsTab;
