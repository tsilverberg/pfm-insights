import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SectionModule from '../../components/shared/SectionModule';
import HealthScoreRing from '../../components/shared/HealthScoreRing';
import PillarStrip from '../../components/shared/PillarStrip';
import CashflowSummary from '../../components/shared/CashflowSummary';
import SpotlightCard from '../../components/shared/SpotlightCard';
import CoachMomentCard from '../../components/shared/CoachMomentCard';
import {
  healthScoreData,
  pillarStripData,
  cashflowData,
  spotlightInsights,
} from '../../data/pfmData';
import { coachNudges } from '../../data/coachData';
import './OverviewTab.css';

const SPOTLIGHT_ICON_MAP: Record<string, string> = {
  celebration: 'celebration',
  nudge: 'lightbulb',
  anomaly: 'warning',
  pattern: 'coffee',
};

const OverviewTab: React.FC = () => {
  const history = useHistory();
  const [showCoach, setShowCoach] = useState(true);
  const nudge = coachNudges.find(n => n.insightType === 'benchmark');

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

      {/* Coach Nudge */}
      {showCoach && nudge && (
        <SectionModule title="">
          <CoachMomentCard
            title={nudge.title}
            body={nudge.body}
            ctaLabel={nudge.ctaLabel}
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
