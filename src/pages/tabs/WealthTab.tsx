import React, { useState, lazy, Suspense } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import MonthPicker from '../../components/shared/MonthPicker';
import TimePeriodPills from '../../components/shared/TimePeriodPills';
import DottedLeaderRow from '../../components/shared/DottedLeaderRow';
import AnimatedNumber from '../../components/shared/AnimatedNumber';
import SkeletonLoader from '../../components/shared/SkeletonLoader';
import { useMonthNavigation } from '../../hooks/useMonthNavigation';
import { formatEuro, formatEuroK } from '../../data/formatters';
import {
  netWealthData,
  spendingHeatmapData,
  wealthTrajectoryData,
  annualIncomeData,
} from '../../data/mockData';
import './WealthTab.css';

const SpendingHeatmap = lazy(() => import('../../components/charts/SpendingHeatmap'));
const WealthTrajectoryChart = lazy(() => import('../../components/charts/WealthTrajectoryChart'));
const DonutChart = lazy(() => import('../../components/charts/DonutChart'));

const WealthTab: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('6M');
  const monthNav = useMonthNavigation();

  return (
    <div>
      {/* Net Wealth Hero */}
      <section className="section-module">
        <p className="wealth__subtitle">Net wealth</p>
        <h2 className="wealth__amount">
          <AnimatedNumber value={netWealthData.total} prefix="€" decimals={2} duration={1000} />
        </h2>
        <div className="section-module__content">
          <div className="wealth__detail">
            <div className="wealth__row">
              <span className="typo-callout-regular color-secondary">Total assets</span>
              <span className="typo-callout-semibold">{formatEuro(netWealthData.totalAssets)}</span>
            </div>
            <div className="wealth__row">
              <span className="typo-callout-regular color-secondary">Total debt</span>
              <span className="typo-callout-semibold wealth__debt">{formatEuro(netWealthData.totalDebt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wealth Trajectory */}
      <SectionModule title="Wealth trajectory" subtitle="Projected growth of your net wealth over time">
        <Suspense fallback={<SkeletonLoader variant="chart" />}>
          <WealthTrajectoryChart
            ages={wealthTrajectoryData.ages}
            currentPath={wealthTrajectoryData.currentPath}
            recommendedPath={wealthTrajectoryData.recommendedPath}
          />
        </Suspense>
        <div className="flex-col gap-8 mt-16">
          <DottedLeaderRow
            label="Your path"
            value={formatEuroK(wealthTrajectoryData.currentPath[wealthTrajectoryData.currentPath.length - 1])}
            labelIcon={<span className="wealth__legend-line" />}
          />
          <DottedLeaderRow
            label="Recommended"
            value={formatEuroK(wealthTrajectoryData.recommendedPath[wealthTrajectoryData.recommendedPath.length - 1])}
            labelIcon={<span className="wealth__legend-dashed" />}
          />
        </div>
        <div className="mt-16">
          <TimePeriodPills
            options={['1M', '3M', '6M', '12M', 'YTD', 'All']}
            active={timePeriod}
            onChange={setTimePeriod}
          />
        </div>
      </SectionModule>

      {/* Spending Health */}
      <SectionModule title="Spending health" subtitle="See how your daily spending patterns look">
        <div className="flex-center mb-16">
          <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.canGoPrev ? monthNav.goPrev : undefined} onNext={monthNav.canGoNext ? monthNav.goNext : undefined} />
        </div>
        <Suspense fallback={<SkeletonLoader variant="chart" />}>
          <SpendingHeatmap
            dayLabels={spendingHeatmapData.dayLabels}
            weeks={spendingHeatmapData.weeks}
          />
        </Suspense>
        <div className="flex-col gap-8 mt-16">
          {spendingHeatmapData.legend.map((item) => (
            <DottedLeaderRow
              key={item.label}
              label={item.label}
              value={item.description}
              dotColor={item.color}
            />
          ))}
        </div>
      </SectionModule>

      {/* Annual Income Breakdown */}
      <SectionModule title="Annual income breakdown">
        <Suspense fallback={<SkeletonLoader variant="chart" />}>
          <DonutChart
            segments={annualIncomeData.segments}
            title="Income sources"
          />
        </Suspense>
      </SectionModule>
    </div>
  );
};

export default WealthTab;
