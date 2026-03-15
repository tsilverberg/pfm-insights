import React, { useState, lazy, Suspense } from 'react';
import SectionModule from '../../components/shared/SectionModule';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import CategoryFilterPills from '../../components/shared/CategoryFilterPills';
import MonthPicker from '../../components/shared/MonthPicker';
import TimePeriodPills from '../../components/shared/TimePeriodPills';
import DottedLeaderRow from '../../components/shared/DottedLeaderRow';
import RaisedButton from '../../components/shared/RaisedButton';
import SkeletonLoader from '../../components/shared/SkeletonLoader';

const StackedBarChart = lazy(() => import('../../components/charts/StackedBarChart'));
const SpendingHeatmap = lazy(() => import('../../components/charts/SpendingHeatmap'));
const WealthTrajectoryChart = lazy(() => import('../../components/charts/WealthTrajectoryChart'));
const DonutChart = lazy(() => import('../../components/charts/DonutChart'));
import AnimatedNumber from '../../components/shared/AnimatedNumber';
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
  const [showCoach1, setShowCoach1] = useState(true);
  const [showCoach2, setShowCoach2] = useState(true);
  const [showCoach3, setShowCoach3] = useState(true);
  const monthNav = useMonthNavigation();

  return (
    <div>
      {/* Net Wealth Hero */}
      <section className="section-module">
        <p className="overview__wealth-subtitle">Net wealth</p>
        <h2 className="overview__wealth-amount">
          <AnimatedNumber value={netWealthData.total} prefix="€" decimals={2} duration={1000} />
        </h2>
        <div className="section-module__content section-module__content--large-gap">
          {showWealthDetail ? (
            <div className="overview__wealth-detail">
              <div className="overview__wealth-row">
                <span className="typo-callout-regular color-secondary">Total assets</span>
                <span className="typo-callout-semibold">{formatEuro(netWealthData.totalAssets)}</span>
              </div>
              <div className="overview__wealth-row">
                <span className="typo-callout-regular color-secondary">Total debt</span>
                <span className="typo-callout-semibold overview__debt">{formatEuro(netWealthData.totalDebt)}</span>
              </div>
              <div className="mt-8">
                <RaisedButton label="Hide details" onClick={() => setShowWealthDetail(false)} />
              </div>
            </div>
          ) : (
            <button className="overview__wealth-expand" onClick={() => setShowWealthDetail(true)}>
              <span className="typo-subhead-regular color-secondary">View details</span>
              <span className="material-symbols-rounded color-secondary" style={{ fontSize: 16 }}>expand_more</span>
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
        <div className="mt-16">
          <Suspense fallback={<SkeletonLoader variant="chart" />}>
            <StackedBarChart
              months={monthlyDistributionData.months}
              needs={monthlyDistributionData.datasets.needs}
              wants={monthlyDistributionData.datasets.wants}
              security={monthlyDistributionData.datasets.security}
              averageIncome={monthlyDistributionData.averageIncome}
            />
          </Suspense>
        </div>
        <div className="card-raised mt-16">
          <p className="typo-subhead-regular color-secondary overview__commentary">
            {monthlyDistributionData.commentary}
          </p>
        </div>
        {showCoach1 && (
          <div className="mt-16">
            <CoachMomentCard
              title="Spending insight"
              body="Your wants spending peaked in November. Consider setting a dining budget to stay on track."
              onClose={() => setShowCoach1(false)}
            />
          </div>
        )}
      </SectionModule>

      {/* Spending Health */}
      <SectionModule title="Spending health" subtitle="See how your daily spending patterns look">
        <div className="flex-center mb-16">
          <MonthPicker month={monthNav.month} year={monthNav.year} onPrev={monthNav.goPrev} onNext={monthNav.goNext} />
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
        {showCoach2 && (
          <div className="mt-16">
            <CoachMomentCard
              title="Spending pattern"
              body="Wednesdays tend to be your highest spending days. Planning meals ahead could help."
              onClose={() => setShowCoach2(false)}
            />
          </div>
        )}
        <div className="mt-16">
          <TimePeriodPills
            options={['1M', '3M', '6M', '12M', 'YTD', 'All']}
            active={timePeriod}
            onChange={setTimePeriod}
          />
        </div>
      </SectionModule>

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
            labelIcon={<span className="overview__legend-line" />}
          />
          <DottedLeaderRow
            label="Recommended"
            value={formatEuroK(wealthTrajectoryData.recommendedPath[wealthTrajectoryData.recommendedPath.length - 1])}
            labelIcon={<span className="overview__legend-dashed" />}
          />
        </div>
        {showCoach3 && (
          <div className="mt-16">
            <CoachMomentCard
              title="Stay on course"
              body="You're tracking below the recommended path. Increasing your monthly savings by €200 could close the gap by age 65."
              onClose={() => setShowCoach3(false)}
            />
          </div>
        )}
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

export default OverviewTab;
