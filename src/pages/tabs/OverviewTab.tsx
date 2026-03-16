import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SectionModule from '../../components/shared/SectionModule';
import HealthScoreRing from '../../components/shared/HealthScoreRing';
import PillarStrip from '../../components/shared/PillarStrip';
import CashflowSummary from '../../components/shared/CashflowSummary';
import SpotlightCard from '../../components/shared/SpotlightCard';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import PocketGoalCard from '../../components/shared/PocketGoalCard';
import PrioritySummaryBar from '../../components/shared/PrioritySummaryBar';
import {
  healthScoreData,
  pillarStripData,
  cashflowData,
  spotlightInsights,
  nwgBreakdownData,
} from '../../data/pfmData';
import { coachNudges } from '../../data/coachData';
import { useRhythm } from '../../hooks/useRhythm';
import './OverviewTab.css';

const SPOTLIGHT_ICON_MAP: Record<string, string> = {
  celebration: 'celebration',
  nudge: 'lightbulb',
  anomaly: 'warning',
  pattern: 'coffee',
};

const CATEGORY_LABEL: Record<string, string> = {
  essential: 'Essential',
  milestone: 'Milestone',
  lifestyle: 'Lifestyle',
};

interface OverviewTabProps {
  onOpenCoach?: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onOpenCoach }) => {
  const history = useHistory();
  const [showCoach, setShowCoach] = useState(true);
  const nudge = coachNudges.find(n => n.insightType === 'benchmark');
  const {
    rhythmTarget, priorities,
    requiredGrowthPct, totalMonthlyContribution,
  } = useRhythm();

  const actuals = nwgBreakdownData;
  const monthlyIncome = cashflowData.received;
  const monthlyGrowthBudget = rhythmTarget
    ? monthlyIncome * (rhythmTarget.growth / 100)
    : monthlyIncome * (actuals.growth.percentage / 100);

  return (
    <div>
      {/* Financial Health Score */}
      <SectionModule title="Financial health">
        <div className="overview__health-section">
          <HealthScoreRing
            score={healthScoreData.overall}
            rating={healthScoreData.rating}
            delta={healthScoreData.pillars.reduce((sum, p) => sum + p.delta, 0)}
            onClick={() => history.push('/insights/health')}
          />
          <PillarStrip
            pillars={pillarStripData}
            onPillarTap={(id) => history.push(`/insights/health/${id}`)}
          />
        </div>
      </SectionModule>

      {/* This Month's Cashflow */}
      <SectionModule title="This month's cashflow">
        <CashflowSummary
          received={cashflowData.received}
          spent={cashflowData.spent}
          upcoming={cashflowData.upcoming}
        />
      </SectionModule>

      {/* Life Priorities */}
      {priorities.length > 0 && (
        <SectionModule title="Your priorities" subtitle="Tap to view in Plan">
          <PrioritySummaryBar
            totalMonthlyContribution={totalMonthlyContribution}
            monthlyGrowthBudget={monthlyGrowthBudget}
            requiredGrowthPct={requiredGrowthPct}
            currentGrowthPct={rhythmTarget?.growth ?? actuals.growth.percentage}
          />
          <div className="overview__priorities">
            {priorities
              .sort((a, b) => (a.priority || 99) - (b.priority || 99))
              .slice(0, 3)
              .map((pocket) => (
              <PocketGoalCard
                key={pocket.id}
                pocket={pocket}
                subtitle={
                  [
                    pocket.monthlyContribution ? `€${pocket.monthlyContribution}/mo` : null,
                    pocket.category ? CATEGORY_LABEL[pocket.category] : null,
                  ].filter(Boolean).join(' · ')
                }
                onClick={() => history.push('/insights?tab=plan')}
              />
            ))}
          </div>
          {priorities.length > 3 && (
            <button
              className="overview__priorities-more typo-callout-semibold"
              onClick={() => history.push('/insights?tab=plan')}
            >
              View all {priorities.length} priorities
            </button>
          )}
        </SectionModule>
      )}

      {/* Coach Nudge */}
      {showCoach && nudge && (
        <SectionModule title="">
          <CoachMomentCard
            title={nudge.title}
            body={nudge.body}
            ctaLabel={nudge.ctaLabel}
            onCta={() => onOpenCoach?.()}
            onClose={() => setShowCoach(false)}
          />
        </SectionModule>
      )}

      {/* Spotlights */}
      <SectionModule title="Spotlights">
        <div className="overview__spotlights">
          {spotlightInsights.map((insight) => (
            <SpotlightCard
              key={insight.id}
              title={insight.title}
              description={insight.body}
              impact={5}
              icon={SPOTLIGHT_ICON_MAP[insight.type] || 'info'}
              accentColor={insight.accentColor}
            />
          ))}
        </div>
      </SectionModule>
    </div>
  );
};

export default OverviewTab;
