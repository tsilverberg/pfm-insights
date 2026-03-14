import React, { useState } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import CategoryFilterPills from '../../components/shared/CategoryFilterPills';
import MonthPicker from '../../components/shared/MonthPicker';
import TimePeriodPills from '../../components/shared/TimePeriodPills';
import DottedLeaderRow from '../../components/shared/DottedLeaderRow';
import RaisedButton from '../../components/shared/RaisedButton';
import StackedBarChart from '../../components/charts/StackedBarChart';
import SpendingHeatmap from '../../components/charts/SpendingHeatmap';
import WealthTrajectoryChart from '../../components/charts/WealthTrajectoryChart';
import DonutChart from '../../components/charts/DonutChart';
import { useMonthNavigation } from '../../hooks/useMonthNavigation';
import { formatEuro, formatEuroK } from '../../data/formatters';
import {
  netWealthData,
  monthlyDistributionData,
  spendingHeatmapData,
  wealthTrajectoryData,
  annualIncomeData,
} from '../../data/mockData';
import './OverviewTab.css';

const OverviewTab: React.FC = () => {
  const [showWealthDetail, setShowWealthDetail] = useState(false);
  const [activeCategory, setActiveCategory] = useState('needs');
  const [timePeriod, setTimePeriod] = useState('6M');
  const monthNav = useMonthNavigation();

  return (
    <div>
      {/* Net Wealth Hero */}
      <section className="section-module">
        <p className="overview__wealth-subtitle">Net wealth</p>
        <h2 className="overview__wealth-amount">{formatEuro(netWealthData.total)}</h2>
        <div className="section-module__content section-module__content--large-gap">
          {showWealthDetail ? (
            <div className="overview__wealth-detail">
              <div className="overview__wealth-row">
                <span className="typo-callout-regular" style={{ color: 'var(--pfm-text-secondary)' }}>Total assets</span>
                <span className="typo-callout-semibold">{formatEuro(netWealthData.totalAssets)}</span>
              </div>
              <div className="overview__wealth-row">
                <span className="typo-callout-regular" style={{ color: 'var(--pfm-text-secondary)' }}>Total debt</span>
                <span className="typo-callout-semibold" style={{ color: 'var(--pfm-pink-strong)' }}>{formatEuro(netWealthData.totalDebt)}</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <RaisedButton label="Hide details" onClick={() => setShowWealthDetail(false)} />
              </div>
            </div>
          ) : (
            <button className="overview__wealth-expand" onClick={() => setShowWealthDetail(true)}>
              <span className="typo-subhead-regular" style={{ color: 'var(--pfm-text-secondary)' }}>View details</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--pfm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Monthly Distribution */}
      <SectionModule title="Monthly distribution">
        <CategoryFilterPills
          categories={monthlyDistributionData.categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <div style={{ marginTop: 16 }}>
          <StackedBarChart
            months={monthlyDistributionData.months}
            needs={monthlyDistributionData.datasets.needs}
            wants={monthlyDistributionData.datasets.wants}
            security={monthlyDistributionData.datasets.security}
            averageIncome={monthlyDistributionData.averageIncome}
          />
        </div>
        <div className="card-raised" style={{ marginTop: 16 }}>
          <p className="typo-subhead-regular" style={{ color: 'var(--pfm-text-secondary)', margin: 0 }}>
            {monthlyDistributionData.commentary}
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <CoachMomentCard
            title="Spending insight"
            body="Your wants spending peaked in November. Consider setting a dining budget to stay on track."
            onClose={() => {}}
          />
        </div>
      </SectionModule>

      {/* Spending Health */}
      <SectionModule title="Spending health" subtitle="See how your daily spending patterns look">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.goPrev} onNext={monthNav.goNext} />
        </div>
        <SpendingHeatmap
          dayLabels={spendingHeatmapData.dayLabels}
          weeks={spendingHeatmapData.weeks}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {spendingHeatmapData.legend.map((item) => (
            <DottedLeaderRow
              key={item.label}
              label={item.label}
              value={item.description}
              dotColor={item.color}
            />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <CoachMomentCard
            title="Spending pattern"
            body="Wednesdays tend to be your highest spending days. Planning meals ahead could help."
            onClose={() => {}}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <TimePeriodPills
            options={['1M', '3M', '6M', '12M', 'YTD', 'All']}
            active={timePeriod}
            onChange={setTimePeriod}
          />
        </div>
      </SectionModule>

      {/* Wealth Trajectory */}
      <SectionModule title="Wealth trajectory" subtitle="Projected growth of your net wealth over time">
        <WealthTrajectoryChart
          ages={wealthTrajectoryData.ages}
          currentPath={wealthTrajectoryData.currentPath}
          recommendedPath={wealthTrajectoryData.recommendedPath}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          <DottedLeaderRow
            label="Your path"
            value={formatEuroK(wealthTrajectoryData.currentPath[wealthTrajectoryData.currentPath.length - 1])}
            labelIcon={<span style={{ width: 20, height: 2, backgroundColor: '#4AB2B2', display: 'inline-block', flexShrink: 0, alignSelf: 'center' }} />}
          />
          <DottedLeaderRow
            label="Recommended"
            value={formatEuroK(wealthTrajectoryData.recommendedPath[wealthTrajectoryData.recommendedPath.length - 1])}
            labelIcon={<span style={{ width: 20, height: 0, borderTop: '2px dashed #4AB2B2', display: 'inline-block', flexShrink: 0, alignSelf: 'center' }} />}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <CoachMomentCard
            title="Stay on course"
            body="You're tracking below the recommended path. Increasing your monthly savings by €200 could close the gap by age 65."
            onClose={() => {}}
          />
        </div>
      </SectionModule>

      {/* Annual Income Breakdown */}
      <SectionModule title="Annual income breakdown">
        <DonutChart
          segments={annualIncomeData.segments}
          title="Income sources"
        />
      </SectionModule>
    </div>
  );
};

export default OverviewTab;
